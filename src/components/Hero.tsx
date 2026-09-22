import React from "react";
import ContactButton from "./ContactButton";

const Hero: React.FC = () => {
  const WHATSAPP_CHANNEL_URL = import.meta.env.VITE_WHATSAPP_CHANNEL_URL;

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-brand-gray font-sans"
    >
      {/* Fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[22px_22px] opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
          
          {/* ======= COLUMNA IZQUIERDA ======= */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2
                bg-white border border-gray-200
                shadow-sm rounded-full
                px-4 py-2 mb-7
                text-xs sm:text-sm
                font-bold uppercase tracking-widest
                text-gray-700
              "
            >
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              Tienda gamer · Nintendo
            </div>

            {/* Título */}
            <h1
              className="
                font-orbitron font-black
                text-4xl sm:text-5xl xl:text-6xl
                leading-[1.05]
                tracking-tight
                text-gray-950
                mb-7
              "
            >
              Tu próxima
              <br />
              <span className="text-brand-red">aventura</span>{" "}
              <br className="sm:hidden" />
              empieza en
              <br />
              <span className="text-brand-cyan font-orbitron font-black">Enter</span>
              <span className="text-brand-red font-orbitron font-black">Game</span>
            </h1>

            {/* Descripción */}
            <p
              className="
                text-gray-700
                text-lg sm:text-xl
                leading-relaxed
                max-w-xl
                mb-8
              "
            >
              Juegos, consolas y accesorios para disfrutar tu Nintendo al
              máximo.
            </p>

            <p
              className="
                text-gray-500
                text-sm sm:text-base
                leading-relaxed
                max-w-lg
                mb-9
              "
            >
              También conseguimos productos de{" "}
              <strong>PlayStation, Xbox y otras consolas </strong>
              por pedido.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#catalogo"
                className="
                  bg-brand-red
                  text-white
                  font-orbitron font-bold
                  px-7 py-4
                  rounded-xl
                  text-center
                  shadow-lg shadow-red-500/20
                  hover:bg-red-700
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                Ver catálogo
              </a>

              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-brand-cyan
                  text-white
                  font-orbitron font-bold
                  px-7 py-4
                  rounded-xl
                  text-center
                  shadow-lg shadow-cyan-500/20
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                Novedades y Ofertas
              </a>

              <ContactButton
                nombre="Consultar"
                className="
                  bg-white
                  border border-gray-300
                  text-gray-800
                  font-orbitron font-bold
                  px-7 py-4
                  rounded-xl
                  text-center
                  hover:border-brand-cyan
                  hover:text-brand-cyan
                  hover:-translate-y-1
                  transition-all duration-300
                "
              />
            </div>

            {/* Características */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="
                    flex items-center justify-center
                    w-7 h-7
                    rounded-full
                    bg-brand-red/10
                    text-brand-red
                    text-sm
                  "
                >
                  ✓
                </span>

                <span className="text-sm font-bold text-gray-700">
                  Especialistas en Nintendo
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="
                    flex items-center justify-center
                    w-7 h-7
                    rounded-full
                    bg-brand-cyan/10
                    text-brand-cyan
                    text-sm
                  "
                >
                  ✓
                </span>

                <span className="text-sm font-bold text-gray-700">
                  Productos por pedido
                </span>
              </div>
            </div>
          </div>

          {/* ======= COLUMNA DERECHA  ======= */}
          <div className="relative flex justify-center items-center w-full min-h-100 sm:min-h-125 mt-16 lg:mt-0">
            
            {/* Luces LED de fondo (Atmósfera) */}
            <div className="absolute w-62.5 h-62.5 sm:w-87.5 sm:h-87.5 bg-brand-cyan/15 rounded-full blur-[80px] -translate-x-16 -translate-y-10" />
            <div className="absolute w-62.5 h-62.5 sm:w-87.5 sm:h-87.5 bg-brand-red/15 rounded-full blur-[80px] translate-x-16 translate-y-16" />

            {/* Contenedor del Loop */}
            <div className="relative w-full max-w-105 aspect-4/5 sm:aspect-square flex flex-col justify-between py-4">
              
              {/* === TÍTULO DEL LOOP (Centrado y recto) === */}
              <div className="absolute -top-14 sm:-top-16 left-1/2 transform -translate-x-1/2 z-30 bg-white border border-gray-200 shadow-md rounded-full px-6 py-2.5 flex items-center gap-2.5 w-max">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-cyan"></span>
                </span>
                <span className="text-xs sm:text-sm font-black text-gray-800 uppercase tracking-widest">
                  Compra • Venta • Canje
                </span>
              </div>

              {/* === SVG Conectores Neón === */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-0" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="cyanLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="redLine" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  {/* Filtro para el brillo LED */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Línea 1 -> 2 (Baja a la derecha) */}
                <path 
                  d="M 30 15 C 60 15, 75 30, 75 50" 
                  fill="none" 
                  stroke="url(#cyanLine)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                  className="animate-pulse"
                  filter="url(#glow)"
                />
                
                {/* Línea 2 -> 3 (Baja a la izquierda) */}
                <path 
                  d="M 75 50 C 75 70, 60 85, 30 85" 
                  fill="none" 
                  stroke="url(#redLine)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                  className="animate-pulse"
                  filter="url(#glow)"
                  style={{ animationDelay: "1s" }}
                />
              </svg>

              {/* --- PASO 1: Juego Viejo (Arriba Izquierda) --- */}
              <div className="relative z-10 self-start bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-4 sm:p-5 flex items-center gap-4 w-[80%] sm:w-[70%] transform transition-transform duration-300 hover:scale-105 hover:bg-white hover:z-20">
                <div className="w-12 h-12 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-2xl shadow-inner border border-gray-200">
                  👾
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Paso 1</p>
                  <p className="font-orbitron font-bold text-gray-900 leading-tight">Traé tus juegos</p>
                </div>
              </div>

              {/* --- PASO 2: Crédito (Centro Derecha) --- */}
              <div className="relative z-10 self-end bg-gray-900/95 backdrop-blur-lg border border-brand-cyan/40 shadow-[0_0_25px_rgba(6,182,212,0.25)] rounded-2xl p-4 sm:p-5 flex items-center gap-4 w-[80%] sm:w-[70%] transform transition-all duration-300 hover:scale-105 hover:border-brand-cyan hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] hover:z-20">
                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-cyan/20 border border-brand-cyan/50 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  💎
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-brand-cyan uppercase tracking-widest mb-0.5">Paso 2</p>
                  <p className="font-orbitron font-bold text-white leading-tight">Cotizamos en el acto</p>
                </div>
              </div>

              {/* --- PASO 3: Upgrade (Abajo Izquierda) --- */}
              <div className="relative z-10 self-start bg-white/70 backdrop-blur-lg border border-brand-red/30 shadow-[0_0_25px_rgba(220,38,38,0.15)] rounded-2xl p-4 sm:p-5 flex items-center gap-4 w-[80%] sm:w-[70%] transform transition-all duration-300 hover:scale-105 hover:bg-white hover:border-brand-red/50 hover:shadow-[0_0_35px_rgba(220,38,38,0.25)] hover:z-20">
                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-2xl text-brand-red shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                  🚀
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-brand-red uppercase tracking-widest mb-0.5">Paso 3</p>
                  <p className="font-orbitron font-bold text-gray-900 leading-tight">Llevate tu nueva aventura</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
