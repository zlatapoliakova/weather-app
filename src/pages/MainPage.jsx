import { useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import WeatherCardList from "../components/WeatherCardList";
import ErrorBoundary from "../components/ErrorBoundary";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (/\d/.test(value)) {
      setInputError(true);
    } else {
      setInputError(false);
    }
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        inputError={inputError}
      />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Погода у популярних містах
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Тут відображається погода у найпопулярніших містах. Введіть назву міста
          у пошук зверху для швидкого пошуку.
        </p>

        <ErrorBoundary>
          <WeatherCardList searchTerm={inputError ? "" : searchTerm} />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
