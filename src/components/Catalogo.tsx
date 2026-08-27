import React, { useState } from "react";
import ContactModal from "./ContactModal";
import featuredGames from "../data/juegos.json";

const Catalogo: React.FC = () => {
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  return (
    <>
      <section
        id="catalogo"
        className="relative w-full py-24 px-4 lg:px-8 bg-white font-sans overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-center">
          
          {/* === ENCABEZADO === */}
          <span className="inline-block w-fit font-bold text-red-600 text-xs sm:text-sm mb-4 tracking-widest bg-red-50 border border-red-100 px-5 py-2 rounded-full uppercase shadow-sm">
            🔥 Últimos Ingresos
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 text-center tracking-tight leading-tight">
            Catálogo de Juegos<br className="hidden sm:block" /> para tu Colección
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl text-center mb-16 font-medium leading-relaxed">
            Nuestro stock rota constantemente. Te mostramos algunos de los títulos destacados que acaban de entrar y están listos para entrega inmediata.
          </p>

          {/* === GRILLA DE JUEGOS DESTACADOS === */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full mb-16">
            {featuredGames.map((game) => (
              <div 
                key={game.id} 
                className="flex flex-col group cursor-pointer"
                onClick={() => setContactOpen(true)}
              >
                {/* Portada del juego */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4 aspect-2/3 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl border border-gray-100">
                  <img 
                    src={game.src} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay oscuro al pasar el mouse */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-red-600 text-white font-bold text-sm py-2 px-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Consultar
                    </span>
                  </div>
                </div>
                
                {/* Info del juego */}
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {game.status}
                </span>
                <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-red-600 transition-colors">
                  {game.title}
                </h3>
              </div>
            ))}
          </div>

          {/* === BANNER DE CONSULTA (EL VERDADERO CATÁLOGO) === */}
          <div className="w-full bg-gray-50 border border-gray-200 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">
                ¿No encontrás el que buscás?
              </h3>
              <p className="text-gray-600 font-medium text-lg max-w-xl">
                Traemos y canjeamos juegos nuevos todas las semanas. Escribinos para consultar el stock completo actualizado o para encargarnos ese título que te falta.
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