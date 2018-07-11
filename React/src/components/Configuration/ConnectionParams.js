import React from "react";
import "./styles.css";

class ConnectionParams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionparameters: props.connectionparameters,
    };

    this.handleConnectionChange = this.handleConnectionChange.bind(this);
  }

  handleConnectionChange(event) {
    if (event.target.id === "minConnectionInterval") {
      this.setState({
        connectionparameters: {
          ...this.state.connectionparameters,
          minInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.connectionparameters);
      });
    } else if (event.target.id === "maxConnectionInterval") {
      this.setState({
        connectionparameters: {
          ...this.state.connectionparameters,
          maxInterval: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.connectionparameters);
      });
    } else if (event.target.id === "slaveLatency") {
      this.setState({
        connectionparameters: {
          ...this.state.connectionparameters,
          slaveLatency: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.connectionparameters);
      });
    } else if (event.target.id === "supervisionTimeout") {
      this.setState({
        connectionparameters: {
          ...this.state.connectionparameters,
          timeout: event.target.value,
        },
      }, () => {
        this.props.onChange(this.state.connectionparameters);
      });
    }
  }

  render() {
    return (
      <div>
        <div className="modal">
          <div className="content">
            <div className="header">Connection parameters</div>
            <p className="info">Minimum connection interval (ms)</p>
            <input id="minConnectionInterval" type="number" value={this.state.connectionparameters.minInterval} onChange={(event) => this.handleConnectionChange(event)} min="8" max="4000" ></input>
            <div className="underline"></div>
            <p className="info">Maximum connection interval (ms)</p>
            <input id="maxConnectionInterval" type="number" value={this.state.connectionparameters.maxInterval} onChange={(event) => this.handleConnectionChange(event)} min="8" max="4000" ></input>
            <div className="underline"></div>
            <p className="info">Slave latency (intervals)</p>
            <input id="slaveLatency" type="number" value={this.state.connectionparameters.slaveLatency} onChange={(event) => this.handleConnectionChange(event)} min="0" max="499"></input>
            <div className="underline"></div>
            <p className="info">Supervision timeout (ms)</p>
            <input id="supervisionTimeout" type="number" value={this.state.connectionparameters.timeout} onChange={(event) => this.handleConnectionChange(event)} min="100" max="32000"></input>
            <div className="underline"></div>
          </div>
        </div>
      </div>
    );
  };
};

export default ConnectionParams;