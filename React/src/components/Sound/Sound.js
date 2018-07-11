import React from "react";
import PropTypes from "prop-types";
import {Card, CardStandardCodeView} from "../Common/Common";
import {CardMicrophoneView, CardToneView, CardSampleView, CardPCMView} from "./SoundCards";
import "./styles.css";

class Sound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: props.samples,
      tones: props.tones,
      pcm: props.pcm,
      microphone: props.microphone,
      sampleDisplayCode: {mode: 3, sample: 0},
      toneDisplayCode: {mode: 1, frequency: 440, duration: 1000, volume: 50},
      pcmDisplayCode: {mode: 2, data: "8-bit PCM samples"},
      file: undefined,
    };

    this.changeTab = props.changeTab;
    this.playSample = this.playSample.bind(this);
    this.playTone = this.playTone.bind(this);
    this.playPcm = this.playPcm.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  componentWillReceiveProps(np) {
    if (np.samples !== this.state.samples) {
      this.setState((ps) => ({
        ...ps,
        samples: np.samples,
      }));
    }

    if (np.tones !== this.state.tones) {
      this.setState((ps) => ({
        ...ps,
        tones: np.tones,
      }));
    }

    if (np.pcm !== this.state.pcm) {
      this.setState((ps) => ({
        ...ps,
        pcm: np.pcm,
      }));
    }

    if (np.microphone !== this.state.microphone) {
      this.setState((ps) => ({
        ...ps,
        microphone: np.microphone,
      }));
    }
  }

  playSample(event) {
    const sample = parseInt(event.target.value, 10);
    this.props.playAudio({
      mode: 3,
      sample: sample,
    });
    this.setState({
      sampleDisplayCode: {
        ...this.state.sampleDisplayCode,
        sample: sample,
      },
    });
  }

  playTone(event) {
    const frequency = parseFloat(event.target.value);
    this.props.playAudio({
      mode: 1,
      frequency: frequency,
      duration: 500, // duration set to 500 ms
      volume: 50, // volume set to to 50%
    });
    this.setState({
      toneDisplayCode: {
        ...this.state.toneDisplayCode,
        frequency: frequency,
      },
    });
  }

  playPcm(event) {
    event.preventDefault();
    if (this.state.file) {
      this.props.playAudio({
        mode: 2,
        data: this.state.file,
      });
    }
  }

  stopAudio(event) {
    event.preventDefault();
    this.props.stopAudio();
  }

  handleFileChange(file) {
    this.setState({
      file: file,
    });
  }

  componentWillUnmount() {
    this.props.stopAudio();
    this.props.notifyMicrophone("off");
  }

  render() {
    return (
      <div className="content">
        <Card id="sampleCard" name="samples" changeTab={this.changeTab} toggle={false} tab={this.state.samples.activeTab}>
          {(!this.state.samples.activeTab || this.state.samples.activeTab === "feature") && <CardSampleView playSample={this.playSample}/>}
          {this.state.samples.activeTab === "code" && <CardStandardCodeView code="speakerdata" feature={this.state.sampleDisplayCode} featureMode="writeWithoutResponse" />}
        </Card>
        <Card id="pianoCard" name="tones" changeTab={this.changeTab} toggle={false} tab={this.state.tones.activeTab}>
          {(!this.state.tones.activeTab || this.state.tones.activeTab === "feature") && <CardToneView playTone={this.playTone}/>}
          {this.state.tones.activeTab === "code" && <CardStandardCodeView code="speakerdata" feature={this.state.toneDisplayCode} featureMode="writeWithoutResponse" />}
        </Card>
        <Card id="pcmCard" name="Stream Audio" interactionName="pcm" changeTab={this.changeTab} toggle={false} tab={this.state.pcm.activeTab}>
          {(!this.state.pcm.activeTab || this.state.pcm.activeTab === "feature") && <CardPCMView playPcm={this.playPcm} stopAudio={this.stopAudio} handleFileChange={this.handleFileChange}/>}
          {this.state.pcm.activeTab === "code" && <CardStandardCodeView code="speakerdata" feature={this.state.pcmDisplayCode} featureMode="example" />}
        </Card>
        <Card id="microphoneCard" name="Microphone" interactionName="microphone" changeTab={this.changeTab} toggle={false} tab={this.state.microphone.activeTab}>
          {(!this.state.microphone.activeTab || this.state.microphone.activeTab === "feature") && <CardMicrophoneView feature={this.state.microphone} notifyMicrophone={this.props.notifyMicrophone}/>}
          {this.state.microphone.activeTab === "code" && <CardStandardCodeView code="microphone" feature={this.state.pcmDisplayCode} featureMode="notifyMicrophone" />}
        </Card>
      </div>
    );
  }
}

Sound.propTypes = {
  samples: PropTypes.object,
  tones: PropTypes.object,
  pcm: PropTypes.object,
  microphone: PropTypes.object,
  changeTab: PropTypes.func,
  playAudio: PropTypes.func,
  stopAudio: PropTypes.func,
  notifyMicrophone: PropTypes.func,
};

export default Sound;
