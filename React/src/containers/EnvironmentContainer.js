import {connect} from "react-redux";
import {toggleFeature, changeCardTab, toggleEnvironment} from "../actions/misc";
import Environment from "../components/Environment/Environment";

const mapStateToProps = ({misc}) => {
  return ({
    temperature: misc.temperature,
    pressure: misc.pressure,
    humidity: misc.humidity,
    co2: misc.co2,
    tvoc: misc.tvoc,
    color: misc.color,
  });
};

const mapDispatchToProps = (dispatch) => ({
  toggleTemperature: () => {
    dispatch(toggleFeature("temperature"));
  },
  togglePressure: () => {
    dispatch(toggleFeature("pressure"));
  },
  toggleHumidity: () => {
    dispatch(toggleFeature("humidity"));
  },
  toggleCo2: () => {
    dispatch(toggleFeature("co2"));
  },
  toggleTvoc: () => {
    dispatch(toggleFeature("tvoc"));
  },
  toggleColor: () => {
    dispatch(toggleFeature("color"));
  },
  changeTab: (feature, tab) => {
    dispatch(changeCardTab(feature, tab));
  },
  toggleAll: (toggle) => {
    dispatch(toggleEnvironment(toggle));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Environment);
