import React from "react";

interface Product {
  id: number;
  title: string;
  src: string;
  price: string;
  status: string;
  stock: number;
  category?: string;
  platform?: string;
  description?: string;
  offert?: string | number;       // Porcentaje de descuento
  discountPrice?: string | number; // Precio final con descuento de la planilla
}

interface ProductGridProps {
  items: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ items, onSelectProduct }) => {
  if (items.length === 0) return null;

  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
      {items.map((product) => {
        const isReserved = product.status === "Reservado";
        const isPreventa = product.status === "Preventa";
        const isPedido = product.status === "Pedido";

        // Detectar si hay oferta asegurando compatibilidad con variantes de mayúsculas
        const discountValue = product.offert || (product as any).Offert || (product as any).OFFERT;
        const hasOffert = discountValue !== undefined && discountValue !== null && discountValue !== "";

        // Limpiar y obtener el valor numérico del precio original
        const rawPriceNumber = Number(product.price.toString().replace(/[^0-9]/g, "")) || 0;
        
        // Buscar discountPrice en cualquiera de sus posibles variantes que devuelva el script
        const rawDiscountPrice = 
          product.discountPrice ?? 
          (product as any).discountprice ?? 
          (product as any).DiscountPrice ?? 
          (product as any).DISCOUNTPRICE;

        let finalPriceNumber = rawPriceNumber;

        if (rawDiscountPrice !== undefined && rawDiscountPrice !== null && rawDiscountPrice !== "") {
          const parsed = Number(rawDiscountPrice.toString().replace(/[^0-9]/g, ""));
          if (!isNaN(parsed) && parsed > 0) {
            finalPriceNumber = parsed;
          }
        } else if (hasOffert) {
          // RESPALDO DE SEGURIDAD: Si la planilla aún no manda discountPrice, lo calculamos acá mismo con MROUND a 100
          const numericOffert = typeof discountValue === "number" 
            ? discountValue 
            : parseFloat(discountValue.toString().replace("%", "").trim());
            
          if (!isNaN(numericOffert)) {
            const calculated = rawPriceNumber * (1 - numericOffert / 100);
            finalPriceNumber = Math.round(calculated / 100) * 100; // Equivalente a MROUND en 100
          }
        }

        const finalPriceFormatted = finalPriceNumber.toLocaleString("en-US");

        return (
          <div 
            key={product.id} 
            className={`flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden transition-all duration-300 ${isReserved ? "cursor-default opacity-75" : "group cursor-pointer hover:border-gray-400 hover:shadow-md"}`} 
            onClick={() => {
              if (!isReserved) {
                onSelectProduct(product);
              }
            }}
          >
            <div className={`relative aspect-4/6 w-full overflow-hidden bg-gray-50 ${isReserved ? "grayscale-30" : ""}`}>
              <img 
                src={product.src} 
                alt={product.title} 
                className={`h-full w-full object-cover transition-transform duration-500 ${isReserved ? "" : "group-hover:scale-105"}`} 
              />
              {isReserved && (
                <div className="absolute top-4 -right-10 z-20 w-36 rotate-45 transform border-y border-amber-500 bg-amber-400 py-1 text-center text-[10px] font-black text-gray-900 uppercase shadow-sm">
                  Reservado
                </div>
              )}
              
              {/* Cinta diagonal superior derecha para Oferta (Morada) */}
              {hasOffert && !isReserved && (
                <div className="absolute top-5 -right-9 z-20 w-40 rotate-45 transform border-y-2 border-purple-800 bg-purple-600 py-1.5 text-center text-[11px] font-black text-white uppercase shadow-md flex items-center justify-center gap-1">
                  <span>⚡</span>
                  <span>{discountValue}% OFF</span>
                </div>
              )}

              {/* Listón inferior para Preventa (Verde) o Pedido (Azul) */}
              {(isPreventa || isPedido) && !isReserved && (
                <div className={`absolute bottom-0 inset-x-0 z-20 py-1 text-center text-[10px] font-black uppercase tracking-wider text-white shadow-md ${isPreventa ? "bg-emerald-600" : "bg-blue-600"}`}>
                  {isPreventa ? "🌿 Preventa" : "📦 A Pedido"}
                </div>
              )}

              {!isReserved && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
                  <span className="translate-y-2 transform bg-white px-3 py-1 text-xs font-semibold text-gray-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-sm rounded-full">
                    Ver detalle
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col grow justify-between p-3.5">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  {product.platform || "General"}
                </span>
                <p className={`font-sans text-xs font-normal line-clamp-2 leading-snug transition-colors mb-2 ${isReserved ? "text-gray-400" : "text-gray-800 group-hover:text-red-600"}`}>
                  {product.title}
                </p>
              </div>
              <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
                
                {/* Precio final limpio y calculado */}
                <span className={`font-sans text-xs sm:text-sm font-semibold tracking-tight ${isReserved ? "text-gray-400" : "text-gray-900"}`}>
                  $ {finalPriceFormatted}
                </span>

                {hasOffert && (
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                    {discountValue}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;