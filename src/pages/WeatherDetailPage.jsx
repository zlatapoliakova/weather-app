import Footer from "../components/Footer";
import Header from "../components/Header";
import ForecastCard from "../components/ForecastCard";
import ForecastToggleButtons from "../components/ForecastToggleButtons";

import favIcon from "../resource/img/favorite.svg";

const weekForecast = Array.from({ length: 7 }).map((_, i) => ({
    day: ["Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота", "Неділя"][i],
    icon: "10d",
    temp: 21 + i,
    description: "сонячно",
}));

const WeatherDetailsPage = () => {
    return (
      <>
        <Header />
  
        <div className="min-h-screen bg-gray-100 py-8 px-4 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Київ, UA</h2>
            <button className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded transition">
              <img src={favIcon} alt="Star icon" className="w-5 h-5 mr-2" />
              Зберегти
            </button>
          </div>
  
          <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center mb-6">
            <div className="flex items-start space-x-6">
              <img
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt="Погода"
                className="w-20 h-20"
              />
              <div className="text-left">
                <p className="text-4xl font-bold">22°C</p>
                <p className="text-gray-600 capitalize">ясно</p>
                <p className="text-sm text-gray-500 mt-1">Відчувається як: 20°C</p>
              </div>
            </div>
  
            <div className="mt-4 md:mt-0 md:ml-auto text-sm text-gray-600 text-right">
              <p>Вологість: 60%</p>
              <p>Вітер: 5 м/с</p>
            </div>
          </div>
  
          <ForecastToggleButtons />
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {weekForecast.map(({ day, icon, temp, description }, i) => (
              <ForecastCard
                key={i}
                day={day}
                icon={icon}
                temp={temp}
                description={description}
              />
            ))}
          </div>
        </div>
  
        <Footer />
      </>
    );
  };

export default WeatherDetailsPage;
