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

  // Estados para los filtros avanzados
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Todas");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas"); // "todas" | "consola" | "juego-nuevo" | "juego-usado" | "accesorio"

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

  // OBTENER PLATAFORMAS ÚNICAS DINÁMICAMENTE
  const availablePlatforms = Array.from(
    new Set(
      validProducts
        .map((p) => p.platform?.trim())
        .filter((platform): platform is string => Boolean(platform && platform !== ""))
    )
  );

  // APLICAR FILTROS COMBINADOS (Plataforma + Categoría)
  const filteredProducts = validProducts.filter((product) => {
    const matchesPlatform = 
      selectedPlatform === "Todas" || 
      (product.platform || "").trim().toLowerCase() === selectedPlatform.toLowerCase();

    const productCat = (product.category || "").trim().toLowerCase();
    const matchesCategory = 
      selectedCategory === "todas" || 
      productCat === selectedCategory.toLowerCase();

    return matchesPlatform && matchesCategory;
  });

  // SEPARACIÓN POR CATEGORÍAS PARA MOSTRAR EN SECCIONES SI ELIJE "TODAS"
  const consolas = filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "consola");
  const juegosNuevos = filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "juego-nuevo");
  const juegosUsados = filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "juego-usado");
  const accesorios = filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "accesorio");

  const renderProductGrid = (items: Product[]) => {
    if (items.length === 0) return null;

    return (
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
        {items.map((product) => {
          const isReserved = product.status === "Reservado";
          const isOffer = product.status === "Oferta";
          const isPreventaOrPedido = product.status === "Preventa" || product.status === "Pedido";

          return (
            <div 
              key={product.id} 
              className={`flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${isReserved ? "cursor-default opacity-75" : "group cursor-pointer hover:border-gray-400 hover:shadow-md"}`} 
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

                {/* === FRANJA DIAGONAL DE OFERTA === */}
                {isOffer && !isReserved && (
                  <div className="absolute top-5 -right-9 z-20 w-40 rotate-45 transform border-y-2 border-purple-800 bg-purple-600 py-1.5 text-center text-[11px] font-black tracking-widest text-white uppercase shadow-md">
                    ⚡ OFERTA
                  </div>
                )}

                {/* === ETIQUETA DE PREVENTA / PEDIDO === */}
                {isPreventaOrPedido && !isReserved && !isOffer && (
                  <div className="absolute top-3 left-3 z-20 rounded-lg bg-blue-600 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">
                    📦 {product.status}
                  </div>
                )}

                {/* Overlay sutil al pasar el mouse */}
                {!isReserved && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
                    <span className="translate-y-2 transform bg-white px-3 py-1 text-xs font-semibold text-gray-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-sm rounded-full">
                      Ver detalle
                    </span>
                  </div>
                )}
              </div>

              {/* Contenedor de Info */}
              <div className="flex flex-col grow justify-between p-3.5">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {product.platform || "General"}
                  </span>
                  <p className={`font-sans text-xs font-normal line-clamp-2 leading-snug transition-colors mb-2 ${isReserved ? "text-gray-400" : "text-gray-800 group-hover:text-red-600"}`}>
                    {product.title}
                  </p>
                </div>
                
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

          <p className="mb-12 max-w-2xl text-center text-sm md:text-base leading-relaxed font-medium text-gray-600">
            Explorá nuestros juegos nuevos y usados, consolas, y accesorios con stock actualizado en tiempo real.
          </p>

          {/* === LAYOUT DE E-COMMERCE: FILTROS LATERALES / SUPERIORES + GRILLA === */}
          <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
            
            {/* === PANEL DE FILTROS (SIDEBAR ESTILO E-COMMERCE) === */}
            <aside className="w-full lg:w-72 shrink-0 bg-gray-50/80 border border-gray-200/80 rounded-3xl p-6 shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  🎛️ Filtrar Productos
                </h3>
                {(selectedPlatform !== "Todas" || selectedCategory !== "todas") && (
                  <button 
                    onClick={() => { setSelectedPlatform("Todas"); setSelectedCategory("todas"); }}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* 1. Filtro por Categoría */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-3">
                  Categoría
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "todas", label: "✨ Todas las categorías" },
                    { id: "juego-nuevo", label: "🆕 Juegos Nuevos" },
                    { id: "juego-usado", label: "👾 Juegos Usados" },
                    { id: "consola", label: "🎮 Consolas" },
                    { id: "accesorio", label: "🎧 Accesorios" },
                  ].filter((cat, index, self) => index === self.findIndex(c => c.id === cat.id)).map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`text-left text-xs font-medium px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                          isActive 
                            ? "bg-red-600 text-white font-bold shadow-sm" 
                            : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                        }`}
                      >
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Filtro por Plataforma */}
              {!loading && availablePlatforms.length > 0 && (
                <div className="border-t border-gray-200 pt-5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-3">
                    Plataforma
                  </label>
                  <div className="flex flex-wrap lg:flex-col gap-1.5">
                    <button
                      onClick={() => setSelectedPlatform("Todas")}
                      className={`text-left text-xs font-medium px-3.5 py-2 rounded-xl transition-all ${
                        selectedPlatform === "Todas"
                          ? "bg-gray-900 text-white font-bold shadow-sm"
                          : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                      }`}
                    >
                      🎮 Todas las plataformas
                    </button>
                    {availablePlatforms.map((platform) => {
                      const isActive = selectedPlatform === platform;
                      return (
                        <button
                          key={platform}
                          onClick={() => setSelectedPlatform(platform)}
                          className={`text-left text-xs font-medium px-3.5 py-2 rounded-xl transition-all ${
                            isActive
                              ? "bg-gray-900 text-white font-bold shadow-sm"
                              : "text-gray-600 hover:bg-gray-200/60 hover:text-gray-900"
                          }`}
                        >
                          {platform}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>

            {/* === CONTENIDO PRINCIPAL / GRILLA === */}
            <div className="grow w-full">
              {/* Barra superior de resultados */}
              <div className="flex items-center justify-between bg-gray-50/60 border border-gray-100 rounded-2xl px-5 py-3 mb-8">
                <span className="text-xs font-medium text-gray-500">
                  Mostrando <strong className="text-gray-900">{filteredProducts.length}</strong> artículos
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 hidden sm:inline">Filtro activo:</span>
                  <span className="text-xs font-bold bg-white border border-gray-200 px-3 py-1 rounded-full text-red-600 shadow-2xs">
                    {selectedCategory === "todas" ? "General" : selectedCategory} {selectedPlatform !== "Todas" ? `• ${selectedPlatform}` : ""}
                  </span>
                </div>
              </div>

              {/* === ESTADO DE CARGA === */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
                  <p className="font-medium text-gray-500 text-sm">Cargando catálogo en tiempo real...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-base font-semibold text-gray-700 mb-2">No se encontraron productos con estos filtros.</p>
                  <p className="text-xs text-gray-400 mb-6">Probá seleccionando otra categoría o limpiando los filtros.</p>
                  <button 
                    onClick={() => { setSelectedPlatform("Todas"); setSelectedCategory("todas"); }}
                    className="bg-gray-900 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md hover:bg-black transition-all"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                <div className="flex w-full flex-col">
                  {/* Si el usuario seleccionó una categoría específica, mostramos esa grilla directamente */}
                  {selectedCategory !== "todas" ? (
                    renderProductGrid(filteredProducts)
                  ) : (
                    /* Si está en "todas", mantenemos las secciones clásicas ordenadas */
                    <>
                      {juegosNuevos.length > 0 && (
                        <div className="mb-14 w-full">
                          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                              <span>🆕</span> Juegos Nuevos (Sellados)
                            </h3>
                            <span className="text-xs font-semibold text-gray-400">{juegosNuevos.length} disponibles</span>
                          </div>
                          {renderProductGrid(juegosNuevos)}
                        </div>
                      )}

                      {juegosUsados.length > 0 && (
                        <div className="mb-14 w-full">
                          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                              <span>👾</span> Juegos Usados
                            </h3>
                            <span className="text-xs font-semibold text-gray-400">{juegosUsados.length} disponibles</span>
                          </div>
                          {renderProductGrid(juegosUsados)}
                        </div>
                      )}

                      {consolas.length > 0 && (
                        <div className="mb-14 w-full">
                          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
                            <div>
                              <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                                <span>🎮</span> Consolas
                              </h3>
                              <p className="text-[11px] text-gray-400">Precio expresado en dólares</p>
                            </div>
                            <span className="text-xs font-semibold text-gray-400">{consolas.length} disponibles</span>
                          </div>
                          {renderProductGrid(consolas)}
                        </div>
                      )}

                      {accesorios.length > 0 && (
                        <div className="mb-14 w-full">
                          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                              <span>🎧</span> Accesorios
                            </h3>
                            <span className="text-xs font-semibold text-gray-400">{accesorios.length} disponibles</span>
                          </div>
                          {renderProductGrid(accesorios)}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* === BANNER DE CONSULTA === */}
          <div className="mt-16 flex w-full flex-col items-center justify-between gap-6 rounded-3xl border border-gray-100 bg-gray-50/60 p-8 md:flex-row md:p-10 md:text-left text-center">
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