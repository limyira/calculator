import Home from "./Router/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Header";
import Hour from "./Router/Hour";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/hour" element={<Hour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// rgb(245, 245, 247)
