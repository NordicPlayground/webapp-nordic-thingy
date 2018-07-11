import React from "react";
import "./styles.css";

class CloudToken extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cloudtoken: props.cloudtoken.token,
    };

    this.handleChange = this.handleChange.bind(this);  
  }

  handleChange(event) {
    this.setState({cloudtoken: event.target.value}, () => {
      this.props.onChange(this.state.cloudtoken);
    });
  }

  render() {
    return (
      <div>
        <div className="modal">
          <div className="content">
            <div className="header">Cloud token</div>
            <p className="info">Token</p>
            <input value={this.state.cloudtoken} onChange={(event) => this.handleChange(event)} maxLength="250"></input>
            <div className="underline"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default CloudToken;
