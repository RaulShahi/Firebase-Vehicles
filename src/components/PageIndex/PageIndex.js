import { useDispatch, useSelector } from "react-redux";
import { pageSliceActions } from "../../store/page-slice";
import { fetchVehiclesList } from "../../store/fetch-action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PageIndex = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.page);
  const { lastDoc, firstDoc } = useSelector((state) => state.doc);
  const { currentSize } = useSelector((state) => state.size);
  const numberOfPages = Math.ceil(currentSize / 3);

  const incrementPageHandler = () => {
    dispatch(pageSliceActions.incrementPage());
    dispatch(fetchVehiclesList(currentPage + 1, lastDoc, "next", "", ""));
  };

  const decrementPageHandler = () => {
    dispatch(pageSliceActions.decrementPage());

    dispatch(fetchVehiclesList(currentPage - 1, firstDoc, "prev", "", ""));
  };

  return (
    <div style={indexDivStyle}>
      {currentPage === 1 ? (
        ""
      ) : (
        <button className="spanStyle" onClick={decrementPageHandler}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          <span> </span>
          <span className="spanStyle">Previous</span>
        </button>
      )}
      {currentPage === numberOfPages ? (
        ""
      ) : (
        <button className="spanStyle" onClick={incrementPageHandler}>
          <span className="spanStyle">Next</span>
          <FontAwesomeIcon icon="fa-solid fa-arrow-right " />
        </button>
      )}
    </div>
  );
};

const indexDivStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};

export default PageIndex;
