import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";

interface Game {
  id: number;
  title: string;
  src: string;
  price: string;
  status: string; // "Reservado" o vacío
  stock: number;  // Se renderizan solo con stock >= 1
  category?: string; // "consola" | "juego-nuevo" | "juego-usado" | "accesorio"
}

const Catalogo: React.FC = () => {
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // URL de API de Google Sheets
  const SHEET_API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  useEffect(() => {
    fetch(SHEET_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API: " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setGames(data);
        } else {
          console.error("La API no devolvió una lista válida:", data);
          setGames([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el catálogo desde Google Sheets:", err);
        setGames([]);
        setLoading(false);
      });
  }, []);

  // FILTRADO GENERAL: stock >= 1 y título válido
  const validGames = games.filter((game) => {
    const stockNum = Number(game.stock) || 0;
    return stockNum >= 1 && game.title && game.title.trim() !== "";
  });

  // SEPARACIÓN POR CATEGORÍAS
  const consolas = validGames.filter(g => (g.category || "").toLowerCase().trim() === "consola");
  const juegosNuevos = validGames.filter(g => (g.category || "").toLowerCase().trim() === "juego-nuevo");
  const juegosUsados = validGames.filter(g => (g.category || "").toLowerCase().trim() === "juego-usado");
  const accesorios = validGames.filter(g => (g.category || "").toLowerCase().trim() === "accesorio");

  // Función reutilizable para renderizar una grilla de productos por sección
  const renderProductGrid = (items: Game[]) => {
    if (items.length === 0) return null;

    return (
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full max-w-6xl mx-auto mb-16">
        {items.map((game) => {
          const isReserved = game.status === "Reservado";

          return (
            <div 
              key={game.id} 
              className={`flex flex-col w-[45%] sm:w-[30%] lg:w-[24%] max-w-60 ${isReserved ? "cursor-default opacity-90" : "group cursor-pointer"}`}
              onClick={() => !isReserved && setContactOpen(true)}
            >
              {/* Portada / Imagen */}
              <div className={`relative rounded-2xl overflow-hidden mb-4 aspect-2/3 border border-gray-100 transform transition-transform duration-500 ${
                isReserved ? "grayscale-30 shadow-sm" : "shadow-lg group-hover:-translate-y-2 group-hover:shadow-2xl"
              }`}>
                
                <img 
                  src={game.src} 
                  alt={game.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${isReserved ? "" : "group-hover:scale-105"}`}
                />
                
                {/* === FRANJA DIAGONAL DE RESERVADO === */}
                {isReserved && (
                  <div className="absolute top-6 -right-12 w-48 bg-amber-400 text-gray-900 text-xs sm:text-sm font-black py-1.5 text-center transform rotate-45 z-20 shadow-lg uppercase tracking-widest border-y border-amber-500">
                    Reservado
                  </div>
                )}

                {/* Overlay al pasar el mouse */}
                {!isReserved && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center z-10">
                    <span className="opacity-0 group-hover:opacity-100 bg-red-600 text-white font-bold text-sm py-2 px-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Consultar
                    </span>
                  </div>
                )}
              </div>
              
              {/* Info del producto */}
              <span className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                isReserved ? "text-gray-400" : "text-gray-500"
              }`}>
                $ {Number(game.price.toString().replace(/[^0-9]/g, "")).toLocaleString('en-US')} 
              </span>
              <h3 className={`font-bold text-lg md:text-xl leading-tight transition-colors ${
                isReserved ? "text-gray-500" : "text-gray-900 group-hover:text-red-600"
              }`}>
                {game.title}
              </h3>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <section
        id="catalogo"
        className="relative w-full py-24 px-4 lg:px-8 bg-white font-sans overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-center">
          
          {/* === ENCABEZADO PRINCIPAL === */}
          <span className="inline-block w-fit font-bold text-red-600 text-xs sm:text-sm mb-4 tracking-widest bg-red-50 border border-red-100 px-5 py-2 rounded-full uppercase shadow-sm">
            🔥 Catálogo Oficial
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 text-center tracking-tight leading-tight">
            Todo para tu Setup<br className="hidden sm:block" /> en un Solo Lugar
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl text-center mb-20 font-medium leading-relaxed">
            Explorá nuestras consolas, juegos nuevos y usados, y accesorios con stock actualizado en tiempo real.
          </p>

          {/* === ESTADO DE CARGA === */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Cargando catálogo en tiempo real...</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              
              {/* === SECCIÓN: JUEGOS USADOS === */}
              {juegosUsados.length > 0 && (
                <div className="w-full mb-16">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">👾 Juegos Usados</h3>
                    <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full"></div>
                  </div>
                  {renderProductGrid(juegosUsados)}
                </div>
              )}

              {/* === SECCIÓN: JUEGOS NUEVOS === */}
              {juegosNuevos.length > 0 && (
                <div className="w-full mb-16">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">🆕 Juegos Nuevos (Sellados)</h3>
                    <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full"></div>
                  </div>
                  {renderProductGrid(juegosNuevos)}
                </div>
              )}

              {/* === SECCIÓN: CONSOLAS === */}
              {consolas.length > 0 && (
                <div className="w-full mb-16">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">🎮 Consolas</h3>
                    <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full"></div>
                  </div>
                  {renderProductGrid(consolas)}
                </div>
              )}

              {/* === SECCIÓN: ACCESORIOS === */}
              {accesorios.length > 0 && (
                <div className="w-full mb-16">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">🎧 Accesorios</h3>
                    <div className="w-16 h-1 bg-red-600 mx-auto mt-2 rounded-full"></div>
                  </div>
                  {renderProductGrid(accesorios)}
                </div>
              )}

            </div>
          )}

          {/* === BANNER DE CONSULTA === */}
          <div className="w-full bg-gray-50 border border-gray-200 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8 mt-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">
                ¿No encontrás el que buscás?
              </h3>
              <p className="text-gray-600 font-medium text-lg max-w-xl">
                Traemos productos a pedido todas las semanas. Escribinos para consultar por títulos específicos de Nintendo, PlayStation o Xbox.
              </p>
            </div>
            
            <button 
              onClick={() => setContactOpen(true)}
              className="shrink-0 bg-gray-900 text-white font-bold text-lg py-4 px-10 rounded-full shadow-xl hover:bg-black hover:shadow-gray-900/40 transition-all transform hover:-translate-y-1"
            >
              Consultar Stock
            </button>
          </div>

        </div>
      </section>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
};

export default Catalogo;