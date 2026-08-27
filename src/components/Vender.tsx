import React, { useState } from "react";
import ContactModal from "./ContactModal";

const Vender: React.FC = () => {
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const sellSteps = [
    {
      id: 1,
      icon: "📦",
      title: "Unidad o Lote Completo",
      desc: "Compramos desde ese único título que ya no jugás hasta colecciones enteras. No importa la cantidad, evaluamos todo lo que tengas de Nintendo Switch.",
      borderColor: "border-cyan-500",
      glow: "group-hover:shadow-[0_0_30px_rgba(10,185,230,0.3)]"
    },
    {
      id: 2,
      icon: "⚖️",
      title: "Cotización Realista",
      desc: "Tasamos considerando la demanda y valor de cada título. En el caso de lotes grandes, calculamos una oferta global, contemplando que algunos juegos pueden tener menor rotación comercial.",
      borderColor: "border-red-500",
      glow: "group-hover:shadow-[0_0_30px_rgba(255,48,40,0.3)]"
    },
    {
      id: 3,
      icon: "💸",
      title: "Pago en el Acto",
      desc: "Aprobada la oferta, coordinamos la revisión presencial. Comprobamos el estado de los juegos y te pagamos al instante (efectivo o transferencia).",
      borderColor: "border-green-500",
      glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
    }
  ];

  return (
    <>
      <section
        id="vender"
        className="relative w-full py-24 px-4 lg:px-8 bg-gray-900 font-sans overflow-hidden"
      >
        {/* === FONDOS DECORATIVOS DARK === */}
        <div className="absolute top-0 right-0 w-150 h-150 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-red-900/30 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-center z-10">
          
          {/* === ENCABEZADO === */}
          <span className="inline-block w-fit font-bold text-white text-xs sm:text-sm mb-4 tracking-widest bg-gray-800 border border-gray-700 px-5 py-2 rounded-full uppercase shadow-sm">
            💰 Compramos tus juegos
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-center tracking-tight leading-tight">
            Convertí tu colección <br className="hidden sm:block" /> en efectivo
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl text-center mb-16 font-light leading-relaxed">
            Si necesitás vender tus juegos rápido y de forma segura, somos tu mejor opción. Evaluamos tus títulos de manera transparente y te hacemos una oferta concreta.
          </p>

          {/* === GRILLA DE PASOS === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-16">
            {sellSteps.map((step) => (
              <div 
                key={step.id} 
                className={`bg-gray-800/50 backdrop-blur-sm border-t-4 border-x border-b border-gray-700 ${step.borderColor} rounded-2xl p-8 flex flex-col items-start transition-all duration-300 transform hover:-translate-y-2 group ${step.glow}`}
              >
                <div className="text-4xl mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light text-sm sm:text-base">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* === CALL TO ACTION === */}
          <div className="flex justify-center w-full">
            <button
              onClick={() => setContactOpen(true)}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white bg-red-600 rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] cursor-pointer"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center gap-2">
                Quiero vender mis juegos <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </div>

        </div>
      </section>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
};

export default Vender;