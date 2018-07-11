import {connect} from "react-redux";
import {changeCardTab, toggleMotion, toggleFeature} from "../actions/misc";
import Motion from "../components/Motion/Motion";

const mapStateToProps = ({misc}) => {
  return ({
    motion: misc.motion,
    characteristics: {
      pedometer: misc.stepcounter,
      tap: misc.tap,
      heading: misc.heading,
      orientation: misc.quaternionorientation,
    },
  });
};

const mapDispatchToProps = (dispatch) => ({
  toggleAll: (toggle) => {
    dispatch(toggleMotion(toggle));
  },
  changeTab: (feature, tab) => {
    dispatch(changeCardTab(feature, tab));
  },
  togglePedometer: () => {
    dispatch(toggleFeature("stepcounter"));
  },
  toggleHeading: () => {
    dispatch(toggleFeature("heading"));
  },
  toggleTap: () => {
    dispatch(toggleFeature("tap"));
  },
  toggleOrientation: () => {
    dispatch(toggleFeature("quaternionorientation"));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Motion);
