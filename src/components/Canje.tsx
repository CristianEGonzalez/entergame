import React from "react";
// Si tenés un componente ContactButton global, podés importarlo y usarlo abajo en el CTA.
import ContactButton from "./ContactButton"; 

const Canje: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: "✨",
      title: "Condición Óptima",
      desc: "Recibimos juegos físicos de Nintendo Switch 1 y 2 que se encuentren en excelente estado estético y en perfecto funcionamiento."
    },
    {
      id: 2,
      icon: "📊",
      title: "Tasación Transparente",
      desc: "El valor a favor dependerá exclusivamente del título, su rareza y la demanda actual en el mercado."
    },
    {
      id: 3,
      icon: "🔄",
      title: "Parte de Pago",
      desc: "Utilizá el monto cotizado como saldo a favor para adquirir ese nuevo lanzamiento o el clásico que le falta a tu colección. Una transición segura y rápida."
    }
  ];

  return (
    <section
      id="canje"
      className="relative w-full py-24 px-4 lg:px-8 bg-white font-sans overflow-hidden"
    >
      {/* === FONDOS DECORATIVOS SUTILES === */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-red-100 rounded-full blur-3xl opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-cyan-100 rounded-full blur-3xl opacity-40 pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto flex flex-col items-center z-10">
        
        {/* === ENCABEZADO DE SECCIÓN === */}
        <span className="inline-block w-fit font-bold text-cyan-700 text-xs sm:text-sm mb-4 tracking-widest bg-cyan-50 border border-cyan-100 px-5 py-2 rounded-full uppercase shadow-sm">
          ♻️ Sistema de Intercambio
        </span>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 text-center tracking-tight leading-tight">
          Renová tu colección<br className="hidden sm:block" />
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl text-center mb-16 font-medium leading-relaxed">
          Dale una segunda vida a los títulos que ya completaste. Aceptamos tus juegos físicos como parte de pago para que tu próxima aventura esté más cerca que nunca.
        </p>

        {/* === GRILLA DE PASOS / REQUISITOS === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-gray-50 border border-gray-100 rounded-4xl p-10 flex flex-col items-center text-center hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* === TARJETA CALL TO ACTION === */}
        <div className="w-full max-w-5xl bg-linear-to-r from-gray-900 to-black rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          
          {/* Brillo decorativo dentro de la tarjeta */}
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-red-600 blur-[100px] opacity-20 rounded-full pointer-events-none -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-600 blur-[100px] opacity-10 rounded-full pointer-events-none -translate-y-1/2" />

          <div className="relative z-10 text-center md:text-left mb-10 md:mb-0 md:mr-8 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
              ¿Querés saber cuánto valen tus juegos?
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              Contactanos ahora mismo indicando los títulos que deseás entregar y su estado. Te responderemos a la brevedad con una cotización formal y personalizada.
            </p>
          </div>
          
          <ContactButton nombre="Solicitar Cotización" className="relative z-10 whitespace-nowrap bg-red-600 text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-red-500 shadow-lg hover:shadow-red-600/50 transition-all transform hover:-translate-y-1" />
          
        </div>

      </div>
    </section>
  );
};

export default Canje;