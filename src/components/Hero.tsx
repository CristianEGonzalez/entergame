import React from "react";
import ContactButton from "./ContactButton";
import InstagramCarousel from "./InstagramCarousel";
import SearchBar from "./SearchBar";

interface HeroProps {
  onSearchSubmit: (query: string) => void; // Prop para conectar con la lógica del catálogo
}

const Hero: React.FC<HeroProps> = ({ onSearchSubmit }) => {
  const WHATSAPP_CHANNEL_URL = import.meta.env.VITE_WHATSAPP_CHANNEL_URL;

  const handleSearch = (searchTerm: string) => {
    // 1. Ejecutamos la búsqueda
    onSearchSubmit(searchTerm);

    // 2. Desplazamiento suave hacia la sección del catálogo
    const catalogoElement = document.getElementById("catalogo");
    if (catalogoElement) {
      catalogoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="bg-brand-gray relative flex min-h-[90vh] w-full items-center overflow-hidden font-sans">
      {/* Fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[22px_22px] opacity-80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          
          {/* ======= COLUMNA IZQUIERDA ======= */}
          <div className="max-w-2xl flex flex-col items-start">
            
            {/* BARRA DE BÚSQUEDA (Ubicada arriba de todo en la columna izquierda, ocupando todo el ancho) */}
            <div className="mb-6 w-full">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold tracking-widest text-gray-700 uppercase shadow-sm sm:text-sm">
              <span className="bg-brand-purple h-2 w-2 animate-pulse rounded-full" />
              Tienda gamer
            </div>

            {/* Título */}
            <h1 className="font-orbitron mb-6 text-4xl leading-[1.1] font-black tracking-tight text-gray-800 sm:text-5xl xl:text-6xl text-left">
              Entrá al Juego
              <br />
              con <span className="text-brand-cyan font-orbitron font-black">Enter</span>
              <span className="text-brand-magenta font-orbitron font-black">Game</span>
            </h1>

            {/* Descripción */}
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-700 sm:text-xl text-left">
              <span className="items-center py-2 text-xs font-bold tracking-widest uppercase">Compra - Venta - Canje</span>
              <br />
              Juegos, consolas y accesorios para disfrutar tu Nintendo al máximo.
            </p>

            <p className="mb-9 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base text-left">
              También conseguimos productos de <strong>PlayStation, Xbox y otras consolas </strong>
              por pedido.
            </p>

            {/* CTAs */}
            <div className="mb-10 flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
              <a href="#catalogo" className="bg-brand-magenta font-orbitron rounded-xl px-7 py-4 text-center font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-magenta/80">
                Ver catálogo
              </a>

              <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-cyan font-orbitron rounded-xl px-7 py-4 text-center font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-cyan/80">
                Novedades y Ofertas
              </a>

              <ContactButton nombre="Consultar" className="font-orbitron hover:border-brand-cyan hover:text-brand-cyan rounded-xl border border-gray-300 bg-white px-7 py-4 text-center font-bold text-gray-800 transition-all duration-300 hover:-translate-y-1" />
            </div>

            {/* Características */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-brand-magenta/10 text-brand-magenta flex h-7 w-7 items-center justify-center rounded-full text-sm">✓</span>
                <span className="text-sm font-bold text-gray-700">Especialistas en Nintendo</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-brand-cyan/10 text-brand-cyan flex h-7 w-7 items-center justify-center rounded-full text-sm">✓</span>
                <span className="text-sm font-bold text-gray-700">Productos por pedido</span>
              </div>
            </div>
          </div>

          {/* ======= COLUMNA DERECHA ======= */}
          <div className="flex w-full items-center justify-center lg:justify-end">
            <div className="w-full max-w-135">
              <InstagramCarousel />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;