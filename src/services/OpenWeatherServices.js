import { useHttp } from "../hooks/http.hook";
import { useCallback } from "react";

const API_KEY = "17cec693d9b4dd2fc440be2150ff824f";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const useOpenWeatherServices = () => {
  const { request, clearError } = useHttp();

  const getCityWeather = useCallback(async (cityName) => {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&lang=uk&appid=${API_KEY}`;
    const data = await request(url);
    return {
      id: data.id,
      name: data.name,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: data.weather[0].icon,
      coord: data.coord,
    };
  }, [request]);

  const getCityForecast = useCallback(async (cityName) => {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&units=metric&lang=uk&appid=${API_KEY}`;
    const forecastData = await request(url);

    const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 7);

    return dailyData.map(dayData => ({
      day: new Date(dayData.dt * 1000).toLocaleDateString('uk-UA', { weekday: 'long' }),
      icon: dayData.weather[0].icon,
      temp: Math.round(dayData.main.temp),
      description: dayData.weather[0].description,
    }));
  }, [request]);

  return { getCityWeather, getCityForecast, clearError };
};

export default useOpenWeatherServices;
