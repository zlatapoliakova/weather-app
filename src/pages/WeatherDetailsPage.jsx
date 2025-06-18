import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useOpenWeatherServices from "../services/OpenWeatherServices";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ForecastCard from "../components/ForecastCard";
import ForecastToggleButtons from "../components/ForecastToggleButtons";

import favIcon from "../resource/img/favorite.svg";

const WeatherDetailsPage = () => {
  const { city } = useParams();
  const { getCityWeather, getCityForecast, clearError } = useOpenWeatherServices();

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      clearError();

      try {
        const current = await getCityWeather(city);
        if (!current || current.length === 0) throw new Error("Погода не знайдена");

        const currentWeather = current[0];
        const weekForecast = await getCityForecast(currentWeather.name);

        setWeather(currentWeather);
        setForecast(weekForecast);
        setSelectedDay(weekForecast[0]);
      } catch (e) {
        setError("Не вдалося завантажити дані: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [city]);

  if (loading) return <div className="text-center text-gray-500">Завантаження...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;
  if (!weather || !selectedDay) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">
              {weather.name}, {weather.country}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {selectedDay.day}
            </p>
          </div>
          <button className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded transition">
            <img src={favIcon} alt="Star icon" className="w-5 h-5 mr-2" />
            Зберегти
          </button>
        </div>

        {/* Прогноз на вибраний день */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center mb-6">
          <div className="flex items-start space-x-6">
            <img
              src={`https://openweathermap.org/img/wn/${selectedDay.icon}@2x.png`}
              alt={selectedDay.description}
              className="w-20 h-20"
            />
            <div className="text-left">
              <p className="text-4xl font-bold">{selectedDay.temp}°C</p>
              <p className="text-gray-600 capitalize">{selectedDay.description}</p>
              <p className="text-sm text-gray-500 mt-1">Дата: {selectedDay.day}</p>
            </div>
          </div>
        </div>

        <ForecastToggleButtons />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {forecast.map((dayData, i) => (
            <div key={i} onClick={() => setSelectedDay(dayData)} className="cursor-pointer">
              <ForecastCard
                day={dayData.date}
                icon={dayData.icon}
                temp={dayData.temp}
                description={dayData.description}
                date={dayData.day}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WeatherDetailsPage;
