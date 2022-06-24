import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import ConfirmationForm from "../../Form/Confirmation";

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.toggleModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ConfirmationForm {...props} />,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
