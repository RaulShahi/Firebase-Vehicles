import React from "react";
import classes from "./Input.module.css";
import { Input } from "antd";
const InputElement = (props) => {
  return (
    <div className={`${classes.control}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <Input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.name}
        accept={props.accept}
      />
    </div>
  );
};

export default InputElement;
