import classes from "./Backdrop.module.css";
import PropTypes from "prop-types";

const Backdrop = ({ onClick }) => {
  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        onClick();
      }}
    ></div>
  );
};

Backdrop.propTypes = {
  onClick: PropTypes.func,
};

export default Backdrop;
