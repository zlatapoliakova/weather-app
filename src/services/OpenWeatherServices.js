import { useCallback } from "react";
import { useHttp } from "../hooks/http.hook";

const API_KEY = "17cec693d9b4dd2fc440be2150ff824f";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

const useOpenWeatherServices = () => {
  const { request, clearError } = useHttp();

  const getCityWeatherByCoords = useCallback(
    async (lat, lon, localName) => {
      const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&lang=uk&appid=${API_KEY}`;
      const data = await request(url);
      return {
        id: data.id,
        name: localName || data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: data.weather[0].icon,
        coord: data.coord,
      };
    },
    [request]
  );

  const getCityWeather = useCallback(
    async (cityName) => {
      const geoUrl = `${GEO_URL}/direct?q=${encodeURIComponent(cityName)}&limit=10&appid=${API_KEY}`;
      const locations = await request(geoUrl);

      if (!locations.length) throw new Error("Місто не знайдено");

      const limitedLocations = locations.slice(0, 10);

      const weatherList = await Promise.all(
        limitedLocations.map(async ({ lat, lon, local_names, name }) => {
          const localName = (local_names && local_names.uk) || name;
          try {
            return await getCityWeatherByCoords(lat, lon, localName);
          } catch {
            return null;
          }
        })
      );

      return weatherList.filter(Boolean);
    },
    [request, getCityWeatherByCoords]
  );

  const getCityForecast = useCallback(
    async (cityName) => {
      const geoUrl = `${GEO_URL}/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`;
      const locations = await request(geoUrl);

      if (!locations.length) throw new Error("Місто не знайдено");

      const { lat, lon } = locations[0];
      const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=uk&appid=${API_KEY}`;
      const forecastData = await request(url);

      // Групування записів по днях
      const groupedByDay = {};

      forecastData.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("uk-UA");
        if (!groupedByDay[date]) {
          groupedByDay[date] = [];
        }
        groupedByDay[date].push(item);
      });

      const dailyData = Object.values(groupedByDay)
        .slice(0, 7)
        .map((items) => {
          const noonItem = items.find((i) => i.dt_txt.includes("12:00:00")) || items[Math.floor(items.length / 2)];
          return {
            day: new Date(noonItem.dt * 1000).toLocaleDateString("uk-UA", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            date: new Date(noonItem.dt * 1000).toLocaleDateString("uk-UA", {
              day: "2-digit",
              month: "long",
            }),
            icon: noonItem.weather[0].icon,
            temp: Math.round(noonItem.main.temp),
            description: noonItem.weather[0].description,
          };
        });

      return dailyData;
    },
    [request]
  );

  return { getCityWeather, getCityForecast, clearError };
};

export default useOpenWeatherServices;
