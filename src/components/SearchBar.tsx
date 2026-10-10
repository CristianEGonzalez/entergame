import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscá tu juego, consola o accesorio..." 
}) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex w-full items-center rounded-2xl bg-white p-2 shadow-sm border border-gray-200 transition-all focus-within:ring-2 focus-within:ring-red-500"
    >
      <span className="pl-3 text-gray-400 text-lg">🔍</span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-3 py-2 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-brand-purple px-5 py-2.5 text-xs md:text-sm font-bold text-white shadow-md transition-all hover:bg-brand-purple/80 active:scale-95 cursor-pointer"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;