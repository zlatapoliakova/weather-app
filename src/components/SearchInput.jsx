import search from "../resource/img/search.svg";

const SearchInput = ({ value, onChange, onSearch, placeholder }) => {
    return (
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-64 py-2 px-3 rounded-l border-t border-l border-b border-gray-300 focus:outline-none text-black"
        />
        <button
            onClick={onSearch}
            className="bg-gray-300 hover:bg-blue-400 px-4 rounded-r transition flex items-center justify-center"
        >
            <img src={search} alt="Search icon" className="w-5 h-5" />
        </button>
      </div>
    );
};

export default SearchInput;
  