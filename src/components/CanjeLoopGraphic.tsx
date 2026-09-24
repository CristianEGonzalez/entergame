const CanjeLoopGraphic: React.FC = () => {
  return (
    <div className="relative mt-16 flex min-h-100 w-full items-center justify-center sm:min-h-125 lg:mt-0">
      {/* Luces LED de fondo (Atmósfera) */}
      <div className="bg-brand-cyan/15 absolute h-62.5 w-62.5 -translate-x-16 -translate-y-10 rounded-full blur-[80px] sm:h-87.5 sm:w-87.5" />
      <div className="bg-brand-red/15 absolute h-62.5 w-62.5 translate-x-16 translate-y-16 rounded-full blur-[80px] sm:h-87.5 sm:w-87.5" />

      {/* Contenedor del Loop */}
      <div className="relative flex aspect-4/5 w-full max-w-105 flex-col justify-between py-4 sm:aspect-square">
        {/* === TÍTULO DEL LOOP (Centrado y recto) === */}
        <div className="absolute -top-14 left-1/2 z-30 flex w-max -translate-x-1/2 transform items-center gap-2.5 rounded-full border border-gray-200 bg-white px-6 py-2.5 shadow-md sm:-top-16">
          <span className="relative flex h-2.5 w-2.5">
            <span className="bg-brand-cyan absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-brand-cyan relative inline-flex h-2.5 w-2.5 rounded-full"></span>
          </span>
          <span className="text-xs font-black tracking-widest text-gray-800 uppercase sm:text-sm">Compra • Venta • Canje</span>
        </div>

        {/* === SVG Conectores Neón === */}
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
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
          <path d="M 30 15 C 60 15, 75 30, 75 50" fill="none" stroke="url(#cyanLine)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" filter="url(#glow)" />

          {/* Línea 2 -> 3 (Baja a la izquierda) */}
          <path d="M 75 50 C 75 70, 60 85, 30 85" fill="none" stroke="url(#redLine)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" filter="url(#glow)" style={{ animationDelay: "1s" }} />
        </svg>

        {/* --- PASO 1: Juego Viejo (Arriba Izquierda) --- */}
        <div className="relative z-10 flex w-[80%] transform items-center gap-4 self-start rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-xl backdrop-blur-lg transition-transform duration-300 hover:z-20 hover:scale-105 hover:bg-white sm:w-[70%] sm:p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-2xl shadow-inner">👾</div>
          <div>
            <p className="mb-0.5 text-[10px] font-bold tracking-widest text-gray-400 uppercase sm:text-xs">Paso 1</p>
            <p className="font-orbitron leading-tight font-bold text-gray-900">Traé tus juegos</p>
          </div>
        </div>

        {/* --- PASO 2: Crédito (Centro Derecha) --- */}
        <div className="border-brand-cyan/40 hover:border-brand-cyan relative z-10 flex w-[80%] transform items-center gap-4 self-end rounded-2xl border bg-gray-900/95 p-4 shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-lg transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] sm:w-[70%] sm:p-5">
          <div className="bg-brand-cyan/20 border-brand-cyan/50 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-2xl shadow-[0_0_15px_rgba(6,182,212,0.5)]">💎</div>
          <div>
            <p className="text-brand-cyan mb-0.5 text-[10px] font-bold tracking-widest uppercase sm:text-xs">Paso 2</p>
            <p className="font-orbitron leading-tight font-bold text-white">Cotizamos en el acto</p>
          </div>
        </div>

        {/* --- PASO 3: Upgrade (Abajo Izquierda) --- */}
        <div className="border-brand-red/30 hover:border-brand-red/50 relative z-10 flex w-[80%] transform items-center gap-4 self-start rounded-2xl border bg-white/70 p-4 shadow-[0_0_25px_rgba(220,38,38,0.15)] backdrop-blur-lg transition-all duration-300 hover:z-20 hover:scale-105 hover:bg-white hover:shadow-[0_0_35px_rgba(220,38,38,0.25)] sm:w-[70%] sm:p-5">
          <div className="bg-brand-red/10 border-brand-red/20 text-brand-red flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-2xl shadow-[0_0_15px_rgba(220,38,38,0.2)]">🚀</div>
          <div>
            <p className="text-brand-red mb-0.5 text-[10px] font-bold tracking-widest uppercase sm:text-xs">Paso 3</p>
            <p className="font-orbitron leading-tight font-bold text-gray-900">Llevate tu nueva aventura</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanjeLoopGraphic;
