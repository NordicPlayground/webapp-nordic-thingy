import React from "react";
import "./styles.css";

class AdvertisingParams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      advertisingparameters: props.advertisingparameters,
    };

    this.handleAdvertisingChange = this.handleAdvertisingChange.bind(this);
  }

  handleAdvertisingChange(event) {
    if (event.target.id === "interval") {
      this.setState({
        advertisingparameters: {
          ...this.state.advertisingparameters,
          interval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.advertisingparameters);
      });
    } else if (event.target.id === "timeout") {
      this.setState({
        advertisingparameters: {
          ...this.state.advertisingparameters,
          timeout: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.advertisingparameters);
      });
    }
  }

  render() {
    return (
      <div>
        <div className="modal">
          <div className="content">
            <div className="header">Advertising parameters</div>
            <p className="info">Advertising interval (ms)</p>
            <input id="interval" type="number" value={this.state.advertisingparameters.interval} onChange={(event) => this.handleAdvertisingChange(event)} min="20" max="5000" required ></input>
            <div className="underline"></div>
            <p className="info">Advertising timeout (s)</p>
            <input id="timeout" type="number" value={this.state.advertisingparameters.timeout} onChange={(event) => this.handleAdvertisingChange(event)} min="0" max="180" required></input>
            <div className="underline"></div>
          </div>
        </div>
      </div>
    );
  };
};

export default AdvertisingParams;
