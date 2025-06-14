import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import MainPage from './pages/MainPage';
import WeatherDetailPage from './pages/WeatherDetailPage'
import SavedCitiesPage from './pages/SavedCitiesPage';

import './App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/weather" element={<WeatherDetailPage/>} />
          <Route path="/saved" element={<SavedCitiesPage/>} />
        </Routes>
    </Router>
  );
}

export default App;
