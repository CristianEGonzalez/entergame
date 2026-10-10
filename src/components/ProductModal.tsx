import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Product {
  id: number;
  title: string;
  src: string;
  price: string;
  status: string;
  description?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
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

  // === FUNCIÓN PARA REDIRIGIR WHATSAPP ===
  const handleWhatsAppClick = () => {
    const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

    const message = `¡Hola! Me interesa este producto y quiero consultar disponibilidad:\n*${product.title}*`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    onClose();
    window.open(whatsappUrl, "_blank");
  };

  return createPortal(
    <div className={`fixed inset-0 z-9999 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <div className={`relative flex max-h-[90vh] w-full max-w-2xl transform flex-col overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 md:max-h-none md:flex-row md:overflow-hidden ${isOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"}`}>
        {/* Barra decorativa superior */}
        <div className="sticky top-0 left-0 z-20 flex h-1.5 w-full shrink-0 md:absolute">
          <div className="bg-brand-magenta h-full w-1/2"></div>
          <div className="bg-brand-cyan h-full w-1/2"></div>
        </div>

        {/* Botón de cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 z-30 rounded-full bg-white/80 p-2 text-lg font-bold text-gray-400 backdrop-blur-xs transition-colors hover:text-gray-700">
          ✕
        </button>

        {/* === COLUMNA IZQUIERDA: IMAGEN === */}
        <div className={`relative flex h-64 w-full shrink-0 items-center justify-center overflow-hidden border-b border-gray-100 bg-gray-50 p-6 md:aspect-auto md:h-auto md:w-1/2 md:border-r md:border-b-0 ${product.status === "Reservado" ? "grayscale-30" : ""}`}>
          <img src={product.src} alt={product.title} className="h-full w-full object-contain drop-shadow-md" />
          {product.status === "Reservado" && <div className="absolute top-6 -right-10 z-10 w-32 rotate-45 bg-amber-400 py-1 text-center text-[10px] font-black tracking-widest text-gray-900 uppercase shadow-sm">Reservado</div>}
        </div>

        {/* === COLUMNA DERECHA: INFORMACIÓN Y ACCIONES === */}
        <div className="mt-2 flex w-full flex-col justify-between p-6 font-sans md:mt-0 md:w-1/2 md:p-8">
          <div>
            <span className="mb-1.5 block font-sans text-[10px] font-bold tracking-widest text-red-500 uppercase">Detalle del Artículo</span>

            {/* Título limpio */}
            <h4 className="mb-3 font-sans text-base leading-snug font-semibold text-gray-900 md:text-lg">{product.title}</h4>

            {/* Precio destacado */}
            <div className="mb-4">
              <span className="mb-0.5 block font-sans text-xs text-gray-400">Precio</span>
              <span className="font-sans text-xl font-bold tracking-tight text-gray-900 md:text-2xl">$ {formattedPrice}</span>
            </div>

            {/* Descripción condicional */}
            {product.description && product.description.trim() !== "" && (
              <div className="mb-4 rounded-xl border border-gray-100 bg-gray-50/80 p-3">
                <p className="font-sans text-xs leading-relaxed text-gray-600">{product.description}</p>
              </div>
            )}

            <p className="mb-6 font-sans text-xs leading-relaxed text-gray-400">Consultá stock disponible, métodos de pago y opciones de entrega directamente con nosotros por WhatsApp.</p>
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <button onClick={handleWhatsAppClick} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-sans text-xs font-bold text-white shadow-md transition-all hover:bg-[#1EBE57] md:text-sm">
              Consultar por WhatsApp 💬
            </button>

            <button onClick={onClose} className="w-full cursor-pointer rounded-xl bg-gray-100 px-6 py-2.5 font-sans text-xs font-medium text-gray-600 transition-all hover:bg-gray-200">
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProductModal;
