const ForecastToggleButtons = () => {
    return (
      <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 rounded font-semibold bg-blue-600 text-white cursor-default">
          Тиждень
        </button>
        <button
          disabled
          className="px-4 py-2 rounded font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
          title="Доступно у платному тарифі"
        >
          10 днів
        </button>
        <button
          disabled
          className="px-4 py-2 rounded font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
          title="Доступно у платному тарифі"
        >
          Місяць
        </button>
      </div>
    );
};

export default ForecastToggleButtons;
  