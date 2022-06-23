import React from "react";
import classes from "./Input.module.css";
const Dropdown = (props) => {
  return (
    <div className={`${classes.control}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.name}
        style={selectStyle}
      >
        <option value="">Type</option>
        <option value="Bike">Bike</option>
        <option value="Car">Car</option>
        <option value="Scooter">Scooter</option>
      </select>
    </div>
  );
};

const selectStyle = {
  width: "10rem",
  height: "2rem",
  border: "2px solid #ccc",
  borderRadius: "10px",
  color: "#464646",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Dropdown;
