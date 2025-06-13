import Header from "../components/Header";
import Footer from "../components/Footer";
import ForecastCard from "../components/ForecastCard";

const SavedCitiesPage = () => {
  const savedCities = [
    {
      city: "Київ",
      country: "UA",
      icon: "01d",
      temp: 22,
      description: "ясно",
    },
    {
      city: "Львів",
      country: "UA",
      icon: "04d",
      temp: 18,
      description: "хмарно",
    },
    {
      city: "Одеса",
      country: "UA",
      icon: "10d",
      temp: 25,
      description: "дощ",
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-8 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Збережені міста</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedCities.map(({city, country, icon, temp, description}, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {city}, {country}
              </h3>
              <ForecastCard
                day="Сьогодні"
                icon={icon}
                temp={temp}
                description={description}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SavedCitiesPage;
