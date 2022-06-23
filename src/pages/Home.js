import Card from "../components/UI/Card/Card";
import Search from "../components/Input/Search";
import Dropdown from "../components/Input/Dropdown";
import styles from "../components/Input/Search.module.css";
import classes from "../components/Vehicles/VehiclesList.module.css";
import VehiclesList from "../components/Vehicles/VehiclesList";
import { useState } from "react";

const Home = () => {
  const [searchedName, setSearchedName] = useState("");
  const [type, setType] = useState("");

  const searchHandler = (event) => {
    setSearchedName((prevState) => event.target.value);
  };

  const selectTypeHandler = (event) => {
    setType(event.target.value);
  };
  return (
    <>
      <Card className={classes.words}>
        <h2>Vehicles List</h2>
        <div className={styles.div}>
          <Search onSearch={searchHandler} name={searchedName} />
          <Dropdown onChange={selectTypeHandler} />
        </div>
        <div>
          <VehiclesList name={searchedName} type={type} />
        </div>
      </Card>
    </>
  );
};

export default Home;
