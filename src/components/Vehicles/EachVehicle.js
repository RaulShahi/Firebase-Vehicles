import React, { Fragment } from "react";
import Spinner from "../UI/Spinner";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editBtnActions } from "../../store/store";
import { formDataActions } from "../../store/formData-slice";
import { validityActions } from "../../store/validity-slice";

const EachVehicle = ({ currentVehicle, ID }) => {
  const keys = Object.keys(currentVehicle);
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.formData);
  const { currentVehicles } = useSelector((state) => state.vehicles);

  if (keys.length === 0) {
    return <Spinner />;
  }

  const all = {
    ...currentVehicle,
  };

  const editHandler = () => {
    console.log("current vehicles", currentVehicles);
    dispatch(editBtnActions.setEdit(true));
    const updateVehicle = currentVehicles.find((item) => item.id === ID);
    console.log(updateVehicle);
    dispatch(validityActions.allTrue());
    dispatch(formDataActions.update(updateVehicle));
    console.log("In edit", formData);
  };

  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/home" style={{ alignItems: "center" }}>
          <button style={btnStyle}>Back</button>
        </Link>

        <Link to={`/edit-vehicle/${ID}`} state={all.image}>
          <button style={btnStyle} onClick={editHandler}>
            Edit
          </button>
        </Link>
      </div>
      <img src={all.image} alt={all.modelName} />
      <div>
        <h2>{all.modelName}</h2>
        <h3>{all.company}</h3>
        <h4>{all.type}</h4>
        <p>Engine: {all.engine}</p>
        <p>Mileage: {all.mileage}</p>
      </div>
    </Fragment>
  );
};

const listStyle = {
  border: "1px solid black",
  margin: "1rem",
  padding: "1rem",
  borderRadius: "10px",
};
const btnStyle = {
  backgroundColor: "#044599",
  margin: "0.5rem",
};

export default React.memo(EachVehicle);
