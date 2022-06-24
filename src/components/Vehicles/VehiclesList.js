import React, { Fragment, useEffect } from "react";
import VehicleName from "./VehicleName";
import { useSelector, useDispatch } from "react-redux";
import { fetchVehiclesList } from "../../store/fetch-action";
import Spinner from "../UI/Spinner";

import PageIndex from "../PageIndex/PageIndex";

const VehiclesList = ({ name, type }) => {
  const { currentVehicles } = useSelector((state) => state.vehicles);
  const { isLoading } = useSelector((state) => state.load);

  const dispatch = useDispatch();
  let vehiclesList = currentVehicles;

  useEffect(() => {
    dispatch(fetchVehiclesList(1, {}, "", name, type));
  }, [dispatch, name, type]);

  if (name !== "") {
    console.log("Name check running");
    vehiclesList = vehiclesList.filter((item) => {
      return item["modelName"].toLowerCase().includes(name.toLowerCase());
    });
  }
  if (type !== "") {
    vehiclesList = vehiclesList.filter((item) => item["type"] === type);
  }

  const showIndex = !name && !type;

  return (
    <Fragment>
      {isLoading && <Spinner />}
      {vehiclesList.length !== 0 ? (
        <div>
          <ul style={listDiv}>
            {vehiclesList.map((item) => (
              <VehicleName
                key={item.id}
                currentVehicle={item}
                name={name}
                type={type}
              />
            ))}
          </ul>
          {showIndex && <PageIndex />}
        </div>
      ) : (
        "No such model found."
      )}
    </Fragment>
  );
};

const listDiv = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
};

export default React.memo(VehiclesList);

// const { currentPage } = useSelector((state) => state.page);
// const { currentDoc } = useSelector((state) => state.doc);
// const [currentPages, setCurrentPages] = useState(1);
// const [latestData, setLatestData] = useState({});

// let usersList = crudData.currentUsers;

// if (name !== "") {
//   console.log("Name check running");
//   usersList = crudData.currentUsers.filter((item) => {
//     return item["Name"].toLowerCase().includes(name.toLowerCase());
//   });
// }
// if (role !== "") {
//   usersList = usersList.filter((item) => {
//     if (item["Category"] === role) {
//       return item;
//     }
//     console.log(item.category);
//   });
// }
// if (usersList.length !== 0) {
//   return (
//     <ul>
//       {usersList.map((item) => {
//         return <UserName key={item.id} currentUser={item} />;
//       })}
//     </ul>
//   );
// }
//   if (DUMMY_VEHICLES.length !== 0) {
//     return (
//       <div>
//         <ul style={listDiv}>
//           {DUMMY_VEHICLES.map((item) => (
//             <VehicleName key={item.id} currentVehicle={item} />
//           ))}
//         </ul>
//       </div>
//     );
//   } else {
//     return <Spinner />;
//   }
// useEffect(() => {
//   dispatch(fetchVehiclesList(currentPage, latestData));
// }, [dispatch, currentPage, latestData]);

// const incrementHandler = (pg, data) => {
//   console.log("Current Page", pg);
//   setCurrentPages(pg);
//   setLatestData(data);
// };
