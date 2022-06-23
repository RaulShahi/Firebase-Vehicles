const NotFound = () => {
  return (
    <div style={notFound}>
      <h1>Sorry! This page does not seem to exist.</h1>
      <p>Please Make sure that you have entered a valid url.</p>
    </div>
  );
};

const notFound = {
  textAlign: "center",
  backgroundColor: "#123456",
  color: "white",
  height: "50vh",
};

export default NotFound;
