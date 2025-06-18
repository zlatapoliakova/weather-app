import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ForecastCard from "../components/ForecastCard";

const SavedCitiesPage = () => {
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCities")) || [];
    setSavedCities(saved);
  }, []);

  if (savedCities.length === 0)
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 py-8 px-4 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Збережені міста</h2>
          <p>Поки немає збережених міст.</p>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Збережені міста</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedCities.map(({ id, name, country, icon, temp, description }) => (
            <div key={id} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold mb-2">
                {name}, {country}
              </h3>
              <Link to={`/weather/${name}`} className="block">
                <ForecastCard
                  day="Сьогодні"
                  icon={icon}
                  temp={temp}
                  description={description}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SavedCitiesPage;
