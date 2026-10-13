import React from "react";

const SynthWave: React.FC = () => {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 w-full overflow-hidden leading-none">
      <style>{`
        @keyframes wave-flow-1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave-flow-2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-wave-1 {
          animation: wave-flow-1 6s linear infinite;
        }
        .animate-wave-2 {
          animation: wave-flow-2 9s linear infinite;
        }
      `}</style>
      
      <svg
        className="relative block w-full h-16 sm:h-24 md:h-32"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Degradado Neón con alta vibrantes */}
          <linearGradient id="synthwave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F906F2" />
            <stop offset="30%" stopColor="#2EBCFC" />
            <stop offset="70%" stopColor="#F906F2" />
            <stop offset="100%" stopColor="#2EBCFC" />
          </linearGradient>
        </defs>

        {/* Onda Adicional Secundaria (Se mueve en sentido contrario y a otra velocidad) */}
        <g className="animate-wave-2 opacity-50">
          <path
            d="M0,60 C300,20 600,100 1200,60 C1800,20 2100,100 2400,60 C2700,20 3000,100 3600,60 C4200,20 4500,100 4800,60"
            fill="none"
            stroke="url(#synthwave-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Onda Principal (Flujo principal sin cortes ni desbordes) */}
        <g className="animate-wave-1">
          <path
            d="M0,60 C400,10 800,110 1200,60 C1600,10 2000,110 2400,60 C2800,10 3200,110 3600,60 C4000,10 4400,110 4800,60"
            fill="none"
            stroke="url(#synthwave-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default SynthWave;