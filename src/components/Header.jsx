import {Link} from 'react-router-dom';

import logo from '../resource/img/weather-svgrepo-com.svg';
import SearchInput from './SearchInput';

const Header = ({ searchValue, onSearchChange }) => {
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" >
                    <div className="flex items-center space-x-3">
                        <img src={logo} alt="Weather app logo" className="w-12 h-12 object-contain" />
                        <h1 className="text-2xl font-bold">WeatherApp</h1>
                    </div>
                </Link>

                <SearchInput
                value={searchValue}
                onChange={onSearchChange}
                placeholder="Пошук міста"
                />

                <nav className="space-x-6 text-lg font-semibold">
                    <Link to="/" className="hover:underline">Головна</Link>
                    <Link to="/saved" className="hover:underline">Улюблені</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;