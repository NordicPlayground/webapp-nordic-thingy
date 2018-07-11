export const RECEIVE_NEW_READING = "RECEIVE_NEW_READING";
export const RECEIVE_NEW_NOTIFY_READING = "RECEIVE_NEW_NOTIFY_READING";
export const FEATURE_NOTIFICATION_STATUS = "NOTIFY_FEATURE_STATUS";
export const CHANGE_CARD_TAB = "CHANGE_CARD_TAB";
export const NOTIFY_IFTTT_TRIGGER_STATUS = "NOTIFY_IFTTT_TRIGGER_STATUS";
export const RECEIVE_IFTTT_KEY = "RECEIVE_IFTTT_KEY";
export const CLEAN_THE_SLATE = "CLEAN_THE_SLATE";
export const NOTIFY_USER = "NOTIFY_USER";
export const SET_FEATURE_HAS_EVENT_LISTENER = "SET_FEATURE_HAS_EVENT_LISTENER";

export const receiveNewReading = (feature, reading) => ({
  type: RECEIVE_NEW_READING,
  reading: {
    feature,
    reading,
  },
});

export const receiveNewNotifyReading = (feature, reading) => ({
  type: RECEIVE_NEW_NOTIFY_READING,
  reading: {
    feature,
    reading,
  },
});

export const featureNotificationStatus = (feature, status) => ({
  type: FEATURE_NOTIFICATION_STATUS,
  status: {
    feature,
    status,
  },
});

export const changeCardTab = (feature, tab) => ({
  type: CHANGE_CARD_TAB,
  feature,
  tab,
});

export const notifyIftttTriggerStatus = (status) => ({
  type: NOTIFY_IFTTT_TRIGGER_STATUS,
  status,
});

export const receiveIFTTTKey = (key) => ({
  type: RECEIVE_IFTTT_KEY,
  key,
});

export const cleanTheSlate = () => ({
  type: CLEAN_THE_SLATE,
});

export const notifyUser = (message, category) => ({
  type: NOTIFY_USER,
  message,
  category,
});

export const setFeatureHasEventListener = (feature) => ({
  type: SET_FEATURE_HAS_EVENT_LISTENER,
  feature,
});

// toggle parameter: "both" - function as normal toggle, "on" - only allow sensors to become active, "off" - only allow sensors to go inactive
export const toggleFeature = (feature, toggle="both", isMicrophone=false) => {
  return async (dispatch, getState) => {
    try {
      if (feature === "gas") {
        dispatch(notifyFeatures(["tvoc", "co2"], toggle));
        return;
      }

      const state = await getState();
      const status = state.misc[feature].status;
      const hasEventListener = state.misc[feature].hasEventListener || false;

      if (toggle === "both" || (toggle === "on" && !status) || (toggle === "off" && status)) {
        const featureToUpdateStatusFor = feature;

        if (["tvoc", "co2"].includes(feature)) {
          const isNot = feature === "tvoc" ? "co2" : "tvoc";
          const isNotStatus = state.misc[isNot].status;

          if (isNotStatus) {
            dispatch(featureNotificationStatus(featureToUpdateStatusFor, !status));
            return;
          }

          feature = "gas";
        }

        let e;

        if (isMicrophone) {
          if (!status) {
            await window.thingy.mtu.write(276);
          }
          e = (data) => {
            const tempData = data.detail;
            window.thingy.microphone.play(tempData);
          };
        } else {
          e = (reading) => {
            dispatch(receiveNewNotifyReading(feature, reading));
          };
        }

        if (!status) {
          if (!hasEventListener) {
            window.thingy.addEventListener(feature, e);
            dispatch(setFeatureHasEventListener(feature));
          }
          await window.thingy[feature].start();
          dispatch(featureNotificationStatus(featureToUpdateStatusFor, true));
        } else {
          await window.thingy[feature].stop();
          dispatch(featureNotificationStatus(featureToUpdateStatusFor, false));
        }
      }
    } catch (error) {
      // These errors might occur because we try to stop several ongoing notify operations after disconnecting from Thingy, which naturally is not possible.
      // Queue the conditional under
      if (error.message !== "Cannot read property 'gattBusy' of undefined" || error.message !== "Cannot set property 'gattBusy' of undefined") {
        // should actually do something here

        // do
        // the
        // something
      }

      return;
    }
  };
};

