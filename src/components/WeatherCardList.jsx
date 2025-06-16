import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import loadSvg from "../resource/img/loading-arrows.svg";
import useOpenWeatherServices from "../services/OpenWeatherServices";

const cityList = ["Kyiv", "London", "New York", "Tokyo", "Paris"];

const cityNamesUa = {
  Kyiv: "Київ",
  London: "Лондон",
  "New York": "Нью-Йорк",
  Tokyo: "Токіо",
  Paris: "Париж",
};

const WeatherCardList = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCityWeather, clearError } = useOpenWeatherServices();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      clearError();

      try {
        const results = await Promise.all(
          cityList.map((city) => getCityWeather(city))
        );
        setWeatherData(results);
      } catch (error) {
        console.error("Не вдалося отримати дані:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-4 p-4 max-w-lg mx-auto">
        {loading ? (
          <div className="text-center text-gray-500">
            <img src={loadSvg} alt="Loading" className="mx-auto w-10 h-10" />
            <p>Завантаження даних...</p>
          </div>
        ) : (
          weatherData.map((city) => (
            <WeatherCard
              key={city.id}
              {...city}
              name={cityNamesUa[city.name] || city.name}
            />
          ))
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center space-x-2"
          type="button"
          disabled
        >
          <span>Завантажити ще</span>
          <img src={loadSvg} alt="Load more" className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default WeatherCardList;
