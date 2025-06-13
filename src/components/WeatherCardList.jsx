import WeatherCard from "./WeatherCard";

import loadSvg from "../resource/img/loading-arrows.svg";

const allCities = [
    { id: 1, name: "Київ", temp: 22, description: "ясно", humidity: 60, wind: 5 },
    { id: 2, name: "Лондон", temp: 15, description: "хмарно", humidity: 70, wind: 6 },
    { id: 3, name: "Нью-Йорк", temp: 25, description: "сонячно", humidity: 50, wind: 4 },
    { id: 4, name: "Токіо", temp: 20, description: "дощ", humidity: 85, wind: 3 },
    { id: 5, name: "Париж", temp: 18, description: "туман", humidity: 65, wind: 5 },
  ];  

const WeatherCardList = () => {
  return (
    <>
      <div className="flex flex-col space-y-4 p-4 max-w-lg mx-auto">
        {allCities.map(({ id, ...props }) => (
          <WeatherCard key={id} {...props} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center space-x-2"
          type="button"
        >
          <span>Завантажити ще</span>
          <img src={loadSvg} alt="Load more" className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default WeatherCardList;
