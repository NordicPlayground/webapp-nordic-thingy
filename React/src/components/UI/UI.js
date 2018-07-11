import React from "react";
import {Card, CardStandardCodeView} from "../Common/Common";
import {CardButtonView, CardLedView} from "./UICards";
import DinoGame from "./DinoGame";
import PropTypes from "prop-types";
import "./styles.css";

class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: props.button,
      led: props.led,
    };

    this.changeTab = props.changeTab;
    this.changeColor = this.changeColor.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.toggleButton = props.toggleButton;
    this.shutdown = props.shutdown;
  }

  componentWillReceiveProps(np) {
    if (np.button !== this.state.button) {
      this.setState((ps) => ({
        ...ps,
        button: np.button,
      }));
    }

    if (np.led !== this.state.led) {
      this.setState((ps) => ({
        ...ps,
        led: np.led,
      }));
    }
  }

  componentDidMount() {
    this.props.startUiFeatures();
  }

  changeColor(event) {
    this.props.writeLedColor(parseInt(event.target.value, 10), this.state.led.reading);
  }

  changeMode(event) {
    this.props.writeLedMode(event.target.value, this.state.led.reading);
  }

  render() {
    return (
      <div className="content">
        <Card name="LED" interactionName="led" changeTab={this.changeTab} toggle={false} tab={this.state.led.activeTab}>
          {(!this.state.led.activeTab || this.state.led.activeTab === "feature") && <CardLedView feature={this.state.led} changeColor={this.changeColor} changeMode={this.changeMode}/>}
          {this.state.led.activeTab === "code" && <CardStandardCodeView code="led" feature={this.state.led} featureMode="read/write" />}
        </Card>
        <Card name="button" changeTab={this.changeTab} toggleFeature={this.toggleButton} tab={this.state.button.activeTab}>
          {(!this.state.button.activeTab || this.state.button.activeTab === "feature") && <CardButtonView feature={this.state.button} dinoGame={<DinoGame button={this.state.button} />} />}
          {this.state.button.activeTab === "code" && <CardStandardCodeView code="button" feature={this.state.button} featureMode="notify" />}
        </Card>
      </div>
    );
  }
}

UI.propTypes = {
  button: PropTypes.object,
  led: PropTypes.object,
  changeTab: PropTypes.func,
  toggleButton: PropTypes.func,
  stopButton: PropTypes.func,
  startUiFeatures: PropTypes.func,
  writeLedColor: PropTypes.func,
  writeLedMode: PropTypes.func,
  shutdown: PropTypes.func,
};

export default UI;
