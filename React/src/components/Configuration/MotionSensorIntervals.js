import React from "react";
import "./styles.css";

class MotionSensorIntervals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motionconfiguration: props.motionconfiguration,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.id === "stepCounterInterval") {
      this.setState({
        motionconfiguration: {
          ...this.state.motionconfiguration,
          stepCounterInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.motionconfiguration);
      });
    } else if (event.target.id === "tempCompensationInterval") {
      this.setState({
        motionconfiguration: {
          ...this.state.motionconfiguration,
          tempCompensationInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.motionconfiguration);
      });
    } else if (event.target.id === "magnetCompInterval") {
      this.setState({
        motionconfiguration: {
          ...this.state.motionconfiguration,
          magnetCompInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.motionconfiguration);
      });
    } else if (event.target.id === "motionProcessFrequency") {
      this.setState({
        motionconfiguration: {
          ...this.state.motionconfiguration,
          motionProcessFrequency: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.motionconfiguration);
      });
    } else if (event.target.id === "wakeOnMotion") {
      this.setState({
        motionconfiguration: {
          ...this.state.motionconfiguration,
          wakeOnMotion: parseInt(event.target.value),
        },
      }, () => {
        this.props.onChange(this.state.motionconfiguration);
      });
    }
  }

  render() {
    return (
      <div>
        <div className="modal">
          <div className="content">
            <div className="header">Motion sensor intervals</div>
            <p className="info">Step counter (ms)</p>
            <input type="number" id="stepCounterInterval" required value={this.state.motionconfiguration.stepCounterInterval} onChange={this.handleChange} min="100" max="5000" ></input>
            <div className="underline"></div>
            <p className="info">Temperature compensation interval (ms)</p>
            <input type="number" id="tempCompensationInterval" required value={this.state.motionconfiguration.tempCompensationInterval} onChange={this.handleChange} min="100" max="5000"></input>
            <div className="underline"></div>
            <p className="info">Magnetometer compensation interval (ms)</p>
            <input type="number" id="magnetCompInterval" required value={this.state.motionconfiguration.magnetCompInterval} onChange={this.handleChange} min="100" max="1000"></input>
            <div className="underline"></div>
            <p className="info">Motion processing unit frequency (Hz)</p>
            <input type="number" id="motionProcessFrequency" required value={this.state.motionconfiguration.motionProcessFrequency} onChange={this.handleChange} min="5" max="200"></input>
            <div className="underline"></div>
            <p className="info">Wake-on-motion (on/off)</p>
            <input type="number" id="wakeOnMotion" required value={this.state.motionconfiguration.wakeOnMotion} onChange={this.handleChange} min="0" max="1"></input>
            <div className="underline"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default MotionSensorIntervals;
