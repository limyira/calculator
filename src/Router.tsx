import Home from "./Category/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Header";
import Hour from "./Category/Hour";
import WorkTax from "./Category/WorkTax";

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/*" element={<Home />}></Route>
        <Route path="hour" element={<Hour />} />
        <Route path="workTax" element={<WorkTax />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
