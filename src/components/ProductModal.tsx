import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Product {
  id: number;
  title: string;
  src: string;
  price: string;
  status: string;
  description?: string; // Nuevo atributo opcional para la descripción
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onOpenContactWithProduct: (productTitle: string, productPrice: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onOpenContactWithProduct }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);
    } else {
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isVisible || !product) return null;

  const formattedPrice = Number(product.price.toString().replace(/[^0-9]/g, "")).toLocaleString("en-US");

  return createPortal(
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] md:max-h-none bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row transition-all duration-300 transform ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Barra superior estilo Nintendo */}
        <div className="sticky md:absolute top-0 left-0 w-full h-1.5 flex z-20 shrink-0">
          <div className="w-1/2 h-full bg-cyan-400"></div>
          <div className="w-1/2 h-full bg-red-500"></div>
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors text-lg font-bold p-2 z-30 bg-white/80 rounded-full backdrop-blur-xs"
        >
          ✕
        </button>

        {/* === COLUMNA IZQUIERDA: IMAGEN === */}
        <div className={`relative w-full md:w-1/2 h-64 md:h-auto md:aspect-auto flex items-center justify-center bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-100 shrink-0 overflow-hidden ${product.status === "Reservado" ? "grayscale-30" : ""}`}>
          <img 
            src={product.src} 
            alt={product.title} 
            className="h-full w-full object-contain drop-shadow-md" 
          />
          {product.status === "Reservado" && (
            <div className="absolute top-6 -right-10 w-32 rotate-45 bg-amber-400 py-1 text-center text-[10px] font-black tracking-widest text-gray-900 uppercase shadow-sm z-10">
              Reservado
            </div>
          )}
        </div>

        {/* === COLUMNA DERECHA: INFORMACIÓN Y ACCIONES === */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between font-sans mt-2 md:mt-0">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-widest text-red-500 uppercase mb-1.5 block">
              Detalle del Artículo
            </span>
            
            {/* Título limpio */}
            <h4 className="font-sans text-base md:text-lg font-semibold text-gray-900 mb-3 leading-snug">
              {product.title}
            </h4>
            
            {/* Precio destacado */}
            <div className="mb-4">
              <span className="font-sans text-xs text-gray-400 block mb-0.5">Precio</span>
              <span className="font-sans text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                $ {formattedPrice}
              </span>
            </div>

            {/* Descripción condicional (Solo se renderiza si el producto tiene texto en el Google Sheet) */}
            {product.description && product.description.trim() !== "" && (
              <div className="mb-4 bg-gray-50/80 border border-gray-100 rounded-xl p-3">
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <p className="font-sans text-xs text-gray-400 mb-6 leading-relaxed">
              Consultá stock disponible, métodos de pago y opciones de entrega directamente con nosotros por WhatsApp.
            </p>
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenContactWithProduct(product.title, formattedPrice);
              }}
              className="w-full bg-[#25D366] text-white font-sans text-xs md:text-sm font-bold py-3.5 px-6 rounded-xl shadow-md hover:bg-[#1EBE57] transition-all flex justify-center items-center gap-2"
            >
              Consultar por WhatsApp 💬
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-sans font-medium py-2.5 px-6 rounded-xl transition-all text-xs"
            >
              Volver al catálogo
            </button>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;