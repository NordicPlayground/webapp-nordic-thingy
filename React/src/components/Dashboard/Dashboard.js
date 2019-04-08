import React from "react";
import PropTypes from "prop-types";
import {Route, NavLink, Switch, Redirect} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import MediaQuery from "react-responsive";
import MenuItem from "material-ui/MenuItem";
import {ToastContainer, toast} from "react-toastify";
import EnvironmentContainer from "../../containers/EnvironmentContainer";
import MotionContainer from "../../containers/MotionContainer";
import UIContainer from "../../containers/UIContainer";
import SoundContainer from "../../containers/SoundContainer";
import ConnectButton from "./ConnectButton";
import Battery from "./Battery";
import nordiclogo from "../../assets/nordic_logo.png";
import environment from "../../assets/environment.png";
import motion from "../../assets/motion.png";
import ui from "../../assets/ui.png";
import ConfigurationContainer from "../../containers/ConfigurationContainer";
import IFTTTContainer from "../../containers/IFTTTContainer";
import configuration from "../../assets/configuration.png";
import sound from "../../assets/sound.png";
import ifttt from "../../assets/ifttt.png";
import {LoadingIcon} from "../Common/Common";
import UpdateFirmware from "./UpdateFirmware";
import BurgerMenu from "./BurgerMenu";
import {emojify} from "react-emojione";
import "./styles.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {notification: props.notification, firmware: props.firmware};
    this.onConnectionEvent = this.onConnectionEvent.bind(this);
  }

  componentWillReceiveProps(np) {
    if (np.firmware !== this.state.firmware) {
      this.setState({
        firmware: np.firmware,
      });
    }
    if (np.notification !== this.state.notification) {
      this.setState({
        notification: np.notification,
      });
      if (np.notification) {
        const type = np.notification.category;
        const message = np.notification.message;
        toast.dismiss();
        if (type === "success") {
          toast.success(message, {
            autoClose: 2000,
          });
        } else if (type === "info") {
          toast.info(message);
        } else if (type === "warning") {
          toast.warn(message);
        } else if (type === undefined) {
          toast.error("undefined error");
        } else {
          toast.error(message);
        }
      }
    }
  }

  onConnectionEvent(state) {
    this.props.onConnectionEvent(state);
    if (state) {
      this.props.readName();
      this.props.readFirmware();
      toast.info("Thingy connected");
      this.props.startErrorNotification();
      this.props.startDisconnectNotification();
      this.props.startWriteNotification();
      this.props.startBatteryNotification();
    } else {
      toast.info("Thingy disconnected");
    }
  }

  render() {
    let routes = <div className="loading_dashboard"><div><h1 id="connect-prompt"> Please connect your Thingy</h1></div></div>;
    let battery;

    if (this.props.connected) {
      if (this.state.firmware === "" || this.state.firmware === undefined) {
        routes = <div className="loading_dashboard"><div><LoadingIcon /></div></div>;
      } else if (this.state.firmware !== "v2.2.0") {
        routes = <div className="loading_dashboard"><div><UpdateFirmware /></div></div>;
      } else {
        routes = (
          <Switch>
            <Route exact path="/environment" component={EnvironmentContainer} />
            <Route exact path="/motion" component={MotionContainer} />
            <Route exact path="/ui" component={UIContainer} />
            <Route exact path="/configuration" component={ConfigurationContainer} />
            <Route exact path="/sound" component={SoundContainer} />
            <Route exact path="/ifttt" component={IFTTTContainer} />
            <Redirect from="/" to="/environment" />
          </Switch>
        );
        battery = (<Battery className="battery" batteryLevel={this.props.batteryLevel}/>);
      }
    }

    return (

      <Router>
        <div id="dashboard">
          <MediaQuery minWidth={705}>
            <div className="menu">
              <img className="logo" src={nordiclogo} />
              <ul>
                <NavLink to="/environment" className="menuLink"><MenuItem className="menuItem" ><img src={environment} />Environment</MenuItem></NavLink>
                <NavLink to="/motion" className="menuLink" activeClassName="active"><MenuItem className="menuItem" ><img src={motion} />Motion</MenuItem></NavLink>
                <NavLink to="/ui" className="menuLink"><MenuItem className="menuItem" ><img src={ui} />UI</MenuItem></NavLink>
                <NavLink to="/configuration" className="menuLink"><MenuItem className="menuItem" ><img src={configuration} />Configuration</MenuItem></NavLink>
                <NavLink to="/sound" className="menuLink"><MenuItem className="menuItem" ><img src={sound} />Sound</MenuItem></NavLink>
                <NavLink to="/ifttt" className="menuLink"><MenuItem className="menuItem" ><img src={ifttt} />IFTTT</MenuItem></NavLink>
              </ul>
            </div>
          </MediaQuery>

          <div>
            <div id="header">
              <div id="nameAndBurger" >
                <MediaQuery maxWidth={704}>
                  <BurgerMenu/>
                </MediaQuery>
                <h1>{emojify(this.props.name, {style: {width: "24px", height: "24px"}})}</h1>
                {battery}
              </div>
              <ConnectButton onConnectionEvent={this.onConnectionEvent} disconnect={this.props.disconnect} notifyError={this.props.notifyError} connected={this.props.connected}/>
            </div>
          </div>
          <div id="main_view">
            {
              routes
            }
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            draggablePercent={60}
            closeButton={false}
            className="toast-container"
            hideProgressBar={true}
            toastClassName="toast"
          />
        </div>
      </Router>
    );
  }
}

Dashboard.propTypes = {
  name: PropTypes.string,
  notification: PropTypes.object,
  connected: PropTypes.bool,
  batteryLevel: PropTypes.number,
  onConnectionEvent: PropTypes.func,
  readName: PropTypes.func,
  readFirmware: PropTypes.func,
  startErrorNotification: PropTypes.func,
  startWriteNotification: PropTypes.func,
  startBatteryNotification: PropTypes.func,
  startDisconnectNotification: PropTypes.func,
  notifyError: PropTypes.func,
  disconnect: PropTypes.func,
  firmware: PropTypes.string,
};

export default Dashboard;
