import React from "react";
import {Card} from "../Common/Common";
import IFTTTCard from "./IFTTTCard";
import "./styles.css";

class IFTTT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button: props.button,
      ifttt: props.ifttt,
    };

    this.triggerIFTTT = props.triggerIFTTT;
    this.toggleButton = props.toggleButton;
    this.changeTab = props.changeTab;
  }

  componentWillReceiveProps(np) {
    if (np.button !== this.state.button) {
      this.setState((ps) => ({
        ...ps,
        button: np.button,
      }), () => {
        if (this.state.button.reading && this.state.button.reading.value === 1) {
          this.triggerIFTTT(this.state.eventName);
        }
      });
    }

    if (np.ifttt !== this.state.ifttt) {
      this.setState((ps) => ({
        ...ps,
        ifttt: np.ifttt,
      }));
    }
  }

  handleInputChange(input) {
    this.setState((ps) => ({
      ...ps,
      eventName: input,
    }));
  }

  componentDidMount() {
    this.props.startButton();
  }

  render() {
    return (
      <div>
        <Card name="IFTTT" interactionName="ifttt" toggle={false} changeTab={this.changeTab} codeview={false} tab={this.state.ifttt.activeTab}>
          <IFTTTCard feature={this.state.ifttt} onChange={this.handleInputChange.bind(this)} getKey={this.props.getIFTTTKey.bind(this)}/>
        </Card>
      </div>
    );
  }
}

export default IFTTT;