// notifies the list of features, given that they are not already active
const notifyFeatures = (features, toggle="both") => {
  return async (dispatch) => {
    for (const f of features) {
      await dispatch(toggleFeature(f, toggle));
    }
  };
};

export const toggleEnvironment = (toggle) => {
  const environmentFeatures = ["temperature", "pressure", "humidity", "co2", "tvoc", "color"];

  return (dispatch) => {
    dispatch(notifyFeatures(environmentFeatures, toggle));
  };
};

export const toggleMotion = (toggle) => {
  const motionFeatures = ["stepcounter", "tap", "heading", "quaternionorientation"];

  return (dispatch) => {
    dispatch(notifyFeatures(motionFeatures, toggle));
  };
};


export const writeToSpeaker = (data) => {
  return async (dispatch, getState) => {
    await window.thingy.soundconfiguration.write({speakerMode: data.mode});
    if (data.mode !== 2) {
      await window.thingy.speakerdata.write(data);
    } else {
      let speakerStatusReady = true;
      try {
        dispatch(receiveNewReading("pcm", {reading: {playStatus: 1}}));
        await window.thingy.mtu.write(273);
        const myLogger = (data) => {
          const speakerStatus = data.detail.status;
          switch (speakerStatus) {
          case 0:
            speakerStatusReady = true;
            break;
          case 1:
            speakerStatusReady = false;
            break;
          case 16:
            speakerStatusReady = false;
            break;
          default:
            speakerStatusReady = true;
          }
        };
        window.thingy.addEventListener("speakerstatus", myLogger);
        let index = 0;
        const packetSize = 160;
        let packets = 0;
        let timer;
        let retries = 0;
        speakerStatusReady = true;
        const writeSoundPCMBatch = async () => {
          // Can write max 273 Bytes (MTU) at a time to the characteristic.
          // Writing with maximum data payload might result in Thingy speaker buffer filling up and packets will be dropped.
          // Sending 160 Byte batches has proved to be reliable.

          // check if stop button was pressed
          const state = getState();
          if (state.misc.pcm.reading.reading.playStatus === 0) {
            return;
          }
          if (speakerStatusReady === false) {
            // Do a sanity check in case notifications have stopped whilst whe are retrying or we might en up in an endless loop of retries.
            // If there are 10 retries in a row it probably means notifications have stopped.
            if ((retries > 0) && (retries % 10) === 0) {
              await window.thingy.speakerstatus.start();
              retries = 0;
            } else {
              retries++;
            }
            // Delay execution by 10ms if Thingy audio buffer is almost full
            timer = setTimeout(function() {
              writeSoundPCMBatch();
            }, 10);
          } else {
            // write 160 Byte chunks of 8-bit audio data to Thingy
            if (index + packetSize < data.data.length) {
              await window.thingy.speakerdata.write({mode: 2, data: data.data.slice(index, index + packetSize)});
              index += packetSize;
              packets++;
              // There is possibly a bug in Chrome that leads to the notification callback not firing. Happens irregularly.
              // Restart notifications every 20 packets to make sure notifications are running.
              // This does not add an audible delay to the aduio transmission.
              if (packets % 20 === 0) {
                // await window.thingy.speakerstatus.start();
              }
              // reset retries on successfull write
              retries = 0;
              // Repeat
              writeSoundPCMBatch();
            } else {
              // Send the last bytes
              if (index < data.data.length) {
                await window.thingy.speakerdata.write({mode: 2, data: data.data.slice(index, data.data.length - 1)});
              } else {
                return;
              }
            }
          }
        };
        await window.thingy.speakerstatus.start();
        await window.thingy.soundconfiguration.write({speakerMode: 2});
        writeSoundPCMBatch();
      } catch (error) {
        // do something
      }
    }
  };
};

export const stopAudioStream = () => {
  return (dispatch) => {
    dispatch(receiveNewReading("pcm", {reading: {playStatus: 0}}));
  };
};

export const notifyMicrophone = (enable) => {
  return async (dispatch) => {
    dispatch(featureNotificationStatus("microphone", enable));

    const myLogger = (data) => {
      const tempData = data.detail;
      window.thingy.microphone.play(tempData);
    };

    if (enable) {
      try {
        await window.thingy.mtu.write(276);
        window.thingy.addEventListener("microphone", myLogger);
        await window.thingy.microphone.start();
      } catch (error) {
        // do something
      }
    } else {
      window.thingy.removeEventListener("microphone", myLogger);
      await window.thingy.microphone.stop();
    }
  };
};

