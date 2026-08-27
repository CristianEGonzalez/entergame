import React from "react";

interface LogoProps {
  className?: string;
}

const EnterGameLogo: React.FC<LogoProps> = ({ className = "w-56 md:w-64" }) => {
  return (
    <svg
      // Ampliamos el ancho de 350 a 420 para que entre todo el texto
      viewBox="0 0 420 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* --- ÍCONO TIPO JOY-CON --- */}
      <g transform="translate(0, 15)">
        {/* Joy-Con Izquierdo (Cian) */}
        <path
          d="M20 0 C8 0 0 10 0 25 C0 40 8 50 20 50 L32 50 L32 0 Z"
          fill="#0AB9E6"
        />
        {/* Joystick y botones izquierdos */}
        <circle cx="16" cy="15" r="5" fill="#ffffff" />
        <circle cx="16" cy="28" r="2" fill="#ffffff" />
        <circle cx="12" cy="32" r="2" fill="#ffffff" />
        <circle cx="20" cy="32" r="2" fill="#ffffff" />
        <circle cx="16" cy="36" r="2" fill="#ffffff" />

        {/* Joy-Con Derecho (Rojo) */}
        <path
          d="M36 0 L36 50 L48 50 C60 50 68 40 68 25 C68 10 60 0 48 0 Z"
          fill="#FF3028"
        />
        {/* Joystick y botones derechos */}
        <circle cx="52" cy="14" r="2" fill="#ffffff" />
        <circle cx="48" cy="18" r="2" fill="#ffffff" />
        <circle cx="56" cy="18" r="2" fill="#ffffff" />
        <circle cx="52" cy="22" r="2" fill="#ffffff" />
        <circle cx="52" cy="35" r="5" fill="#ffffff" />
      </g>

      {/* --- TEXTO DEL LOGO --- */}
      <text
        x="85"
        y="52"
        fontFamily="Orbitron, sans-serif"
        fontWeight="900"
        fontSize="46"
        letterSpacing="-1"
      >
        <tspan fill="#0AB9E6">Enter</tspan>
        <tspan fill="#FF3028">Game</tspan>
      </text>
    </svg>
  );
};

export default EnterGameLogo;