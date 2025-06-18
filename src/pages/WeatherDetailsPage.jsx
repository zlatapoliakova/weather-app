import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useOpenWeatherServices from "../services/OpenWeatherServices";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ForecastCard from "../components/ForecastCard";

import star from "../resource/img/favorite.svg"
import sunrise from "../resource/img/sunrise.svg";
import sunset from "../resource/img/sunset.svg";

const WeatherDetailsPage = () => {
  const { city } = useParams();
  const { getCityWeather, getCityForecast, clearError } = useOpenWeatherServices();

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

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

        const saved = JSON.parse(localStorage.getItem("savedCities")) || [];
        const alreadySaved = saved.some((item) => item.name === currentWeather.name);
        setIsSaved(alreadySaved);
      } catch (e) {
        setError("Не вдалося завантажити дані: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line
  }, [city]);

  const handleToggleSave = () => {
    const saved = JSON.parse(localStorage.getItem("savedCities")) || [];

    const alreadySaved = saved.some((item) => item.name === weather.name);

    if (alreadySaved) {
      const updated = saved.filter((item) => item.name !== weather.name);
      localStorage.setItem("savedCities", JSON.stringify(updated));
      setIsSaved(false);
    } else {
      const newCity = {
        id: Date.now(),
        name: weather.name,
        country: weather.country,
        icon: selectedDay.icon,
        temp: selectedDay.temp,
        description: selectedDay.description,
      };
      const updated = [...saved, newCity];
      localStorage.setItem("savedCities", JSON.stringify(updated));
      setIsSaved(true);
    }
  };

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

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
            <p className="text-gray-600 text-sm mt-1">{selectedDay.day}</p>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={handleToggleSave}
              className={`flex items-center px-4 py-2 rounded text-white space-x-2 ${
                isSaved ? "bg-green-600 hover:bg-green-700" : "bg-yellow-400 hover:bg-yellow-500"
              }`}
            >
              <img src={star} alt="star icon" className="w-5 h-5" />
              <span>{isSaved ? "Збережено" : "Зберегти"}</span>
            </button>

            <p
              className={`mt-2 text-sm italic transition-opacity duration-300 ${
                isSaved ? "text-gray-600 opacity-100" : "opacity-0"
              }`}
            >
              Натисніть, щоб прибрати із улюблених
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto mb-6">
          <div className="flex items-center space-x-6 max-w-sm">
            <img
              src={`https://openweathermap.org/img/wn/${selectedDay.icon}@2x.png`}
              alt={selectedDay.description}
              className="w-40 h-40"
            />
            <div className="text-left">
              <p className="text-4xl font-bold">{selectedDay.temp}°C</p>
              <p className="text-gray-600 capitalize">{selectedDay.description}</p>
              <p className="text-sm text-gray-500 mt-1">Дата: {selectedDay.day}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 max-w-md">
            <div className="flex justify-start gap-10 mb-6 text-yellow-600 text-lg font-semibold">
              <div className="flex items-center gap-2">
                <img src={sunrise} alt="Схід сонця" className="w-6 h-6" />
                <span>Схід: <strong>{formatTime(weather.sunrise)}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <img src={sunset} alt="Захід сонця" className="w-6 h-6" />
                <span>Захід: <strong>{formatTime(weather.sunset)}</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700 text-sm">
              <p>Відчувається як: <strong>{weather.feels_like}°C</strong></p>
              <p>Вологість: <strong>{weather.humidity}%</strong></p>
              <p>Вітер: <strong>{weather.wind} м/с</strong></p>
              <p>Тиск: <strong>{weather.pressure} гПа</strong></p>
              <p>Хмарність: <strong>{weather.clouds}%</strong></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {forecast.map((dayData, i) => (
            <ForecastCard
              key={i}
              day={dayData.date}
              icon={dayData.icon}
              temp={dayData.temp}
              description={dayData.description}
              date={dayData.day}
              onClick={() => setSelectedDay(dayData)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WeatherDetailsPage;
