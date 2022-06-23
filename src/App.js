import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import FormPage from "./pages/Form-page";
import VehicleDetail from "./pages/VehicleDetail";
import { fetchVehiclesList } from "./store/fetch-action";
import EditPage from "./pages/EditPage";

import Home from "./pages/Home";
function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchVehiclesList(1));
  // }, [dispatch]);
  return (
    <>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-vehicle" element={<FormPage />} />
          <Route path="/edit-vehicle/:iD" element={<EditPage />} />
          <Route
            path="/home/vehicles/details/:iD/"
            element={<VehicleDetail />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
