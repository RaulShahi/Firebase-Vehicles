import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { formDataActions } from "../../store/formData-slice";
import { validityActions } from "../../store/validity-slice";
import { sizeSliceActions } from "../../store/size-slice";
import { addVehicle, editVehicle } from "../../store/vehicle-slice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../config";
import { useNavigate } from "react-router-dom";
import { editBtnActions } from "../../store/store";
import { pageSliceActions } from "../../store/page-slice";
import { loadingAction } from "../../store/store";
import Input from "../Input/Input";
import Dropdown from "../Input/Dropdown";
import Spinner from "../UI/Spinner";

const Form = () => {
  const { type, modelName, company, engine, mileage, image } = useSelector(
    (state) => state.validity
  );
  const location = useLocation();
  console.log("Location Info", location);
  const validity = useSelector((state) => state.validity);
  console.log(validity);
  const formData = useSelector((state) => state.formData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formIsTouched, setFormIsTouched] = useState(false);
  const { edit } = useSelector((state) => state.editBtn);
  const [imageUpload, setImageUpload] = useState(null);
  const { isLoading } = useSelector((state) => state.load);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setFormIsTouched(true);
    console.log(formData);
    if (!type || !modelName || !company || !engine || !mileage || !image) {
      return;
    }
    let imagePath = `images/${imageUpload.name + v4()}`;
    dispatch(loadingAction.toggleLoad(true));
    const imageRef = ref(storage, imagePath);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        console.log(snapshot);
        getDownloadURL(snapshot.ref).then((url) => {
          if (!edit) {
            dispatch(addVehicle({ ...formData, image: url, imagePath }));
          } else {
            dispatch(editVehicle({ ...formData, image: url, imagePath }));
          }
          dispatch(sizeSliceActions.incrementSize());
          dispatch(formDataActions.submit());
          dispatch(validityActions.clear());
          dispatch(loadingAction.toggleLoad(false));
          dispatch(pageSliceActions.setPage(1));
          navigate("/", { replace: true });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeHandler = (event) => {
    const fieldName = event.target.name.toUpperCase();
    dispatch(
      formDataActions.userInput({
        value: event.target.value,
        name: event.target.name,
      })
    );
    switch (fieldName) {
      case "TYPE":
        dispatch(
          validityActions.type({
            val: event.target.value,
          })
        );
        break;
      case "MODELNAME":
        dispatch(
          validityActions.modelName({
            val: event.target.value,
          })
        );
        break;
      case "COMPANY":
        dispatch(
          validityActions.company({
            val: event.target.value,
          })
        );
        break;
      case "ENGINE":
        dispatch(
          validityActions.engine({
            val: event.target.value,
          })
        );
        break;
      case "MILEAGE":
        dispatch(
          validityActions.mileage({
            val: event.target.value,
          })
        );
        break;
      default:
        return;
    }
  };
  const imageUploadHandler = (event) => {
    if (event.target.files[0].name === "") {
      dispatch(validityActions.image(false));
    } else {
      dispatch(validityActions.image(true));
      setImageUpload(event.target.files[0]);
    }
  };

  const text = edit ? "Edit" : "Submit";

  return (
    <div className="formDiv">
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={formSubmitHandler}>
          <div className="control-group">
            <Dropdown
              id="type"
              label="Category"
              name="type"
              onChange={changeHandler}
              value={formData.type}
            />
            {formIsTouched && !type && (
              <p style={paraStyle}>Please select the type of vehicle.</p>
            )}
            <Input
              id="name"
              label="Model name"
              type="text"
              name="modelName"
              value={formData.modelName}
              onChange={changeHandler}
            />
            {formIsTouched && !modelName && (
              <p style={paraStyle}>Model Name Cannot Be Empty.</p>
            )}
            <Input
              id="company"
              label="Company"
              type="text"
              name="company"
              value={formData.company}
              onChange={changeHandler}
            />
            {formIsTouched && !company && (
              <p style={paraStyle}>
                Please enter the registered company name for the vehicle.
              </p>
            )}
            <Input
              id="engine"
              label="Engine Type"
              type="text"
              name="engine"
              value={formData.engine}
              onChange={changeHandler}
            />
            {formIsTouched && !engine && (
              <p style={paraStyle}>Please enter a valid engine description.</p>
            )}
            <Input
              id="mileage"
              label="Mileage(KMPL)"
              type="text"
              name="mileage"
              value={formData.mileage}
              onChange={changeHandler}
            />
            {formIsTouched && !mileage && (
              <p style={paraStyle}>
                Please enter the mileage only in numbers(KMPL).
              </p>
            )}
            {edit && (
              <img src={location.state} alt="VehicleImage" style={imgStyle} />
            )}
            <Input
              id="image"
              label="Upload a Photo"
              type="file"
              name="image"
              accept="image/*"
              onChange={imageUploadHandler}
            />
            {formIsTouched && !image && (
              <p style={paraStyle}>Please upload an image.</p>
            )}
            <button>{text}</button>
          </div>
        </form>
      )}
    </div>
  );
};
const paraStyle = {
  color: "red",
};
const imgStyle = {
  width: "200px",
  height: "200px",
};

export default Form;
