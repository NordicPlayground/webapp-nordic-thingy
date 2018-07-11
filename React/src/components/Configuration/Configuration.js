import React from "react";
import Popup from "./Popup";
import Name from "./Name";
import namelabel from "../../assets/namelabel.png";
import advertising from "../../assets/advertising.png";
import connection from "../../assets/connection.png";
import eddystone from "../../assets/eddystone.png";
import cloudtoken from "../../assets/cloudtoken.png";
import environment from "../../assets/environment.png";
import motion from "../../assets/motion.png";
import ifttt from "../../assets/ifttt.png";
import AdvertisingParams from "./AdvertisingParams";
import ConnectionParams from "./ConnectionParams";
import Eddystone from "./Eddystone";
import CloudToken from "./CloudToken";
import Ifttt from "./Ifttt";
import EnvironmentSensors from "./EnvironmentSensors";
import MotionSensorIntervals from "./MotionSensorIntervals";
import "./styles.css";

class Configuration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupOpen: false,
    };
  }

  componentDidMount() {
    this.props.getIFTTTkey();
    this.props.readName();
    this.props.readAdvertisingParams();
    this.props.readConnectionParams();
    this.props.readEddystoneURL();
    this.props.readCloudToken();
    this.props.readEnvironmentConfig();
    this.props.readMotionConfig();
  }

  componentWillReceiveProps(np) {
    if (np.advertisingparameters !== this.state.advertisingparameters) {
      this.setState({
        advertisingparameters: np.advertisingparameters,
      });
    }

    if (np.connectionparameters !== this.state.connectionparameters) {
      this.setState({
        connectionparameters: np.connectionparameters,
      });
    }

    if (np.eddystone !== this.state.eddystone) {
      this.setState({
        eddystone: np.eddystone,
      });
    }

    if (np.cloudtoken !== this.state.cloudtoken) {
      this.setState({
        cloudtoken: np.cloudtoken.token,
      });
    }

    if (np.environmentconfiguration !== this.state.environmentconfiguration) {
      this.setState({
        environmentconfiguration: np.environmentconfiguration,
      });
    }

    if (np.motionconfiguration !== this.state.motionconfiguration) {
      this.setState({
        motionconfiguration: np.motionconfiguration,
      });
    }

    if (np.iftttKey!== this.state.iftttKey) {
      this.setState({
        iftttKey: np.iftttKey,
      });
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleAdvertisingChange(advertisingparameters) {
    this.setState({
      advertisingparameters,
    });
  }

  handleConnectionChange(connectionparameters) {
    this.setState({
      connectionparameters,
    });
  }

  handleEddystoneChange(eddystone) {
    this.setState({
      eddystone,
    });
  }

  handleCloudtokenChange(cloudtoken) {
    this.setState({
      cloudtoken,
    });
  }

  handleEnvironmentChange(environmentconfiguration) {
    this.setState({
      environmentconfiguration,
    });
  }

  handleMotionChange(motionconfiguration) {
    this.setState({
      motionconfiguration,
    });
  }

  handleIFTTTChange(ifttt) {
    this.setState({
      ifttt,
    });
  }

  // -----


  handleNameSubmit() {
    this.props.writeName(this.state.name);
  }

  handleAdvertisingSubmit() {
    this.props.writeAdvertisingParams(this.state.advertisingparameters);
  }

  handleConnectionSubmit() {
    this.props.writeConnectionParams(this.state.connectionparameters);
  }

  handleEddystoneSubmit() {
    this.props.writeEddystoneURL(this.state.eddystone.href);
  }

  handleCloudtokenSubmit() {
    this.props.writeCloudToken(this.state.cloudtoken);
  }

  handleEnvironmentSubmit() {
    this.props.writeEnvironmentConfig(this.state.environmentconfiguration);
  }

  handleMotionSubmit() {
    this.props.writeMotionConfig(this.state.motionconfiguration);
  }

  handleIFTTTSubmit() {
    this.props.setIFTTTKey(this.state.ifttt);
  }

  openPopup(content) {
    let c;
    let oc;
    switch (content) {
    case "name":
      c = <Name name={this.props.name.name} onChange={this.handleNameChange.bind(this)}/>;
      oc = this.handleNameSubmit.bind(this);
      break;

    case "advertising":
      c = <AdvertisingParams advertisingparameters={this.props.advertisingparameters} onChange={this.handleAdvertisingChange.bind(this)}/>;
      oc = this.handleAdvertisingSubmit.bind(this);
      break;

    case "connection":
      c = <ConnectionParams connectionparameters={this.props.connectionparameters} onChange={this.handleConnectionChange.bind(this)}/>;
      oc = this.handleConnectionSubmit.bind(this);
      break;

    case "eddystone":
      c = <Eddystone eddystone={this.props.eddystone} onChange={this.handleEddystoneChange.bind(this)}/>;
      oc = this.handleEddystoneSubmit.bind(this);
      break;

    case "cloudtoken":
      c = <CloudToken cloudtoken={this.props.cloudtoken} onChange={this.handleCloudtokenChange.bind(this)}/>;
      oc = this.handleCloudtokenSubmit.bind(this);
      break;


    case "environment":
      c = <EnvironmentSensors environmentconfiguration={this.props.environmentconfiguration} onChange={this.handleEnvironmentChange.bind(this)} />;
      oc = this.handleEnvironmentSubmit.bind(this);
      break;

    case "motion":
      c = <MotionSensorIntervals motionconfiguration={this.props.motionconfiguration} onChange={this.handleMotionChange.bind(this)} />;
      oc = this.handleMotionSubmit.bind(this);
      break;

    case "ifttt":
      c = <Ifttt iftttKey={this.props.iftttKey} onChange={this.handleIFTTTChange.bind(this)} />;
      oc = this.handleIFTTTSubmit.bind(this);
      break;

    default:
      c = null;
      oc = () => {};
      break;
    }

    this.setState((ps) => ({
      ...ps,
      content: c,
      popupOpen: true,
      onConfirm: oc,
    }));
  }

  closePopup() {
    this.setState({
      popupOpen: false,
    });
  }

  render() {
    return (
      <div id="configuration">
        <h3> Configuration </h3>
        <span id="firmwareLabel">{`Firmware version ${this.props.firmware}`}</span>
        <p className="component" onClick={() => this.openPopup("name")}><img src={namelabel} alt="name" />Thingy name</p>
        <p className="component" onClick={() => this.openPopup("advertising")}><img src={advertising} alt="name" />Advertising parameters</p>
        <p className="component" onClick={() => this.openPopup("connection")}><img src={connection} alt="name" />Connection parameters</p>
        <p className="component" onClick={() => this.openPopup("eddystone")}><img src={eddystone} alt="name" />Eddystone URL</p>
        <p className="component" onClick={() => this.openPopup("cloudtoken")}><img src={cloudtoken} alt="name" />Cloud token</p>
        <p className="component" onClick={() => this.openPopup("environment")}><img src={environment} alt="name" />Environment sensors</p>
        <p className="component" onClick={() => this.openPopup("motion")}><img src={motion} alt="name" />Motion sensors</p>
        <p className="component" onClick={() => this.openPopup("ifttt")}><img src={ifttt} alt="name" />IFTTT</p>

        {
          this.state.popupOpen ? (
            <Popup onClose={this.closePopup.bind(this)} onConfirm={this.state.onConfirm.bind(this)}>
              {
                this.state.content
              }
            </Popup>
          )
            :
            null
        }
      </div>
    );
  }
}

export default Configuration;
