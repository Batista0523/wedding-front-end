import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GuestsYes from "./pages/GuestsYes";
import GuestsNo from "./pages/GuestsNo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/yes" element={<GuestsYes />} />
      <Route path="/no" element={<GuestsNo />} />
    </Routes>
  );
}

export default App;
