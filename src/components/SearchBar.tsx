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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query); 
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex w-full items-center rounded-2xl bg-white p-1.5 sm:p-2 shadow-sm border border-gray-200 transition-all focus-within:ring-2 focus-within:ring-brand-cyan"
    >
      <span className="pl-3 text-gray-400 text-lg select-none">🔍</span>
      
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent px-3 py-1.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
      />

      {/* Botón "✕" para limpiar cuando hay texto */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}

      {/* Botón explícito de búsqueda para presionar */}
      <button
        type="submit"
        className="bg-brand-purple text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 transition-all cursor-pointer shrink-0 ml-1"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;