import { useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import WeatherCardList from "../components/WeatherCardList";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        searchValue={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Погода у популярних містах
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Тут відображається погода у найпопулярніших містах. Введіть назву міста у пошук зверху для швидкого пошуку.
        </p>

        <WeatherCardList searchTerm={searchTerm} />
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
