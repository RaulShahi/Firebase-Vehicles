import Card from "../UI/Card/Card";
import classes from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehiclesList } from "../../store/fetch-action";
import { sizeSliceActions } from "../../store/size-slice";
import { storage } from "../../config";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config";

const ConfirmationForm = ({ toggleModal, iD, imagePath, name, type }) => {
  const dispatch = useDispatch();
  const { firstDoc } = useSelector((state) => state.doc);
  const { currentPage } = useSelector((state) => state.page);
  const deleteHandler = async () => {
    console.log(imagePath);
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    await deleteDoc(doc(db, "vehicles", iD));
    dispatch(fetchVehiclesList(currentPage, firstDoc, "delete", name, type));
    dispatch(sizeSliceActions.deecrementSize());
    toggleModal(false);
  };
  return (
    <Card className={classes.modal}>
      <div style={{ textAlign: "center" }}>
        <h2>Are you sure?</h2>
        <div className="btnDiv">
          <button onClick={deleteHandler}>Yes</button>
          <button
            onClick={() => {
              toggleModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ConfirmationForm;
