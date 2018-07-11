import {connect} from "react-redux";
import {toggleFeature, changeCardTab, triggerIFTTT, getIFTTTKey} from "../actions/misc";
import IFTTT from "../components/IFTTT/IFTTT";

const mapStateToProps = ({misc}) => {
  return ({
    button: misc.button,
    ifttt: misc.ifttt,
  });
};

const mapDispatchToProps = (dispatch) => ({
  startButton: () => {
    dispatch(toggleFeature("button", "on"));
  },
  triggerIFTTT: (eventName) => {
    dispatch(triggerIFTTT(eventName));
  },
  getIFTTTKey: () => {
    dispatch(getIFTTTKey());
  },
  changeTab: (feature, tab) => {
    dispatch(changeCardTab(feature, tab));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IFTTT);
