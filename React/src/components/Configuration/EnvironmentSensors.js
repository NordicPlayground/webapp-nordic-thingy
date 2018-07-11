import React from "react";
import "./styles.css";

class EnvironmentSensors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      environmentconfiguration: props.environmentconfiguration,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.id === "temperatureInterval") {
      this.setState({
        environmentconfiguration: {
          ...this.state.environmentconfiguration,
          temperatureInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.environmentconfiguration);
      });
    } else if (event.target.id === "pressureInterval") {
      this.setState({
        environmentconfiguration: {
          ...this.state.environmentconfiguration,
          pressureInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.environmentconfiguration);
      });
    } else if (event.target.id === "humidityInterval") {
      this.setState({
        environmentconfiguration: {
          ...this.state.environmentconfiguration,
          humidityInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.environmentconfiguration);
      });
    } else if (event.target.id === "colorInterval") {
      this.setState({
        environmentconfiguration: {
          ...this.state.environmentconfiguration,
          colorInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.environmentconfiguration);
      });
    } else if (event.target.id === "gasInterval") {
      this.setState({
        environmentconfiguration: {
          ...this.state.environmentconfiguration,
          gasInterval: parseInt(event.target.value),
        },
      }, () => {
        this.props.onChange(this.state.environmentconfiguration);
      });
    } else if (event.target.id === "colorCalibrationRed") {
      this.setState({
        environmentconfiguration: {
          ...this.state.environmentconfiguration,
          colorSensorCalibration: {
            ...this.state.environmentconfiguration.colorSensorCalibration,
            red: event.target.value,
          },
        },
      }, () => {
        this.props.onChange(this.state.environmentconfiguration);
      });
    } else if (event.target.id === "colorCalibrationGreen") {
      this.setState({
        environmentconfiguration: {
          ...this.state.environmentconfiguration,
          colorSensorCalibration: {
            ...this.state.environmentconfiguration.colorSensorCalibration,
            green: event.target.value,
          },
        },
      }, () => {
        this.props.onChange(this.state.environmentconfiguration);
      });
    } else if (event.target.id === "colorCalibrationBlue") {
      this.setState({
        environmentconfiguration: {
          ...this.state.environmentconfiguration,
          colorSensorCalibration: {
            ...this.state.environmentconfiguration.colorSensorCalibration,
            blue: event.target.value,
          },
        },
      }, () => {
        this.props.onChange(this.state.environmentconfiguration);
      });
    }
  }


  render() {
    return (
      <div>
        <div className="modal">
          <div className="content">
            <div className="header">Environment sensors</div>
            <p className="info">Temperature interval (ms)</p>
            <input type="number" id="temperatureInterval" value={this.state.environmentconfiguration.temperatureInterval} onChange={(event) => this.handleChange(event)} min="100" max="60000" ></input>
            <div className="underline"></div>
            <p className="info">Pressure interval (ms)</p>
            <input type="number" id="pressureInterval" value={this.state.environmentconfiguration.pressureInterval} onChange={(event) => this.handleChange(event)} min="50" max="60000"></input>
            <div className="underline"></div>
            <p className="info">Humidity interval (ms)</p>
            <input type="number" id="humidityInterval" value={this.state.environmentconfiguration.humidityInterval} onChange={(event) => this.handleChange(event)} min="100" max="60000"></input>
            <div className="underline"></div>
            <p className="info">Color interval (ms)</p>
            <input type="number" id="colorInterval" value={this.state.environmentconfiguration.colorInterval} onChange={(event) => this.handleChange(event)} min="200" max="60000"></input>
            <div className="underline"></div>
            <p className="info">Gas interval (s)</p>
            <select id="gasInterval" value={this.state.environmentconfiguration.gasInterval} onChange={(event) => this.handleChange(event)}>
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="60">60</option>
            </select>
            <div className="underline"></div>
            <p className="info">Color calibration Red (intensity)</p>
            <input type="number" id="colorCalibrationRed" value={this.state.environmentconfiguration.colorSensorCalibration.red} onChange={(event) => this.handleChange(event)} min="0" max="255"></input>
            <div className="underline"></div>
            <p className="info">Color calibration Green (intensity)</p>
            <input type="number" id="colorCalibrationGreen" value={this.state.environmentconfiguration.colorSensorCalibration.green} onChange={(event) => this.handleChange(event)} min="0" max="255"></input>
            <div className="underline"></div>
            <p className="info">Color calibration Blue (intensity)</p>
            <input type="number" id="colorCalibrationBlue" value={this.state.environmentconfiguration.colorSensorCalibration.blue} onChange={(event) => this.handleChange(event)} min="0" max="255"></input>
            <div className="underline"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default EnvironmentSensors;
