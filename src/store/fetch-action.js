import {
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  startAt,
  endBefore,
  limit,
  limitToLast,
} from "firebase/firestore";
import { db } from "../config";

import { vehicleActions } from "./vehicle-slice";
import { docActions } from "./doc-slice";
import { sizeSliceActions } from "./size-slice";
import { loadingAction } from "./store";

const pgLimit = 3;
export const fetchVehiclesList = (page, lastVisible, action, name, type) => {
  return async (dispatch) => {
    const fetchVehicles = async () => {
      console.log("Name", name);
      dispatch(loadingAction.toggleLoad(true));
      const querySnapshot = await getDocs(collection(db, "vehicles"));
      const size = querySnapshot.size;
      let vehicles = [];
      let batch;
      if (name === "" && type === "") {
        console.log("No name no type");
        if (page === 1) {
          batch = query(
            collection(db, "vehicles"),
            orderBy("modelName"),
            limit(pgLimit)
          );
        } else {
          if (action === "next") {
            batch = query(
              collection(db, "vehicles"),
              orderBy("modelName"),
              startAfter(lastVisible),
              limit(pgLimit)
            );
          }
          if (action === "prev") {
            batch = query(
              collection(db, "vehicles"),
              orderBy("modelName"),
              endBefore(lastVisible),
              limitToLast(pgLimit)
            );
          }
          if (action === "delete") {
            console.log("Delete Called for no search and type");
            batch = query(
              collection(db, "vehicles"),
              orderBy("modelName"),
              startAt(lastVisible),
              limit(pgLimit)
            );
          }
        }
      } else {
        batch = query(collection(db, "vehicles"), orderBy("modelName"));
      }

      const documentSnapshots = await getDocs(batch);
      dispatch(loadingAction.toggleLoad(false));

      const firstDoc = documentSnapshots.docs[0];
      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      dispatch(docActions.getFirstDoc(firstDoc));
      dispatch(docActions.getLastDoc(lastDoc));
      documentSnapshots.forEach((doc) => {
        vehicles.push({ ...doc.data(), id: doc.id });
      });

      const transformedData = vehicles.map((item) => {
        return {
          type: item.type,
          modelName: item.modelName,
          company: item.company,
          engine: item.engine,
          mileage: item.mileage,
          image: item.image,
          imagePath: item.imagePath,
          id: item.id,
        };
      });
      return { transformedData, size };
    };
    try {
      const { transformedData: vehicles, size } = await fetchVehicles();
      dispatch(sizeSliceActions.setPage(size));
      dispatch(vehicleActions.setVehicles(vehicles));
    } catch (error) {
      return;
    }
  };
};
