import Home from "./Category/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Header";
import Hour from "./Category/Hour";
import WorkTax from "./Category/WorkTax";
import Insurance from "./Category/Insurance";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="hour/*" element={<Hour />} />
          <Route path="workTax/*" element={<WorkTax />} />
          <Route path="insurance" element={<Insurance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
