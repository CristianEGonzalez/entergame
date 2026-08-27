import React, { useState } from "react";

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Aceptan juegos de otras consolas?",
      answer: "Por el momento, nos especializamos exclusivamente en la compra, venta y canje de juegos físicos para Nintendo Switch (1 y 2). Esto nos permite garantizar el mejor conocimiento y tasación del mercado para esta consola."
    },
    {
      question: "¿Cómo funciona la entrega y el pago?",
      answer: "Coordinamos de manera personalizada. Podés retirar por nuestra zona o acordamos un punto de encuentro seguro. Al momento de encontrarnos, revisamos el estado de los juegos y realizamos el pago o cobro en efectivo o transferencia en el acto."
    },
    {
      question: "¿Cómo me aseguro de que el juego usado funciona bien?",
      answer: "Todos nuestros títulos pasan por un riguroso testeo antes de publicarse. Para tu total tranquilidad, al momento de la entrega probamos el juego juntos en la consola demostrando su perfecto funcionamiento. Al ser productos usados y verificados en el acto, las ventas son definitivas y no realizamos cambios posteriores."
    },
    {
      question: "¿Puedo vender un lote completo si algunos juegos no son tan populares?",
      answer: "Sí, compramos lotes completos. Al tasarlos, hacemos un promedio considerando los títulos de alta demanda y los de menor rotación comercial, ofreciéndote un valor global justo por toda tu colección."
    },
    {
      question: "¿Traen juegos a pedido?",
      answer: "Nuestro catálogo se actualiza constantemente con nuevos ingresos. Si buscás una joya específica que no tenemos en stock en este momento, escribinos y te avisamos apenas ingrese."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full py-24 px-4 lg:px-8 bg-gray-50 font-sans overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
        
        {/* === ENCABEZADO === */}
        <span className="inline-block w-fit font-bold text-cyan-700 text-xs sm:text-sm mb-4 tracking-widest bg-cyan-50 border border-cyan-100 px-5 py-2 rounded-full uppercase shadow-sm">
          🤔 Dudas Comunes
        </span>
        
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 text-center tracking-tight leading-tight">
          Preguntas Frecuentes
        </h2>
        
        <p className="text-lg text-gray-600 text-center mb-12 font-medium leading-relaxed max-w-2xl">
          Todo lo que necesitás saber sobre cómo operamos. Si tenés alguna otra consulta, no dudes en escribirnos directamente.
        </p>

        {/* === ACORDEÓN DE PREGUNTAS === */}
        <div className="w-full space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isActive ? "bg-white border-red-200 shadow-md" : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isActive}
                >
                  <h3 className={`text-lg sm:text-xl font-bold pr-4 transition-colors ${
                    isActive ? "text-red-600" : "text-gray-800"
                  }`}>
                    {faq.question}
                  </h3>
                  
                  {/* Icono + / - */}
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {isActive ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                  </div>
                </button>
                
                {/* Respuesta Desplegable */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Faq;