const ForecastCard = ({ day, date, icon, temp, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded shadow text-center hover:shadow-md transition cursor-pointer`}
    >
      <h4 className="font-semibold text-lg">{day}</h4>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="w-16 h-16 mx-auto"
      />
      <p className="text-xl font-bold">{temp}°C</p>
      <p className="capitalize text-gray-600">{description}</p>
    </div>
  );
};

export default ForecastCard;
