import React from "react";

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div className="popup_container" onClick={() => this.props.onClose()}>
        </div>
        <div className="popup">
          <form onSubmit={() => {
            this.props.onConfirm(); this.props.onClose();
          }}>
            {
              this.props.children
            }
            <div className="popup_buttons">
              <button className="button_red" onClick={() => this.props.onClose()}>Close</button>
              <button className="button_green" type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
