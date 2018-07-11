import {connect} from "react-redux";
import {readFeature, onConnectionEvent, disconnect, startDisconnectNotification, startErrorNotification, startWriteNotification, startBatteryNotification, notifyError} from "../actions/misc";
import Dashboard from "../components/Dashboard/Dashboard";

const mapStateToProps = ({misc}) => {
  return ({
    connected: misc.connected.reading,
    name: misc.name.reading.name,
    firmware: misc.firmware.reading.firmware,
    notification: misc.notification,
    batteryLevel: misc.battery.reading.status,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onConnectionEvent: (state) => {
    dispatch(onConnectionEvent(state));
  },
  readName: () => {
    dispatch(readFeature("name"));
  },
  readFirmware: () => {
    dispatch(readFeature("firmware"));
  },
  disconnect: () => {
    dispatch(disconnect());
  },
  startDisconnectNotification: () => {
    dispatch(startDisconnectNotification());
  },
  startErrorNotification: () => {
    dispatch(startErrorNotification());
  },
  startWriteNotification: () => {
    dispatch(startWriteNotification());
  },
  startBatteryNotification: () => {
    dispatch(startBatteryNotification("battery", "on"));
  },
  notifyError: (e) => {
    dispatch(notifyError(e));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
