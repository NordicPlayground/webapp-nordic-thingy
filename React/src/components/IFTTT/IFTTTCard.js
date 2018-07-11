
import React from "react";
import {Input} from "../Common/Common";


export default class IFTTTCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iftttkey: "Not set",
    };
  }

  componentDidMount() {
    this.props.getKey();
  }

  componentWillReceiveProps(np) {
    if (np.feature && np.feature.key !== "") {
      this.setState((ps) => ({
        ...ps,
        iftttkey: np.feature.key,
      }));
    }
  }

  render() {
    return (
      <div id="card_ifttt_view">
        <div className="card_ifttt_key">
          <span>IFTTT key: </span>
          <span>{`${this.state.iftttkey}`}</span>
        </div>
        <div className="card_ifttt_input">
          <Input counter={true} size="large" placeholder="Event name..." onChange={this.props.onChange} />
        </div>
        <div>
          <h2>Instructions:</h2>
          <p>1) Save your IFTTT key in the Configuration tab</p>
          <p>2) Type the name of the event to trigger</p>
          <p>3) Press the Thingy button to trigger the event</p>
        </div>
      </div>
    );
  }
}
