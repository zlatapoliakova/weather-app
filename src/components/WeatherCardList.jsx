import { useDeferredValue, useEffect, useState } from "react";
import useOpenWeatherServices from "../services/OpenWeatherServices";

import WeatherCard from "./WeatherCard";

import loadSvg from "../resource/img/loading-arrows.svg";

const popularCities = ["Київ", "Львів", "Харків", "Одеса", "Дніпро"];

const WeatherCardList = ({ searchTerm }) => {
  const deferredSearch = useDeferredValue(searchTerm);

  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getCityWeather, clearError } = useOpenWeatherServices();

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      clearError();
  
      try {
        if (deferredSearch && deferredSearch.trim() !== "") {
          const data = await getCityWeather(deferredSearch.trim());
          setWeatherData(data);
        } else {
          const results = await Promise.all(
            popularCities.map(async (city) => {
              try {
                const res = await getCityWeather(city);
                return res[0];
              } catch {
                return null;
              }
            })
          );
          setWeatherData(results.filter(Boolean));
        }
      } catch (e) {
        setWeatherData([]);
        setError(e.message);
        console.error("Помилка:", e.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredSearch]);

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-lg mx-auto">
      {loading ? (
        <div className="text-center text-gray-500">
          <img src={loadSvg} alt="Loading" className="mx-auto w-10 h-10" />
          <p>Завантаження даних...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : weatherData.length ? (
        weatherData.map((city, index) => (
          <WeatherCard
            key={city.id || city.name || index}
            {...city}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">Місто не знайдено</p>
      )}
    </div>
  );
};

export default WeatherCardList;
