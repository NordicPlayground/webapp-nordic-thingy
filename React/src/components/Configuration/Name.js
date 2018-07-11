import React from "react";
import {emojify} from "react-emojione";
import "./styles.css";

export const Name = ({name, value, onChange}) => (
  <div>
    <div className="modal">
      <div className="content">
        <div className="header">Thingy name</div>
        <p className="info">{emojify(name, {style: {width: "16px", height: "16px"}})}</p>
        <input onChange={(event) => onChange(event)} required maxLength="10"></input>
        <div className="underline"></div>
      </div>
    </div>
  </div>
);

export default Name;
