import React from "react";

const Venta: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: "🛡️",
      title: "Calidad Garantizada",
      desc: "Cada título pasa por un estricto control de calidad. Garantizamos que tanto el cartucho como su caja original se encuentran en perfecto estado estético y operativo.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      id: 2,
      icon: "🤝",
      title: "Entregas Flexibles",
      desc: "Retirá tu compra personalmente en nuestra zona o coordinemos en puntos de encuentro seguros y estratégicos. Nos adaptamos para que tengas tu juego lo antes posible.",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100"
    },
    {
      id: 3,
      icon: "💳",
      title: "Medios de Pago",
      desc: "Buscamos que tu proceso de compra sea ágil y sin vueltas. Aceptamos efectivo, transferencias bancarias y las principales billeteras virtuales del mercado.",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100"
    },
    {
      id: 4,
      icon: "💬",
      title: "Asesoramiento Gamer",
      desc: "¿No estás seguro de qué jugar después del Zelda? Te asesoramos en base a tus gustos y presupuesto para que te lleves la aventura perfecta para vos.",
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100"
    }
  ];

  return (
    <section
      id="venta"
      className="relative w-full py-24 px-4 lg:px-8 bg-gray-50 font-sans overflow-hidden"
    >
      {/* Patrón de fondo sutil para darle textura */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-size-[24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-center">
        
        {/* === ENCABEZADO === */}
        <span className="inline-block w-fit font-bold text-red-600 text-xs sm:text-sm mb-4 tracking-widest bg-red-50 border border-red-100 px-5 py-2 rounded-full uppercase shadow-sm">
          🛍️ Proceso de Compra
        </span>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 text-center tracking-tight leading-tight">
          Seguridad y confianza <br className="hidden sm:block" /> en cada juego
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl text-center mb-16 font-medium leading-relaxed">
          Comprar en EnterGame es rápido y seguro. Nos aseguramos de que tengas la mejor experiencia desde que elegís el título hasta que lo ponés en tu consola.
        </p>

        {/* === GRILLA DE CARACTERÍSTICAS (2x2 en Desktop) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full max-w-5xl mb-16">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start gap-6 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Contenedor del Icono */}
              <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${feature.bg} ${feature.border} border shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* Textos */}
              <div>
                <h3 className={`text-2xl font-black mb-3 tracking-tight ${feature.color}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* === BOTONES DE ACCIÓN === */}
        <div className="flex flex-col sm:flex-row gap-5">
          <a
            href="#catalogo"
            className="bg-red-600 text-white font-bold text-lg py-4 px-10 rounded-full text-center shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:bg-red-700 hover:shadow-[0_12px_25px_rgba(220,38,38,0.4)] transition-all transform hover:-translate-y-1"
          >
            Ver Catálogo de Juegos
          </a>
          <a
            href="https://wa.me/5491169603403?text=Hola%2C+quiero+coordinar+una+compra+de+juegos" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-gray-200 text-gray-800 font-bold text-lg py-4 px-10 rounded-full text-center hover:border-gray-300 hover:bg-gray-50 shadow-sm transition-all transform hover:-translate-y-1"
          >
            Coordinar una Compra
          </a>
        </div>

      </div>
    </section>
  );
};

export default Venta;