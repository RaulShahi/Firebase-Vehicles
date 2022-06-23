import spinner from "./spinning.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "100px", display: "block", margin: "auto" }}
    />
  );
};

export default Spinner;