export const readFeature = (feature) => {
  return async (dispatch) => {
    const reading = await window.thingy[feature].read();
    dispatch(receiveNewReading(feature, reading));
  };
};

export const writeFeature = (feature, value) => {
  return async (dispatch) => {
    await window.thingy[feature].write(value);
    const reading = await window.thingy[feature].read();
    dispatch(receiveNewReading(feature, reading));
  };
};

export const onConnectionEvent = (state) => {
  return (dispatch) => {
    dispatch(receiveNewReading("connected", state));
  };
};

export const disconnect = () => {
  return async (dispatch) => {
    await window.thingy.disconnect();
    dispatch(cleanTheSlate());
  };
};

export const triggerIFTTT = (eventName) => {
  return async (dispatch, getState) => {
    const state = getState();
    const key = state.misc.ifttt.key;

    if (key === "") {
      dispatch(notifyUser({message: "You have to configure your IFTTT key before you can trigger events on the IFTTT platform", category: "warning"}));
    } else {
      if (["", undefined].includes(eventName)) {
        dispatch(notifyUser({message: "You can't trigger a nameless event", category: "warning"}));
      } else {
        const url = `https://maker.ifttt.com/trigger/${eventName}/with/key/${key}`;

        await fetch(url, {
          method: "GET",
          credentials: "omit",
          mode: "no-cors",
        });

        dispatch(notifyUser({message: `An event with the name ${String.fromCharCode(parseInt("+ab", 16))}${eventName}${String.fromCharCode(parseInt("+bb", 16))} was triggered on the IFTTT platform`, category: "success"}));
      }
    }
  };
};

export const getIFTTTKey = () => {
  return async (dispatch) => {
    let key = await localStorage.getItem("iftttkey");

    if (key === null) {
      key = "";
    }

    dispatch(receiveIFTTTKey(key));
  };
};

export const setIFTTTKey = (key) => {
  return async (dispatch) => {
    await localStorage.setItem("iftttkey", key);
    dispatch(receiveIFTTTKey(key));
    dispatch(notifyUser({message: "Success", category: "success"}));
  };
};

export const startDisconnectNotification = () => {
  return async (dispatch) => {
    const disconnectListener = async (e) => {
      await window.thingy.disconnect();
      dispatch(cleanTheSlate());
      dispatch(onConnectionEvent(false));
      dispatch(notifyUser({message: "Lost connection to your device. Please try to reconnect", category: "error"}));
    };

    window.thingy.addEventListener("disconnected", disconnectListener);
  };
};

export const startErrorNotification = () => {
  return async (dispatch, getState) => {
    const errorListener = (e) => {
      if (e.detail !== undefined) {
        const state = getState();
        if (state.misc.connected.reading) {
          dispatch(notifyUser({message: e.detail.body.message, category: "error"}));
        }
      } else {
        dispatch(notifyUser({message: String(e), category: "error"}));
      }
    };
    window.thingy.addEventListener("error", errorListener);
  };
};

export const startWriteNotification = () => {
  return async (dispatch) => {
    const writeListener = (write) => {
      const configurationTypes = [
        "name",
        "advertisingparameters",
        "connectionparameters",
        "eddystone",
        "cloudtoken",
        "environmentconfiguration",
        "motionconfiguration",
      ];
      if (write.detail) {
        if (configurationTypes.includes(write.detail.feature)) {
          dispatch(notifyUser({message: "Success", category: "success"}));
        }
      }
    };
    window.thingy.addEventListener("write", writeListener);
  };
};

export const startBatteryNotification = () => {
  return async (dispatch) => {
    const batteryListener = (reading) => {
      dispatch(receiveNewNotifyReading("battery", reading));
    };
    window.thingy.addEventListener("battery", batteryListener);
    const batteryLevel = await window.thingy.battery.read();
    dispatch(receiveNewReading("battery", batteryLevel));
    await window.thingy.battery.start();
  };
};

export const notifyError = (e) => {
  return (dispatch) => {
    dispatch(notifyUser({message: String(e), category: "error"}));
  };
};
