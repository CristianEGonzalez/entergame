import React from "react";
import ContactButton from "./ContactButton";
import InstagramCarousel from "./InstagramCarousel";
import SearchBar from "./SearchBar";

interface HeroProps {
  onSearchSubmit: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchSubmit }) => {
  const WHATSAPP_CHANNEL_URL = import.meta.env.VITE_WHATSAPP_CHANNEL_URL;

  const handleSearch = (searchTerm: string) => {
    onSearchSubmit(searchTerm);
    const catalogoElement = document.getElementById("catalogo");
    if (catalogoElement) {
      catalogoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative flex min-h-[90vh] w-full items-center overflow-hidden bg-[#0b0c16] font-sans">

      {/* ======= FONDO SYNTHWAVE LIVIANO ======= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#201229]">
        {/* Luces estáticas de fondo (sin blur pesados en animación) */}
        <div className="bg-brand-purple/40 absolute top-1/4 left-1/4 h-100 w-100 rounded-full blur-[100px]" />
        {/* Patrón sutil estático o con animación CSS */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(46, 188, 252, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(249, 6, 242, 0.4) 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ======= COLUMNA IZQUIERDA ======= */}
          <div className="flex max-w-2xl flex-col items-start">
            {/* BARRA DE BÚSQUEDA */}
            <div className="mb-6 w-full">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Badge */}
            <div className="border-brand-cyan/30 text-brand-cyan mb-7 inline-flex items-center gap-2 rounded-full border bg-black/40 px-4 py-2 text-xs font-bold tracking-widest uppercase shadow-sm backdrop-blur-md sm:text-sm">
              <span className="bg-brand-magenta h-2 w-2 animate-pulse rounded-full" />
              Tienda gamer
            </div>

            {/* Título */}
            <h1 className="font-orbitron mb-6 text-left text-4xl leading-[1.1] font-black tracking-tight text-white sm:text-5xl xl:text-6xl">
              Entrá al Juego
              <br />
              con <span className="text-brand-cyan font-orbitron font-black drop-shadow-[0_0_15px_rgba(46,188,252,0.4)]">Enter</span>
              <span className="text-brand-magenta font-orbitron font-black drop-shadow-[0_0_15px_rgba(249,6,242,0.4)]">Game</span>
            </h1>

            {/* Descripción */}
            <p className="mb-8 max-w-xl text-left text-lg leading-relaxed text-gray-300 sm:text-xl">
              <span className="text-brand-cyan items-center py-2 text-xs font-bold tracking-widest uppercase">Compra - Venta - Canje</span>
              <br />
              Juegos, consolas y accesorios para disfrutar tu Nintendo al máximo.
            </p>

            <p className="mb-9 max-w-lg text-left text-sm leading-relaxed text-gray-400 sm:text-base">
              También conseguimos productos de <strong className="text-white">PlayStation, Xbox y otras consolas </strong>
              por pedido.
            </p>

            {/* CTAs */}
            <div className="mb-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href="#catalogo" className="bg-brand-magenta font-orbitron hover:bg-brand-magenta/80 rounded-xl px-7 py-4 text-center font-bold text-white shadow-[0_0_20px_rgba(249,6,242,0.4)] transition-all duration-300 hover:-translate-y-1">
                Ver catálogo
              </a>

              <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-cyan font-orbitron hover:bg-brand-cyan/80 rounded-xl px-7 py-4 text-center font-bold text-gray-950 shadow-[0_0_20px_rgba(46,188,252,0.4)] transition-all duration-300 hover:-translate-y-1">
                Novedades y Ofertas
              </a>

              <ContactButton nombre="Consultar" className="font-orbitron hover:border-brand-cyan hover:text-brand-cyan rounded-xl border border-white/20 bg-black/30 px-7 py-4 text-center font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1" />
            </div>

            {/* Características */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-brand-magenta/20 text-brand-magenta flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold">✓</span>
                <span className="text-sm font-bold text-gray-300">Especialistas en Nintendo</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-brand-cyan/20 text-brand-cyan flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold">✓</span>
                <span className="text-sm font-bold text-gray-300">Productos por pedido</span>
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
