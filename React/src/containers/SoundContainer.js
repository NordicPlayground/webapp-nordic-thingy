import {connect} from "react-redux";
import {changeCardTab, writeToSpeaker, stopAudioStream, toggleFeature} from "../actions/misc";
import Sound from "../components/Sound/Sound";

const mapStateToProps = ({misc}) => {
  return ({
    samples: misc.samples,
    tones: misc.tones,
    pcm: misc.pcm,
    microphone: misc.microphone,
  });
};

const mapDispatchToProps = (dispatch) => ({
  playAudio: (data) => {
    dispatch(writeToSpeaker(data));
  },
  changeTab: (feature, tab) => {
    dispatch(changeCardTab(feature, tab));
  },
  stopAudio: () => {
    dispatch(stopAudioStream());
  },
  notifyMicrophone: (toggle="both") => {
    dispatch(toggleFeature("microphone", toggle, true));
    // dispatch(notifyMicrophone(true));

  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sound);
