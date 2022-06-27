import { useDispatch, useSelector } from "react-redux";
import { pageSliceActions } from "../../store/page-slice";
import { fetchVehiclesList } from "../../store/fetch-action";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
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
        <Button
          type="primary"
          className="spanStyle"
          size="large"
          onClick={decrementPageHandler}
        >
          <ArrowLeftOutlined />
          Previous
        </Button>
      )}
      {currentPage === numberOfPages ? (
        ""
      ) : (
        <Button
          type="primary"
          className="spanStyle"
          size="large"
          onClick={incrementPageHandler}
        >
          Next
          <ArrowRightOutlined />
        </Button>
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
