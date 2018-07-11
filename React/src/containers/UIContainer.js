import {connect} from "react-redux";
import {readFeature, changeCardTab, writeFeature, toggleFeature} from "../actions/misc";
import UI from "../components/UI/UI";
import {colorToRgb, rgbToColor} from "../utils/colorConverter";

const mapStateToProps = ({misc}) => {
  return ({
    button: misc.button,
    led: misc.led,
  });
};

const mapDispatchToProps = (dispatch) => ({
  startUiFeatures: () => {
    dispatch(toggleFeature("button", "on"));
    dispatch(readFeature("led"));
  },
  writeLedColor: (color, led) => {
    let mode;
    switch (led.mode) {
    case 0:
      mode = "off";
      break;
    case 1:
      mode = "constant";
      break;
    case 2:
      mode = "breathe";
      break;
    case 3:
      mode = "oneshot";
      break;
    default:
      mode = "breathe";
    }

    const rgbConvertedColor = colorToRgb(color);
    const red = rgbConvertedColor.red;
    const green = rgbConvertedColor.green;
    const blue = rgbConvertedColor.blue;

    const delay = led.delay || 3500;
    const params = {
      mode: mode,
      color: color,
      intensity: led.intensity,
      delay: delay,
      red: red,
      green: green,
      blue: blue,
    };

    dispatch(writeFeature("led", params));
  },
  writeLedMode: (mode, led) => {
    let color;
    if (led.mode === 1) {
      color = rgbToColor({red: led.r, green: led.g, blue: led.b});
    } else {
      color = led.color || 6;
    }
    const delay = led.delay || 1000;
    const intensity = led.intensity || 20;
    const rgbConvertedColor = colorToRgb(color);
    const red = rgbConvertedColor.red;
    const green = rgbConvertedColor.green;
    const blue = rgbConvertedColor.blue;
    const params = {
      mode: mode,
      color: color,
      intensity: intensity,
      delay: delay,
      red: red,
      green: green,
      blue: blue,
    };
    dispatch(writeFeature("led", params));
  },
  changeTab: (feature, tab) => {
    dispatch(changeCardTab(feature, tab));
  },
  toggleButton: () => {
    dispatch(toggleFeature("button", "both"));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UI);
