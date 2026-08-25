import React from "react";
import ContactButton from "./ContactButton";
import SlidesCarrousel from "./SlidesCarrousel";

const Hero: React.FC = () => {
  const featuredGames = [
    {
      id: 1,
      title: "The Legend of Zelda",
      src: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg", 
      alt: "The Legend of Zelda",
      rotation: "-rotate-6",
    },
    {
      id: 2,
      title: "Super Mario Odyssey",
      src: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1mxf.jpg", 
      alt: "Super Mario Odyssey",
      rotation: "rotate-3",
    },
    {
      id: 3,
      title: "Super Smash Bros",
      src: "https://i.3djuegos.com/juegos/15649/super_smash_bros_switch/fotos/ficha/super_smash_bros_switch-4581613.webp", 
      alt: "Super Smash Bros Ultimate",
      rotation: "-rotate-2",
    },
    {
      id: 4,
      title: "Pokémon Violet",
      src: "https://m.media-amazon.com/images/M/MV5BZmU1NzA4MjYtOTU2YS00Y2E4LTk1ZTItMWEyYTAyZTczMDQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", 
      alt: "Pokémon Violet",
      rotation: "rotate-6",
    },
  ];

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[90vh] flex items-center justify-center px-4 py-12 lg:px-8 overflow-hidden bg-gray-50 font-sans"
    >

      {/* Patrón de puntos súper sutil opcional */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px] opacity-50 pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl w-full z-10 items-center">
        
        {/* === COLUMNA IZQUIERDA: Texto y Galería === */}
        <div className="text-left animate-fade-in-up flex flex-col justify-center">
          
          {/* Etiqueta estilo insignia de juego */}
          <span className="inline-block w-fit font-bold text-white text-xs sm:text-sm mb-6 tracking-widest bg-red-600 px-4 py-1.5 rounded-full shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] uppercase">
            🎮 Tu nueva aventura empieza acá
          </span>

          {/* Título adaptado a fondo claro */}
          <h1 className="text-3xl sm:text-4xl xl:text-5xl text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Compra, Venta y <br className="hidden lg:block" />
            Canje de juegos <br className="hidden lg:block" />
            <span className="text-red-600">
              Nintendo&nbsp;
            </span>
            <span className="text-cyan-500">
               Switch&nbsp;
            </span>
          </h1>

          <p className="text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed max-w-lg font-medium">
            Encontrá los mejores títulos para tu consola. Renová tu colección y dale una segunda vida a los juegos que ya pasaste al mejor precio.
          </p>

          {/* Botones estilo "Joy-Con" */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#catalogo"
              className="bg-red-600 text-white font-orbitron font-bold text-lg py-3.5 px-8 rounded-full text-center hover:bg-red-700 hover:shadow-[0_8px_20px_rgba(220,38,38,0.4)] transition-all transform hover:-translate-y-1"
            >
              Ver Catálogo
            </a>
            <ContactButton
              nombre="Consultar Stock"
              className="bg-white border-2 font-orbitron border-blue-500 text-blue-600 font-bold text-lg py-3 px-8 rounded-full text-center hover:bg-blue-50 hover:shadow-[0_8px_20px_rgba(59,130,246,0.3)] transition-all transform hover:-translate-y-1"
            />
          </div>

          {/* === Galería Flotante === */}
          <div className="pt-8 border-t border-gray-200 max-w-lg">
            <p className="text-sm text-gray-500 font-bold mb-5 uppercase tracking-widest">
              Títulos Destacados
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {featuredGames.map((game) => (
                <div 
                  key={game.id}
                  className={`relative group cursor-pointer transition-all duration-500 hover:z-20 ${game.rotation} hover:rotate-0`}
                >
                  {/* Hover con colores rojo/azul (Ajustado para fondo claro) */}
                  <div className="absolute inset-0 bg-linear-to-tr from-red-400 to-blue-400 rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-110" />
                  
                  <img
                    src={game.src}
                    alt={game.alt}
                    className="relative w-16 sm:w-20 md:w-24 aspect-2/3 object-cover rounded-lg shadow-xl shadow-gray-200/50 border border-gray-100 group-hover:border-white transform group-hover:-translate-y-3 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* === COLUMNA DERECHA: CAROUSEL === */}
        <SlidesCarrousel />
        
      </div>
    </section>
  );
};

export default Hero;