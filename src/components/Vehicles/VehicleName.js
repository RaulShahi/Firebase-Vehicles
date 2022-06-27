import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Modal from "../UI/Modal/Modal";

const VehicleName = (props) => {
  const all = {
    ...props.currentVehicle,
  };

  const [showModal, setShowModal] = useState(false);
  let iD = all.id;
  let imagePath = all.imagePath;

  const deleteHandler = async () => {
    setShowModal(true);
  };

  return (
    <Fragment>
      {showModal && (
        <Modal
          toggleModal={setShowModal}
          iD={iD}
          imagePath={imagePath}
          name={props.name}
          type={props.type}
        />
      )}
      <div style={listStyle}>
        <div>
          <img
            src={all.image}
            alt="VehicleImage "
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <h3>
          {all.modelName}({all.type})
        </h3>

        <div className="btnDiv">
          <Link to={`vehicles/details/${iD}`}>
            <Button type="primary" size="large">
              Details
            </Button>
          </Link>
          <Button onClick={deleteHandler} type="danger" size="large">
            Delete
          </Button>
        </div>
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

export default React.memo(VehicleName);
