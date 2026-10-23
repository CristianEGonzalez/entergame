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
  appliedPlatform,
  appliedCategory,
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

  const hasCategoryOrPlatformActive = appliedCategory !== "todas" || appliedPlatform !== "Todas";

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      
      {/* Cabecera del filtro */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
        <h3 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-2">
          🔍 Filtrar Categoría
        </h3>
        {hasCategoryOrPlatformActive && (
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
        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
          Categoría
        </label>
        <div className="grid grid-cols-1 gap-1">
          {categories.map((cat) => {
            const isActive = tempCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setTempCategory(cat.id)}
                className={`text-left text-xs font-medium px-3 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                  isActive 
                    ? "bg-blue-500 text-white font-bold shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}

          {/* Filtro de Ofertas basado en la existencia de offert */}
          <button
            onClick={() => setTempCategory("oferta")}
            className={`text-left text-xs font-medium px-3 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer mt-1 ${
              tempCategory === "oferta"
                ? "bg-red-600 text-white font-bold shadow-sm"
                : "text-red-600 bg-red-50 hover:bg-red-100 font-semibold"
            }`}
          >
            <span>🔥 Ofertas Especiales</span>
          </button>
        </div>
      </div>

      {/* 2. Plataformas */}
      {availablePlatforms.length > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
            Plataforma
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto sm:max-h-none">
            <button
              onClick={() => setTempPlatform("Todas")}
              className={`text-left text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                tempPlatform === "Todas"
                  ? "bg-pink-500 text-white font-bold shadow-sm"
                  : "text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
              }`}
            >
              🎮 Todas
            </button>
            {availablePlatforms.map((platform) => {
              const isActive = tempPlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={() => setTempPlatform(platform)}
                  className={`text-left text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "bg-pink-500 text-white font-bold shadow-sm"
                      : "text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                  }`}
                >
                  {platform}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Botón Aplicar */}
      {isMobile && (
        <div className="border-t border-gray-100 pt-3 mt-1">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-brand-purple text-white font-bold py-2.5 rounded-xl text-xs shadow-md cursor-pointer"
          >
            Aplicar filtros y ver resultados
          </button>
        </div>
      )}

    </div>
  );
};

export default CatalogFilters;