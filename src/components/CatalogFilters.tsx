import React from "react";

interface CatalogFiltersProps {
  tempCategory: string;
  setTempCategory: (cat: string) => void;
  tempPlatform: string;
  setTempPlatform: (plat: string) => void;
  availablePlatforms: string[];
  hasUnappliedFilters: boolean;
  appliedPlatform: string;
  appliedCategory: string;
  searchQuery?: string;
  handleResetFilters: () => void;
  handleApplyFilters: () => void;
  isMobile?: boolean;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  tempCategory,
  setTempCategory,
  tempPlatform,
  setTempPlatform,
  availablePlatforms,
  hasUnappliedFilters,
  appliedPlatform,
  appliedCategory,
  searchQuery,
  handleResetFilters,
  handleApplyFilters,
  isMobile = false,
}) => {
  const categories = [
    { id: "todas", label: "✨ Todas las categorías" },
    { id: "juego-nuevo", label: "🆕 Juegos Nuevos" },
    { id: "juego-usado", label: "👾 Juegos Usados" },
    { id: "consola", label: "🎮 Consolas" },
    { id: "accesorio", label: "🎧 Accesorios" },
  ];

  const hasActiveFilters = appliedPlatform !== "Todas" || appliedCategory !== "todas" || (searchQuery && searchQuery.trim() !== "");

  return (
    <div className="flex flex-col gap-6">
      {/* Cabecera del filtro */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          🔍 Filtrar Productos
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={handleResetFilters}
            className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* 1. Categorías */}
      <div>
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-3">
          Categoría
        </label>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const isActive = tempCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setTempCategory(cat.id)}
                className={`text-left text-xs font-medium px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                  isActive 
                    ? "bg-blue-500 text-white font-bold shadow-sm" 
                    : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Plataformas */}
      {availablePlatforms.length > 0 && (
        <div className="border-t border-gray-200 pt-5">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-3">
            Plataforma
          </label>
          <div className="flex flex-wrap lg:flex-col gap-1.5">
            <button
              onClick={() => setTempPlatform("Todas")}
              className={`text-left text-xs font-medium px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                tempPlatform === "Todas"
                  ? "bg-pink-500 text-white font-bold shadow-sm"
                  : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
              }`}
            >
              🎮 Todas las plataformas
            </button>
            {availablePlatforms.map((platform) => {
              const isActive = tempPlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={() => setTempPlatform(platform)}
                  className={`text-left text-xs font-medium px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-pink-500 text-white font-bold shadow-sm"
                      : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                  }`}
                >
                  {platform}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Botón Aplicar (En Desktop va abajo del aside; en Móvil lo maneja el modal o se muestra aquí) */}
      {hasUnappliedFilters && isMobile && (
        <div className="border-t border-gray-100 pt-4 mt-2">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-brand-purple text-white font-bold py-3.5 rounded-xl text-xs shadow-md cursor-pointer"
          >
            Aplicar filtros y ver resultados
          </button>
        </div>
      )}

      {hasUnappliedFilters && !isMobile && (
        <div className="border-t border-gray-200 pt-5 mt-auto">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-brand-purple text-white font-bold py-3 rounded-xl text-xs shadow-md hover:bg-brand-purple/80 transition-all scale-105 cursor-pointer"
          >
            Aplicar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogFilters;