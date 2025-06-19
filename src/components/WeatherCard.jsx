import { Link } from "react-router-dom";

const WeatherCard = ({ name, icon, temp, description, humidity, wind, date }) => {
  return (
    <Link
      to={`/weather/${encodeURIComponent(name)}`}
      className="relative bg-white rounded-lg shadow-md p-4 flex justify-between items-center w-full mx-auto"
    >
      <div className="absolute top-2 right-3 text-xs text-gray-500">
        {date}
      </div>

      <div className="flex items-center space-x-4">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-16 h-16"
        />
        <div className="text-left">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-2xl font-bold text-blue-600">{temp}°C</p>
          <p className="capitalize text-gray-500">{description}</p>
        </div>
      </div>

      <div className="text-sm text-left text-gray-500 pr-2">
        <p>Вологість: {humidity}%</p>
        <p>Вітер: {wind} м/с</p>
      </div>
    </Link>
  );
};

export default WeatherCard;
