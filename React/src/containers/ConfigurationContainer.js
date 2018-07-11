import {connect} from "react-redux";
import {readFeature, writeFeature, setIFTTTKey, getIFTTTKey} from "../actions/misc";
import Configuration from "../components/Configuration/Configuration";

const mapStateToProps = ({misc}) => {
  return ({
    firmware: misc.firmware.reading.firmware,
    name: misc.name.reading,
    advertisingparameters: misc.advertisingparameters.reading,
    connectionparameters: misc.connectionparameters.reading,
    eddystone: misc.eddystone.reading,
    cloudtoken: misc.cloudtoken.reading,
    environmentconfiguration: misc.environmentconfiguration.reading,
    motionconfiguration: misc.motionconfiguration.reading,
    iftttKey: misc.ifttt.key,
  });
};

const mapDispatchToProps = (dispatch) => ({
  readName: () => {
    dispatch(readFeature("name"));
  },
  writeName: (name) => {
    dispatch(writeFeature("name", name));
  },
  readAdvertisingParams: () => {
    dispatch(readFeature("advertisingparameters"));
  },
  writeAdvertisingParams: (params) => {
    dispatch(writeFeature("advertisingparameters", params));
  },
  readConnectionParams: () => {
    dispatch(readFeature("connectionparameters"));
  },
  writeConnectionParams: (params) => {
    dispatch(writeFeature("connectionparameters", params));
  },
  readEddystoneURL: () => {
    dispatch(readFeature("eddystone"));
  },
  writeEddystoneURL: (url) => {
    dispatch(writeFeature("eddystone", url));
  },
  readCloudToken: () => {
    dispatch(readFeature("cloudtoken"));
  },
  writeCloudToken: (token) => {
    dispatch(writeFeature("cloudtoken", token));
  },
  readEnvironmentConfig: () => {
    dispatch(readFeature("environmentconfiguration"));
  },
  writeEnvironmentConfig: (params) => {
    dispatch(writeFeature("environmentconfiguration", params));
  },
  readMotionConfig: () => {
    dispatch(readFeature("motionconfiguration"));
  },
  writeMotionConfig: (params) => {
    const parsedParams = {
      stepCounterInterval: params.stepCounterInterval,
      tempCompensationInterval: params.tempCompensationInterval,
      magnetCompInterval: params.magnetCompInterval,
      motionProcessFrequency: params.motionProcessFrequency,
      wakeOnMotion: ((params.wakeOnMotion === 1) ? true : false),
    };
    dispatch(writeFeature("motionconfiguration", parsedParams));
  },
  setIFTTTKey: (key) => {
    dispatch(setIFTTTKey(key));
  },
  getIFTTTkey: () => {
    dispatch(getIFTTTKey());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configuration);
