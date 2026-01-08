import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GuestsYes from "./pages/GuestsYes";
import GuestsNo from "./pages/GuestsNo";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/yes" element={<GuestsYes />} />

      <Route
        path="/no"
        element={
          <ProtectedRoute>
            <GuestsNo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
