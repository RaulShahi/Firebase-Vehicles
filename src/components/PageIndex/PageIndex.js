import { useDispatch, useSelector } from "react-redux";
import { pageSliceActions } from "../../store/page-slice";
import { fetchVehiclesList } from "../../store/fetch-action";

const PageIndex = ({ onPageIncrement }) => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.page);
  const { lastDoc, firstDoc } = useSelector((state) => state.doc);
  const { currentSize } = useSelector((state) => state.size);
  const numberOfPages = Math.ceil(currentSize / 3);
  console.log("No of pages", numberOfPages);

  const incrementPageHandler = () => {
    dispatch(pageSliceActions.incrementPage());
    dispatch(fetchVehiclesList(currentPage + 1, lastDoc, "next"));
  };

  const decrementPageHandler = () => {
    dispatch(pageSliceActions.decrementPage());

    dispatch(fetchVehiclesList(currentPage - 1, firstDoc, "prev"));
  };

  return (
    <div style={indexDivStyle}>
      {currentPage === 1 ? (
        ""
      ) : (
        <button style={indexButtonStyle} onClick={decrementPageHandler}>
          Previous
        </button>
      )}
      {currentPage === numberOfPages ? (
        ""
      ) : (
        <button style={indexButtonStyle} onClick={incrementPageHandler}>
          Next
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

const indexButtonStyle = {
  margin: "0.5rem",
};

export default PageIndex;
