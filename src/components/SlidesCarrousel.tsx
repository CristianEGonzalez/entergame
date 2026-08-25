import React, { useState, useEffect } from 'react';

interface Slide {
  id: number;
  tag: string;
  title: string;
  desc: string;
  bgSolid: string;
  icon: string;
}

const SlidesCarrousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Arreglo de diapositivas con fondos PLENOS
  const slides: Slide[] = [
    {
      id: 1,
      tag: "COMPRA / VENTA",
      title: "Catálogo Actualizado",
      desc: "Encontrá los últimos lanzamientos y clásicos de Nintendo Switch 1 y 2 al mejor precio del mercado.",
      bgSolid: "bg-red-600",
      icon: "🍄", 
    },
    {
      id: 2,
      tag: "SISTEMA DE CANJE",
      title: "Renová tu Colección",
      desc: "Traé tus juegos físicos usados y usalos como parte de pago para llevarte nuevas aventuras a casa.",
      bgSolid: "bg-blue-600",
      icon: "♻️",
    },
    {
      id: 3,
      tag: "CONFIANZA",
      title: "Juegos Verificados",
      desc: "Todos nuestros títulos físicos son rigurosamente testeados para asegurar su perfecto estado y funcionamiento.",
      bgSolid: "bg-green-500",
      icon: "⭐",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-100 flex items-center justify-center lg:justify-end perspective-1000">
      
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 right-0 w-full max-w-md h-full transition-all duration-700 ease-in-out transform
            ${index === currentSlide 
              ? "opacity-100 translate-x-0 scale-100 z-20" 
              : "opacity-0 translate-x-10 scale-95 z-0 pointer-events-none"
            }
          `}
        >
          {/* Tarjeta del Slide */}
          <div className={`relative h-full ${slide.bgSolid} rounded-4xl p-8 flex flex-col justify-center overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-colors duration-500`}>
            
            {/* Patrón de fondo con puntos (para no dejar un pleno liso) */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none"></div>

            {/* Icono Flotante */}
            <div className="text-6xl mb-6 drop-shadow-md animate-bounce-slow relative z-10">
              {slide.icon}
            </div>

            {/* Etiqueta */}
            <span className="inline-block w-fit mb-4 px-4 py-1.5 rounded-full text-xs font-black bg-white text-gray-900 uppercase tracking-wider relative z-10 shadow-sm">
              {slide.tag}
            </span>

            {/* Título */}
            <h3 className="text-3xl font-black text-white mb-4 leading-tight tracking-tight relative z-10 drop-shadow-sm">
              {slide.title}
            </h3>

            {/* Descripción */}
            <p className="text-white/90 text-base leading-relaxed font-medium relative z-10">
              {slide.desc}
            </p>

          </div>
        </div>
      ))}

        {/* INDICADORES (Puntos de control) */}
        <div className="absolute -bottom-12 lg:-bottom-4 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-0 lg:w-full lg:max-w-md flex justify-center items-center gap-4 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all duration-500 border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.15)]
                ${currentSlide === idx 
                  ? `w-16 h-4 ${slides[idx].bgSolid} scale-110` // Activo: Píldora ancha y colorida
                  : "w-5 h-5 bg-gray-300 hover:bg-gray-400 hover:scale-110" // Inactivo: Círculo grande y clickeable
                }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>

    </div>
  );
};

export default SlidesCarrousel;