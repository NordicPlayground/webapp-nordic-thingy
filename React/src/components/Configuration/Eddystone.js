import React from "react";
import "./styles.css";

class Eddystone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eddystone: props.eddystone,
    };

    this.handleEddystoneChange = this.handleEddystoneChange.bind(this);
  }

  handleEddystoneChange(event) {
    this.setState({
      eddystone: {
        ...this.state.eddystone,
        href: event.target.value,
      },
    }, () => {
      this.props.onChange(this.state.eddystone);
    });
  }

  render() {
    return (
      <div>
        <div className="modal">
          <div className="content">
            <div className="header">Eddystone URL</div>
            <p className="info"> URL</p>
            <input type="url" value={this.state.eddystone.href} onChange={(event) => this.handleEddystoneChange(event)} required maxLength="25"></input>
            <div className="underline"></div>
          </div>
        </div>
      </div>
    );
  };
};

export default Eddystone;

