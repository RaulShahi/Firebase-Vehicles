import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteVehicle } from "../../store/vehicle-slice";
import { fetchVehiclesList } from "../../store/fetch-action";
import { sizeSliceActions } from "../../store/size-slice";
import { storage } from "../../config";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";

const VehicleName = (props) => {
  const all = {
    ...props.currentVehicle,
  };
  console.log("All Props", props);

  const dispatch = useDispatch();
  const { firstDoc } = useSelector((state) => state.doc);
  const { currentPage } = useSelector((state) => state.page);
  let iD = all.id;
  let imagePath = all.imagePath;

  const deleteHandler = async () => {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    await deleteDoc(doc(db, "vehicles", iD));
    dispatch(fetchVehiclesList(currentPage, firstDoc, "delete"));
    dispatch(sizeSliceActions.deecrementSize());
  };

  return (
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

      <div
        style={{
          margin: "1rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link to={`vehicles/details/${iD}`}>
          <button>Details</button>
        </Link>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

const listStyle = {
  border: "1px solid black",
  margin: "1rem",
  padding: "1rem",
  borderRadius: "10px",
};

export default React.memo(VehicleName);
