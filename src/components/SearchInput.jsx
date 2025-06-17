import search from "../resource/img/search.svg";

const SearchInput = ({ value, onChange, placeholder }) => {
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
        disabled
        className="bg-gray-300 px-4 rounded-r flex items-center justify-center"
      >
        <img src={search} alt="Search icon" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchInput;
