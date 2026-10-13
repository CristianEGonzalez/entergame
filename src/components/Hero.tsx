import React from "react";
import ContactButton from "./ContactButton";
import InstagramCarousel from "./InstagramCarousel";
import SynthWave from "./SynthWave";

const Hero: React.FC = () => {
  const WHATSAPP_CHANNEL_URL = import.meta.env.VITE_WHATSAPP_CHANNEL_URL;

  return (
    <section id="inicio" className="relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden bg-[#0b0c16] font-sans pb-12">

      {/* ======= FONDO SYNTHWAVE LIVIANO ======= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#201229]">
        {/* Luces estáticas de fondo */}
        <div className="bg-brand-purple/40 absolute top-1/4 left-1/4 h-100 w-100 rounded-full blur-[100px]" />
        {/* Patrón sutil estático */}
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* ======= COLUMNA IZQUIERDA ======= */}
          <div className="flex max-w-2xl flex-col items-start">

            {/* Badge */}
            <div className="border-brand-cyan/30 text-brand-cyan mb-4 inline-flex items-center gap-2 rounded-full border bg-black/40 px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase shadow-sm backdrop-blur-md sm:text-sm">
              <span className="bg-brand-magenta h-2 w-2 animate-pulse rounded-full" />
              Tienda gamer
            </div>

            {/* Título */}
            <h1 className="font-orbitron mb-4 text-left text-3xl leading-[1.1] font-black tracking-tight text-white sm:text-4xl xl:text-5xl">
              Entrá al Juego
              <br />
              con <span className="text-brand-cyan font-orbitron font-black drop-shadow-[0_0_15px_rgba(46,188,252,0.4)]">Enter</span>
              <span className="text-brand-magenta font-orbitron font-black drop-shadow-[0_0_15px_rgba(249,6,242,0.4)]">Game</span>
            </h1>

            {/* Descripción */}
            <p className="mb-4 max-w-xl text-left text-base leading-relaxed text-gray-300 sm:text-lg">
              <span className="text-brand-cyan items-center py-1 text-xs font-bold tracking-widest uppercase">Compra - Venta - Canje</span>
              <br />
              Juegos, consolas y accesorios para disfrutar tu Nintendo al máximo.
            </p>

            <p className="mb-6 max-w-lg text-left text-xs leading-relaxed text-gray-400 sm:text-sm">
              También conseguimos productos de <strong className="text-white">PlayStation, Xbox y otras consolas </strong>
              por pedido.
            </p>

            {/* CTAs */}
            <div className="mb-6 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <a href="#catalogo" className="bg-brand-magenta font-orbitron hover:bg-brand-magenta/80 rounded-xl px-6 py-3 text-center text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(249,6,242,0.4)] transition-all duration-300 hover:-translate-y-1">
                Ver catálogo
              </a>

              <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-cyan font-orbitron hover:bg-brand-cyan/80 rounded-xl px-6 py-3 text-center text-xs sm:text-sm font-bold text-gray-950 shadow-[0_0_20px_rgba(46,188,252,0.4)] transition-all duration-300 hover:-translate-y-1">
                Novedades y Ofertas
              </a>

              <ContactButton nombre="Consultar" className="font-orbitron hover:border-brand-cyan hover:text-brand-cyan rounded-xl border border-white/20 bg-black/30 px-6 py-3 text-center text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1" />
            </div>

            {/* Características */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-brand-magenta/20 text-brand-magenta flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">✓</span>
                <span className="text-xs sm:text-sm font-bold text-gray-300">Especialistas en Nintendo</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-brand-cyan/20 text-brand-cyan flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">✓</span>
                <span className="text-xs sm:text-sm font-bold text-gray-300">Productos por pedido</span>
              </div>
            </div>
          </div>

          {/* ======= COLUMNA DERECHA ======= */}
          <div className="flex w-full items-center justify-center lg:justify-end">
            <div className="w-full max-w-115">
              <InstagramCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* ======= ONDA DE SEPARACIÓN SYNTHWAVE ======= */}
      <SynthWave />
    </section>
  );
};

export default Hero;