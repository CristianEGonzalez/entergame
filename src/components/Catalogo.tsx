import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";

interface Game {
  id: number;
  title: string;
  src: string;
  price: string;
  status: string; // "Reservado" o vacío
  stock: number; // Se renderizan solo con stock >= 1
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
  const consolas = validGames.filter((g) => (g.category || "").toLowerCase().trim() === "consola");
  const juegosNuevos = validGames.filter((g) => (g.category || "").toLowerCase().trim() === "juego-nuevo");
  const juegosUsados = validGames.filter((g) => (g.category || "").toLowerCase().trim() === "juego-usado");
  const accesorios = validGames.filter((g) => (g.category || "").toLowerCase().trim() === "accesorio");

  // Función reutilizable para renderizar una grilla de productos por sección
  const renderProductGrid = (items: Game[]) => {
    if (items.length === 0) return null;

    return (
      <div className="mx-auto mb-16 flex w-full max-w-6xl flex-wrap justify-center gap-8 md:gap-16">
        {items.map((game) => {
          const isReserved = game.status === "Reservado";

          return (
            <div key={game.id} className={`flex w-[45%] max-w-60 flex-col sm:w-[30%] lg:w-[24%] ${isReserved ? "cursor-default opacity-90" : "group cursor-pointer"}`} onClick={() => !isReserved && setContactOpen(true)}>
              {/* Portada / Imagen */}
              <div className={`relative mb-4 aspect-2/3 transform overflow-hidden rounded-2xl border border-gray-100 transition-transform duration-500 ${isReserved ? "shadow-sm grayscale-30" : "shadow-lg group-hover:-translate-y-2 group-hover:shadow-2xl"}`}>
                <img src={game.src} alt={game.title} className={`h-full w-full object-cover transition-transform duration-700 ${isReserved ? "" : "group-hover:scale-105"}`} />

                {/* === FRANJA DIAGONAL DE RESERVADO === */}
                {isReserved && <div className="absolute top-6 -right-12 z-20 w-48 rotate-45 transform border-y border-amber-500 bg-amber-400 py-1.5 text-center text-xs font-black tracking-widest text-gray-900 uppercase shadow-lg sm:text-sm">Reservado</div>}

                {/* Overlay al pasar el mouse */}
                {!isReserved && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                    <span className="translate-y-4 transform rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Consultar</span>
                  </div>
                )}
              </div>

              {/* Info del producto */}
              <span className={`mb-1 text-sm font-bold tracking-wider uppercase ${isReserved ? "text-gray-400" : "text-gray-500"}`}>$ {Number(game.price.toString().replace(/[^0-9]/g, "")).toLocaleString("en-US")}</span>
              <h3 className={`text-lg leading-tight font-bold transition-colors md:text-xl ${isReserved ? "text-gray-500" : "text-gray-900 group-hover:text-red-600"}`}>{game.title}</h3>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <section id="catalogo" className="relative w-full overflow-hidden bg-white px-4 py-24 font-sans lg:px-8">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
          {/* === ENCABEZADO PRINCIPAL === */}
          <span className="mb-4 inline-block w-fit rounded-full border border-red-100 bg-red-50 px-5 py-2 text-xs font-bold tracking-widest text-red-600 uppercase shadow-sm sm:text-sm">🔥 Catálogo Oficial</span>

          <h2 className="mb-6 text-center text-4xl leading-tight font-black tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Todo para tu Diversión
            <br className="hidden sm:block" /> en un Solo Lugar
          </h2>

          <p className="mb-20 max-w-2xl text-center text-lg leading-relaxed font-medium text-gray-600">Explorá nuestros juegos nuevos y usados, consolas, y accesorios con stock actualizado en tiempo real.</p>

          {/* === ESTADO DE CARGA === */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
              <p className="font-medium text-gray-500">Cargando catálogo en tiempo real...</p>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center">
              {/* === SECCIÓN: JUEGOS USADOS === */}
              {juegosUsados.length > 0 && (
                <div className="mb-16 w-full">
                  <div className="mb-10 text-center">
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">👾 Juegos Usados</h3>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-red-600"></div>
                  </div>
                  {renderProductGrid(juegosUsados)}
                </div>
              )}

              {/* === SECCIÓN: JUEGOS NUEVOS === */}
              {juegosNuevos.length > 0 && (
                <div className="mb-16 w-full">
                  <div className="mb-10 text-center">
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">🆕 Juegos Nuevos (Sellados)</h3>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-red-600"></div>
                  </div>
                  {renderProductGrid(juegosNuevos)}
                </div>
              )}

              {/* === SECCIÓN: CONSOLAS === */}
              {consolas.length > 0 && (
                <div className="mb-16 w-full">
                  <div className="mb-10 text-center">
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">
                      🎮 Consolas
                      <br />
                      <span className="mb-8 max-w-xl font-sans text-lg leading-relaxed font-medium text-gray-700 sm:text-xl">Precio expresado en dólares</span>
                    </h3>

                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-red-600"></div>
                  </div>
                  {renderProductGrid(consolas)}
                </div>
              )}

              {/* === SECCIÓN: ACCESORIOS === */}
              {accesorios.length > 0 && (
                <div className="mb-16 w-full">
                  <div className="mb-10 text-center">
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 md:text-3xl">🎧 Accesorios</h3>
                    <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-red-600"></div>
                  </div>
                  {renderProductGrid(accesorios)}
                </div>
              )}
            </div>
          )}

          {/* === BANNER DE CONSULTA === */}
          <div className="mt-8 flex w-full flex-col items-center justify-between gap-8 rounded-4xl border border-gray-200 bg-gray-50 p-8 text-center md:flex-row md:p-12 md:text-left">
            <div>
              <h3 className="mb-3 text-2xl font-black tracking-tight text-gray-900 md:text-3xl">¿No encontrás lo que buscás?</h3>
              <p className="max-w-xl text-lg font-medium text-gray-600">Traemos productos a pedido todas las semanas. Escribinos para consultar por que quieras que nosotros nos encargamos.</p>
            </div>

            <button onClick={() => setContactOpen(true)} className="shrink-0 transform rounded-2xl bg-gray-900 px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-black hover:shadow-gray-900/40">
              Consultar Stock
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Catalogo;
