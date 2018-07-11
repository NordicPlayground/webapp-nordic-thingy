import React from "react";
import PropTypes from "prop-types";
import BatteryFull from "material-ui/svg-icons/device/battery-full.js";
import Battery20 from "material-ui/svg-icons/device/battery-20.js";
import Battery30 from "material-ui/svg-icons/device/battery-30.js";
import Battery50 from "material-ui/svg-icons/device/battery-50.js";
import Battery60 from "material-ui/svg-icons/device/battery-60.js";
import Battery80 from "material-ui/svg-icons/device/battery-80.js";
import Battery90 from "material-ui/svg-icons/device/battery-90.js";

export default function Battery({...props}) {
  const batteryIcon = batteryComponentReturner(props.batteryLevel);
  return (
    <div className="battery">
      {batteryIcon}
    </div>
  );
}

const batteryComponentReturner = (batteryLevel) => {
  if (batteryLevel <= 20) {
    return (<Battery20/>);
  } else if (batteryLevel <= 30) {
    return (<Battery30/>);
  } else if (batteryLevel <= 50) {
    return (<Battery50/>);
  } else if (batteryLevel <= 60) {
    return (<Battery60/>);
  } else if (batteryLevel <= 80) {
    return (<Battery80/>);
  } else if (batteryLevel <= 90) {
    return (<Battery90/>);
  } else {
    return (<BatteryFull/>);
  }
};

Battery.propTypes = {
  batteryLevel: PropTypes.number,
};
