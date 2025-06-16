const ForecastCard = ({ day, icon, temp, description }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <p className="font-medium text-gray-700 mb-2">{day}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="погода"
        className="w-12 h-12"
      />
      <p className="text-lg font-bold mt-2">{temp > 0 ? `+${temp}°C` : `${temp}°C`}</p>
      <p className="text-sm text-gray-500 capitalize">{description}</p>
    </div>
  );
};

export default ForecastCard;