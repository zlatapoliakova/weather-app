import { useDeferredValue, useEffect, useState, useRef } from "react";
import useOpenWeatherServices from "../services/OpenWeatherServices";

import WeatherCard from "./WeatherCard";
import setContent from "../utils/setContent";

const popularCities = ["Київ", "Львів", "Харків", "Одеса", "Дніпро"];

const WeatherCardList = ({ searchTerm }) => {
  const deferredSearch = useDeferredValue(searchTerm);
  const [weatherData, setWeatherData] = useState([]);
  const [longLoading, setLongLoading] = useState(false);
  const { getCityWeather, clearError, process, setProcess } = useOpenWeatherServices();
  const timerRef = useRef(null);

  const isValidSearch = deferredSearch.trim() === "" || /^[а-яіїєґА-ЯІЇЄҐ\s-]+$/.test(deferredSearch.trim());

  useEffect(() => {
    const fetchWeather = async () => {
      clearError();
      setLongLoading(false);
      clearTimeout(timerRef.current);

      if (!isValidSearch) {
        setWeatherData([]);
        setProcess("confirmed");
        return;
      }

      timerRef.current = setTimeout(() => {
        setLongLoading(true);
      }, 5000);

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

        setProcess("confirmed");
      } catch (e) {
        setWeatherData([]);
        setProcess("error");
      } finally {
        clearTimeout(timerRef.current);
        setLongLoading(false);
      }
    };

    fetchWeather();
    // eslint-disable-next-line
  }, [deferredSearch]);

  const todayDate = new Date().toLocaleDateString("uk-UA");
  const hasSearch = deferredSearch.trim() !== "";

  const RenderedCards = () => {
    if (!isValidSearch) {
      return (
        <p className="text-center text-yellow-600">
          Спробуй ввести повну назву міста українською
        </p>
      );
    }

    if (longLoading) {
      return (
        <p className="text-center text-yellow-600">
          Пошук займає більше часу... Спробуйте ввести повну назву міста.
        </p>
      );
    }

    if (!weatherData.length && hasSearch) {
      return <p className="text-center text-gray-600">Місто не знайдено</p>;
    }

    return weatherData.map((city, index) => (
      <WeatherCard
        key={city.id || city.name || index}
        {...city}
        date={todayDate}
      />
    ));
  };

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-lg mx-auto">
      {setContent(process, RenderedCards)}
    </div>
  );
};

export default WeatherCardList;
