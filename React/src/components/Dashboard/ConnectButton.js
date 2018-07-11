import React from "react";
import PropTypes from "prop-types";
import Thingy from "thingy52_web_bluetooth";
import Button from "material-ui/RaisedButton";
import "react-toastify/dist/ReactToastify.css";

class ConnectButton extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }

  async start() {
    if (!this.props.connected) {
      try {
        const thingy = new Thingy({logEnabled: false});
        window.thingy = thingy;
        const connected = await window.thingy.connect();
        if (connected) {
          this.props.onConnectionEvent(true);
        }
      } catch (e) {
        this.props.notifyError(e);
      }
    } else {
      this.props.onConnectionEvent(false);
      this.props.disconnect();
    }
  }

  render() {
    let text;
    if (!this.props.connected) {
      text = "CONNECT";
    } else {
      text = "DISCONNECT";
    }
    return (
      <div>
        <Button
          id="connectButton"
          backgroundColor="transparent"
          className="buttonRoot"
          fullWidth={true}
          onClick={(e) =>{
            this.start();
          }}
        >
          {text}
        </Button>
      </div>
    );
  }
}

ConnectButton.propTypes = {
  connected: PropTypes.bool,
  disconnect: PropTypes.func.isRequired,
  onConnectionEvent: PropTypes.func.isRequired,
  notifyError: PropTypes.func,
};

export default ConnectButton;
