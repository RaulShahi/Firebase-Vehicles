import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editBtnActions } from "../store/store";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config";
import Card from "../components/UI/Card/Card";
import EachVehicle from "../components/Vehicles/EachVehicle";
import classes from "../components/Vehicles/VehiclesList.module.css";

const VehicleDetail = () => {
  const params = useParams();
  const [vehicleDetail, setVehicleDetail] = useState([]);
  console.log(vehicleDetail);
  useEffect(() => {
    const getSingleVehicle = async () => {
      const docRef = doc(db, "vehicles", params.iD);
      const response = await getDoc(docRef);
      console.log("Response", response.data());
      setVehicleDetail(response.data());
    };
    getSingleVehicle();
  }, [params]);
  return (
    <Fragment>
      <Card className={classes.words}>
        <EachVehicle currentVehicle={vehicleDetail} ID={params.iD} />
      </Card>
    </Fragment>
  );
};

export default VehicleDetail;
