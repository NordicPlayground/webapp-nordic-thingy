import React from "react";
import "./styles.css";

class Ifttt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iftttKey: props.iftttKey,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.onChange("");
  }

  handleChange(event) {
    this.setState({iftttKey: event.target.value}, () => {
      this.props.onChange(this.state.iftttKey);
    });
  }

  render() {
    return (
      <div>
        <div className="modal">
          <div className="content">
            <div className="header">IFTTT Key</div>
            <p className="info">{this.props.iftttKey !== undefined && this.props.iftttKey.length > 0 ? this.props.iftttKey : "No IFTTT key set"}</p>
            <input onChange={(event) => this.handleChange(event)} ></input>
            <div className="underline"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ifttt;
