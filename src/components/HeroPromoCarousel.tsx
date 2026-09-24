import React, { useState, useEffect, useRef } from "react";

interface PromoSlide {
  id: number;
  tag: string;
  title: string;
  description: string;
  highlight: string;
  badgeColor: string;
  buttonText: string;
  buttonUrl: string;
}

const slides: PromoSlide[] = [
  {
    id: 1,
    tag: "Preventa Exclusiva",
    title: "SORTEO Zelda: Ocarina of Time",
    description: "¡Cada 30 participantes hay un ganador, y vos podés ser uno de ellos!",
    highlight: "¡Preventa y Sorteo habilitados!",
    badgeColor: "bg-brand-red text-white",
    buttonText: "Participar / Reservar",
    buttonUrl: "https://wa.me/5491134567890?text=Hola%2C+quiero+participar+en+el+sorteo+de+Zelda%3A+Ocarina+of+Time",
  },
  {
    id: 2,
    tag: "Nueva Generación",
    title: "Nintendo Switch 2 The Legend of Zelda 40th Anniversary Edition",
    description: "Preventa exclusiva: Edición especial de la consola Nintendo Switch con temática de Zelda, celebrando 40 años de aventuras.",
    highlight: "Stock disponible en tienda",
    badgeColor: "bg-brand-cyan text-white",
    buttonText: "Ver Consola",
    buttonUrl: "https://www.instagram.com/p/DdsB6f1FZra/",
  },
];

const HeroPromoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Referencias para manejar el gesto de deslizamiento (Swipe en mobile)
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Auto-play del carrusel cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Funciones táctiles para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Mínimo de píxeles para considerar un swipe

    if (distance > minSwipeDistance) {
      // Deslizó hacia la izquierda -> Siguiente
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Deslizó hacia la derecha -> Anterior
      handlePrev();
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative mt-16 flex min-h-100 w-full items-center justify-center lg:mt-0">
      {/* Luces LED de fondo (Atmósfera) */}
      <div className="bg-brand-cyan/15 absolute h-62.5 w-62.5 -translate-x-16 -translate-y-10 rounded-full blur-[80px] sm:h-87.5 sm:w-87.5" />
      <div className="bg-brand-red/15 absolute h-62.5 w-62.5 translate-x-16 translate-y-16 rounded-full blur-[80px] sm:h-87.5 sm:w-87.5" />

      {/* Botón Izquierda (Fuera del cuadro en Desktop) */}
      <button
        onClick={handlePrev}
        className="absolute -left-4 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all duration-300 hover:scale-110 hover:bg-gray-50 lg:flex"
        aria-label="Promoción anterior"
      >
        ‹
      </button>

      {/* Contenedor Principal del Banner con soporte táctil */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-lg rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:p-10 select-none"
      >
        {/* Badge superior */}
        <div className="mb-6 flex items-center justify-between">
          <span className={`rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase shadow-sm ${currentSlide.badgeColor}`}>
            {currentSlide.tag}
          </span>
          <span className="text-xs font-bold text-gray-400">
            0{currentIndex + 1} / 0{slides.length}
          </span>
        </div>

        {/* Contenido dinámico */}
        <div className="min-h-37.5">
          <h3 className="font-orbitron mb-3 text-2xl font-black text-gray-900 sm:text-3xl">
            {currentSlide.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            {currentSlide.description}
          </p>
          <div className="text-brand-cyan text-sm font-bold tracking-wide">
            {currentSlide.highlight}
          </div>
        </div>

        {/* Acciones, Controles y Flechas mobile integradas */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
          <a
            href={currentSlide.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-orbitron bg-gray-900 text-white rounded-xl px-5 py-3 text-xs font-bold tracking-wider uppercase shadow-md transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
          >
            {currentSlide.buttonText}
          </a>

          {/* Flechas para mobile / Indicadores de puntos */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-8 bg-brand-cyan" : "w-2.5 bg-gray-300"
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botón Derecha (Fuera del cuadro en Desktop) */}
      <button
        onClick={handleNext}
        className="absolute -right-4 z-20 hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all duration-300 hover:scale-110 hover:bg-gray-50 lg:flex"
        aria-label="Siguiente promoción"
      >
        ›
      </button>
    </div>
  );
};

export default HeroPromoCarousel;