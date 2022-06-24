import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, Fragment } from "react";
import { formDataActions } from "../../store/formData-slice";
import { validityActions } from "../../store/validity-slice";
import { sizeSliceActions } from "../../store/size-slice";
import { addVehicle, editVehicle } from "../../store/vehicle-slice";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../config";
import { useNavigate } from "react-router-dom";
import { pageSliceActions } from "../../store/page-slice";
import { editBtnActions, loadingAction } from "../../store/store";
import Input from "../Input/Input";
import Dropdown from "../Input/Dropdown";
import ProgressBar from "../UI/ProgressBar";
import Spinner from "../UI/Spinner";
import { useEffect } from "react";

const Form = () => {
  const { type, modelName, company, engine, mileage, image } = useSelector(
    (state) => state.validity
  );
  const formData = useSelector((state) => state.formData);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("Location info", location);
  const navigate = useNavigate();
  const [formIsTouched, setFormIsTouched] = useState(false);
  const { edit } = useSelector((state) => state.editBtn);
  const [imageUpload, setImageUpload] = useState(null);
  const [imagePreview, setImagePreview] = useState(false);
  const { isLoading } = useSelector((state) => state.load);
  const [progress, setProgress] = useState(0);
  console.log("Edit", edit);

  const formSubmitHandler = (event) => {
    console.log("Image name", imageUpload);
    event.preventDefault();
    setFormIsTouched(true);

    if (!type || !modelName || !company || !engine || !mileage || !image) {
      return;
    }
    if (imageUpload) {
      let imagePath = `images/${imageUpload.name + v4()}`;
      dispatch(loadingAction.toggleLoad(true));
      const imageRef = ref(storage, imagePath);
      uploadBytesResumable(imageRef, imageUpload)
        .then((snapshot) => {
          console.log(snapshot);
          const status =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(status);
          getDownloadURL(snapshot.ref).then((url) => {
            if (!edit) {
              dispatch(addVehicle({ ...formData, image: url, imagePath }));
              dispatch(sizeSliceActions.incrementSize());
            }
            if (edit) {
              dispatch(editVehicle({ ...formData, image: url, imagePath }));
            }
            dispatch(loadingAction.toggleLoad(false)); // set Loading action to false
            navigate(`/home/vehicles/details/${location.state}`, {
              replace: true,
            }); // redirect to detail page
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (!imageUpload) {
      console.log("Entered in no image ");
      dispatch(editVehicle(formData));
      dispatch(loadingAction.toggleLoad(false)); // set Loading action to false
      navigate(`/home/vehicles/details/${location.state}`, {
        replace: true,
      }); //redirect to detail page
    }
    setFormIsTouched(false);
    dispatch(formDataActions.submit()); // clear formData
    dispatch(editBtnActions.setEdit(false)); // set button to "Submit"
    dispatch(validityActions.clear()); // set validity of all the form fields to null
    dispatch(pageSliceActions.setPage(1)); // set page to number 1
    setImagePreview(false); // reset image previews
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
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    console.log("form mount");

    return () => {
      if (edit) {
        dispatch(validityActions.clear());
        dispatch(formDataActions.submit());
        dispatch(editBtnActions.setEdit(false));
      }
    };
  }, []);
  const text = edit ? "Edit" : "Submit";

  const FormElement = (
    <div className="formDiv">
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
              Please enter the mileage only in digits(KMPL)(greater than 0).
            </p>
          )}
          {edit && !imagePreview && (
            <img src={formData.image} alt="tob" className="imgStyle" />
          )}
          {imagePreview && (
            <img src={imagePreview} alt="bob" className="imgStyle" />
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
    </div>
  );

  return (
    <Fragment>
      {isLoading ? (
        <div style={{ marginTop: "5rem" }}>
          <ProgressBar value={progress} />
        </div>
      ) : (
        FormElement
      )}
    </Fragment>
  );
};
const paraStyle = {
  color: "red",
};

export default Form;

// if (!edit) {
//   let imagePath = `images/${imageUpload.name + v4()}`;
//   dispatch(loadingAction.toggleLoad(true));
//   const imageRef = ref(storage, imagePath);
//   uploadBytes(imageRef, imageUpload)
//     .then((snapshot) => {
//       console.log(snapshot);
//       getDownloadURL(snapshot.ref).then((url) => {
//         dispatch(addVehicle({ ...formData, image: url, imagePath }));
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// } else {
//   if (imageUpload) {
//     console.log("From imageUpload");
//     let imagePath = `images/${imageUpload.name + v4()}`;
//     dispatch(loadingAction.toggleLoad(true));
//     const imageRef = ref(storage, imagePath);
//     uploadBytes(imageRef, imageUpload)
//       .then((snapshot) => {
//         console.log(snapshot);
//         getDownloadURL(snapshot.ref).then((url) => {
//           dispatch(editVehicle({ ...formData, image: url, imagePath }));
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } else if (!imageUpload) {
//     console.log("from no image upload");
//     dispatch(editVehicle(formData));
//   }
// }
