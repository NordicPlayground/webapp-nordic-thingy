import React from "react";
import PropTypes from "prop-types";

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filename: "No file chosen"};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const file = event.target.files[0];
    if (file !== undefined) {
      // Undefined check roots out "cancel file upload" events
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        this.setState({filename: file.name});
        const fileBuffer = reader.result;
        const fileArray = new Uint8Array(fileBuffer);
        this.props.handleFileChange(fileArray);
      };
    } else {
      // Wipes file name when cancel is pressed in file browser
      this.setState({filename: "No file chosen"});
      this.props.handleFileChange(undefined);
    }
  }

  render() {
    return (
      <div className="fileInput">
        <div className="fileButton">
                        Choose File
          <input
            type="file"
            onChange={this.handleChange}
            accept="audio/wav"
            required
          />
        </div>
        <input
          type="text"
          value={this.state.filename}
          className="form-control"
          readOnly
        />
      </div>
    );
  }
}

FileInput.propTypes = {
  handleFileChange: PropTypes.func,
};

export default FileInput;
