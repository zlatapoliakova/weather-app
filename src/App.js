import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import WeatherDetailsPage from "./pages/WeatherDetailsPage";
import SavedCitiesPage from "./pages/SavedCitiesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/weather/:city" element={<WeatherDetailsPage />} />
        <Route path="/saved" element={<SavedCitiesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
