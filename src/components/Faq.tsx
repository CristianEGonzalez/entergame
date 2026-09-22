import React, { useState } from "react";

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

const faqs = [
    {
      question: "¿Trabajan con productos nuevos y usados?",
      answer: "¡Sí, ambos! Tenemos juegos físicos usados (testeados y garantizados), además de juegos sellados, consolas y accesorios 100% nuevos. Los productos nuevos cuentan con 6 meses de garantía de tienda."
    },
    {
      question: "¿Cómo funciona el canje y la compra de juegos?",
      answer: "Tomamos tus juegos físicos usados como parte de pago (canje) para llevarte otros títulos, consolas o accesorios, o bien te compramos lotes enteros de juegos. Cotizamos todo en el acto por WhatsApp. *(Nota: no compramos consolas usadas excepto casos muy excepcionales con una inspección exahustiva previa*."
    },
    {
      question: "¿Hacen envíos, cómo se paga y se retira?",
      answer: "Hacemos envíos seguros a todo el país para juegos y accesorios. Para consolas recomendamos retiro presencial o si preferís envío a través de mensajería privada abonando el seguro correspondiente, coordinamos punto de encuentro o retiro por nuestra zona. Podés abonar en efectivo, transferencia o billeteras virtuales."
    },
    {
      question: "¿Venden productos de PlayStation o Xbox?",
      answer: "Nuestro stock principal es de Nintendo, pero conseguimos consolas, juegos y accesorios de PlayStation, Xbox y más plataformas a pedido. ¡Escribinos y te lo cotizamos!"
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