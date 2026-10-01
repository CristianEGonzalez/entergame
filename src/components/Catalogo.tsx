import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";
import ProductModal from "./ProductModal";

interface Product {
  id: number;
  title: string;
  src: string;
  price: string;
  status: string; // "Reservado", "Preventa", "Pedido", "Oferta" o vacío
  stock: number; // Se renderizan con stock >= 1 o si son preventa/pedido
  category?: string; // "consola" | "juego-nuevo" | "juego-usado" | "accesorio"
  platform?: string; // "Nintendo Switch", "PlayStation 5", etc.
  description?: string;
}

const Catalogo: React.FC = () => {
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estados para el ProductModal (vista previa del producto)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  // Estado para el filtro de plataforma (por defecto "Todas")
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Todas");

  // URL de API de Google Sheets
  const SHEET_API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  useEffect(() => {
    fetch(SHEET_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API: " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("La API no devolvió una lista válida:", data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el catálogo desde Google Sheets:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  // FILTRADO GENERAL: stock >= 1 O status Preventa/Pedido, y título válido
  const validProducts = products.filter((product) => {
    const stockNum = Number(product.stock) || 0;
    const status = (product.status || "").trim();
    
    const isPreventaOrPedido = status === "Preventa" || status === "Pedido";
    const hasStock = stockNum >= 1;

    return (hasStock || isPreventaOrPedido) && product.title && product.title.trim() !== "";
  });

  // OBTENER PLATAFORMAS ÚNICAS DINÁMICAMENTE DE LOS PRODUCTOS
  const availablePlatforms = Array.from(
    new Set(
      validProducts
        .map((p) => p.platform?.trim())
        .filter((platform): platform is string => Boolean(platform && platform !== ""))
    )
  );

  // APLICAR FILTRO DE PLATAFORMA
  const filteredProducts = validProducts.filter((product) => {
    if (selectedPlatform === "Todas") return true;
    return (product.platform || "").trim().toLowerCase() === selectedPlatform.toLowerCase();
  });

  // SEPARACIÓN POR CATEGORÍAS (Usando los productos ya filtrados por plataforma)
  const consolas = filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "consola");
  const juegosNuevos = filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "juego-nuevo");
  const juegosUsados = filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "juego-usado");
  const accesorios = filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "accesorio");

  const renderProductGrid = (items: Product[]) => {
    if (items.length === 0) return null;

    return (
      <div className="mx-auto mb-16 grid w-full max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
        {items.map((product) => {
          const isReserved = product.status === "Reservado";
          const isOffer = product.status === "Oferta";
          const isPreventaOrPedido = product.status === "Preventa" || product.status === "Pedido";

          return (
            <div 
              key={product.id} 
              className={`flex flex-col bg-white border border-gray-200 transition-all duration-300 ${isReserved ? "cursor-default opacity-75" : "group cursor-pointer hover:border-gray-400 hover:shadow-sm"}`} 
              onClick={() => {
                if (!isReserved) {
                  setSelectedProduct(product);
                  setIsProductModalOpen(true);
                }
              }}
            >
              {/* Imagen */}
              <div className={`relative aspect-4/6 w-full overflow-hidden bg-gray-50 ${isReserved ? "grayscale-30" : ""}`}>
                <img 
                  src={product.src} 
                  alt={product.title} 
                  className={`h-full w-full object-cover transition-transform duration-500 ${isReserved ? "" : "group-hover:scale-105"}`} 
                />

                {/* === FRANJA DIAGONAL DE RESERVADO === */}
                {isReserved && (
                  <div className="absolute top-4 -right-10 z-20 w-36 rotate-45 transform border-y border-amber-500 bg-amber-400 py-1 text-center text-[10px] font-black tracking-widest text-gray-900 uppercase shadow-sm">
                    Reservado
                  </div>
                )}

                {/* === FRANJA DIAGONAL DE OFERTA (Lila/Morado) === */}
                {isOffer && !isReserved && (
                  <div className="absolute top-5 -right-9 z-20 w-40 rotate-45 transform border-y-2 border-purple-800 bg-purple-600 py-1.5 text-center text-[11px] font-black tracking-widest text-white uppercase shadow-md">
                    ⚡ OFERTA
                  </div>
                )}

                {/* === ETIQUETA DE PREVENTA / PEDIDO (Opcional visualmente si querés destacarlo) === */}
                {isPreventaOrPedido && !isReserved && !isOffer && (
                  <div className="absolute top-3 left-3 z-20 rounded-lg bg-blue-600 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">
                    📦 {product.status}
                  </div>
                )}

                {/* Overlay sutil al pasar el mouse */}
                {!isReserved && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
                    <span className="translate-y-2 transform bg-white px-3 py-1 text-xs font-semibold text-gray-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-sm">
                      Ver detalle
                    </span>
                  </div>
                )}
              </div>

              {/* Contenedor de Info compacto y ordenado */}
              <div className="flex flex-col grow justify-between p-3">
                <p className={`font-sans text-xs font-normal line-clamp-2 leading-snug transition-colors mb-2 ${isReserved ? "text-gray-400" : "text-gray-800 group-hover:text-red-600"}`}>
                  {product.title}
                </p>
                
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <span className={`font-sans text-xs sm:text-sm font-semibold tracking-tight ${isReserved ? "text-gray-400" : "text-gray-900"}`}>
                    $ {Number(product.price.toString().replace(/[^0-9]/g, "")).toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <section id="catalogo" className="relative w-full overflow-hidden bg-white px-4 py-24 font-sans lg:px-8">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
          {/* === ENCABEZADO PRINCIPAL === */}
          <span className="mb-4 inline-block w-fit rounded-full border border-red-100 bg-red-50 px-5 py-2 text-xs font-bold tracking-widest text-red-600 uppercase shadow-sm sm:text-sm">
            🔥 Catálogo Oficial
          </span>

          <h2 className="mb-4 text-center text-3xl leading-tight font-black tracking-tight text-gray-900 md:text-5xl">
            Todo para tu Diversión
            <br className="hidden sm:block" /> en un Solo Lugar
          </h2>

          <p className="mb-10 max-w-2xl text-center text-sm md:text-base leading-relaxed font-medium text-gray-600">
            Explorá nuestros juegos nuevos y usados, consolas, y accesorios con stock actualizado en tiempo real.
          </p>

          {/* === BARRA DE FILTROS POR PLATAFORMA === */}
          {!loading && availablePlatforms.length > 0 && (
            <div className="mb-16 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedPlatform("Todas")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                  selectedPlatform === "Todas"
                    ? "bg-gray-900 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                🎮 Todas
              </button>
              {availablePlatforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                    selectedPlatform === platform
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20 scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          )}

          {/* === ESTADO DE CARGA === */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
              <p className="font-medium text-gray-500">Cargando catálogo en tiempo real...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-base font-semibold text-gray-700 mb-2">No se encontraron productos para esta plataforma.</p>
              <button 
                onClick={() => setSelectedPlatform("Todas")}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center">
              {/* === SECCIÓN: JUEGOS NUEVOS === */}
              {juegosNuevos.length > 0 && (
                <div className="mb-16 w-full">
                  <div className="mb-10 text-center">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">🆕 Juegos Nuevos (Sellados)</h3>
                    <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-red-600/60"></div>
                  </div>
                  {renderProductGrid(juegosNuevos)}
                </div>
              )}

              {/* === SECCIÓN: JUEGOS USADOS === */}
              {juegosUsados.length > 0 && (
                <div className="mb-16 w-full">
                  <div className="mb-10 text-center">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">👾 Juegos Usados</h3>
                    <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-red-600/60"></div>
                  </div>
                  {renderProductGrid(juegosUsados)}
                </div>
              )}

              {/* === SECCIÓN: CONSOLAS === */}
              {consolas.length > 0 && (
                <div className="mb-16 w-full">
                  <div className="mb-10 text-center">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                      🎮 Consolas
                    </h3>
                    <p className="mt-1 text-xs md:text-sm font-normal text-gray-400">Precio expresado en dólares</p>
                    <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-red-600/60"></div>
                  </div>
                  {renderProductGrid(consolas)}
                </div>
              )}

              {/* === SECCIÓN: ACCESORIOS === */}
              {accesorios.length > 0 && (
                <div className="mb-16 w-full">
                  <div className="mb-10 text-center">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">🎧 Accesorios</h3>
                    <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-red-600/60"></div>
                  </div>
                  {renderProductGrid(accesorios)}
                </div>
              )}
            </div>
          )}

          {/* === BANNER DE CONSULTA === */}
          <div className="mt-12 flex w-full flex-col items-center justify-between gap-6 rounded-3xl border border-gray-100 bg-gray-50/60 p-8 md:flex-row md:p-10 md:text-left text-center">
            <div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 md:text-2xl">¿No encontrás lo que buscás?</h3>
              <p className="max-w-xl text-sm md:text-base font-normal text-gray-600">Traemos productos a pedido todas las semanas. Escribinos para consultar por lo que quieras que nosotros nos encargamos.</p>
            </div>

            <button onClick={() => setContactOpen(true)} className="shrink-0 transform rounded-xl bg-gray-900 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-black">
              Consultar Stock
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Detalle Rápido del Producto */}
      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onOpenContactWithProduct={(_, __) => {
          setContactOpen(true);
        }}
      />

      {/* Modal de Contacto General */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Catalogo;