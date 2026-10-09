import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";
import ProductModal from "./ProductModal";
import CatalogFilters from "./CatalogFilters";

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
}

interface CatalogoProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

const Catalogo: React.FC<CatalogoProps> = ({ searchQuery = "", onClearSearch }) => {
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  const [tempPlatform, setTempPlatform] = useState<string>("Todas");
  const [tempCategory, setTempCategory] = useState<string>("todas");
  const [appliedPlatform, setAppliedPlatform] = useState<string>("Todas");
  const [appliedCategory, setAppliedCategory] = useState<string>("todas");

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isCatalogInView, setIsCatalogInView] = useState<boolean>(false);

// Control de scroll para asegurarnos de que el botón flotante de filtro de móvil aparezca siempre que el catálogo esté en pantalla
  useEffect(() => {
    const handleScroll = () => {
      const catalogoElement = document.getElementById("catalogo");
      if (!catalogoElement) return;

      const rect = catalogoElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      
      setIsCatalogInView(isVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Ejecutamos una vez al cargar por si ya estamos en la sección
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

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

  const scrollToCatalogoTop = () => {
    const catalogoElement = document.getElementById("catalogo");
    if (catalogoElement) {
      catalogoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const hasUnappliedFilters = tempPlatform !== appliedPlatform || tempCategory !== appliedCategory;

  const handleApplyFilters = () => {
    setAppliedPlatform(tempPlatform);
    setAppliedCategory(tempCategory);
    setIsMobileFilterOpen(false); 
    scrollToCatalogoTop(); 
  };

  const handleResetFilters = () => {
    setTempPlatform("Todas");
    setTempCategory("todas");
    setAppliedPlatform("Todas");
    setAppliedCategory("todas");
    setIsMobileFilterOpen(false);
    if (onClearSearch) onClearSearch();
    scrollToCatalogoTop();
  };

  const validProducts = products.filter((product) => {
    const stockNum = Number(product.stock) || 0;
    const status = (product.status || "").trim();
    const isPreventaOrPedido = status === "Preventa" || status === "Pedido" || status === "Oferta";
    const hasStock = stockNum >= 1;
    return (hasStock || isPreventaOrPedido) && product.title && product.title.trim() !== "";
  });

  const availablePlatforms = Array.from(
    new Set(
      validProducts
        .map((p) => p.platform?.trim())
        .filter((platform): platform is string => Boolean(platform && platform !== ""))
    )
  );

  const filteredProducts = validProducts.filter((product) => {
    const matchesPlatform = 
      appliedPlatform === "Todas" || 
      (product.platform || "").trim().toLowerCase() === appliedPlatform.toLowerCase();

    const productCat = (product.category || "").trim().toLowerCase();
    const matchesCategory = 
      appliedCategory === "todas" || 
      productCat === appliedCategory.toLowerCase();

    const matchesSearch = 
      !searchQuery || 
      searchQuery.trim() === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPlatform && matchesCategory && matchesSearch;
  });

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
                {isOffer && !isReserved && (
                  <div className="absolute top-5 -right-9 z-20 w-40 rotate-45 transform border-y-2 border-purple-800 bg-purple-600 py-1.5 text-center text-[11px] font-black text-white uppercase shadow-md">
                    ⚡ OFERTA
                  </div>
                )}
                {isPreventaOrPedido && !isReserved && !isOffer && (
                  <div className="absolute top-3 left-3 z-20 rounded-lg bg-blue-600 px-2 py-0.5 text-[9px] font-bold text-white uppercase shadow-sm">
                    📦 {product.status}
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

  const sharedFilterProps = {
    tempCategory,
    setTempCategory,
    tempPlatform,
    setTempPlatform,
    availablePlatforms,
    hasUnappliedFilters,
    appliedPlatform,
    appliedCategory,
    searchQuery,
    handleResetFilters,
    handleApplyFilters,
  };

  return (
    <>
      <section id="catalogo" className="relative w-full bg-white px-4 py-24 font-sans lg:px-8">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
          <span className="mb-4 inline-block w-fit rounded-full border border-red-100 bg-red-50 px-5 py-2 text-xs font-bold tracking-widest text-red-600 uppercase shadow-sm sm:text-sm">
            🔥 Catálogo Oficial
          </span>

          <h2 className="mb-4 text-center text-3xl leading-tight font-black tracking-tight text-gray-900 md:text-5xl">
            <span className="text-brand-cyan font-orbitron font-black">Enter</span>
            <span className="text-brand-magenta font-orbitron font-black">Game</span>
          </h2>

          {searchQuery && searchQuery.trim() !== "" && (
            <div className="mb-8 flex items-center justify-between bg-red-50 border border-red-200 px-6 py-3 rounded-2xl w-full max-w-3xl text-xs text-red-700 font-semibold shadow-2xs">
              <span>Resultados para la búsqueda: &quot;<strong>{searchQuery}</strong>&quot;</span>
              {onClearSearch && (
                <button onClick={onClearSearch} className="hover:underline font-bold ml-4 cursor-pointer">
                  ✕ Limpiar búsqueda
                </button>
              )}
            </div>
          )}

          <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar de Filtros para Desktop */}
            <aside className="hidden lg:flex w-72 shrink-0 bg-gray-50/90 border border-gray-200/80 rounded-3xl p-6 shadow-xs sticky top-28 flex-col">
              <CatalogFilters {...sharedFilterProps} isMobile={false} />
            </aside>

            <div className="grow w-full">
              <div className="flex items-center justify-between bg-gray-50/60 border border-gray-100 rounded-2xl px-5 py-3 mb-8">
                <span className="text-xs font-medium text-gray-500">
                  Mostrando <strong className="text-gray-900">{filteredProducts.length}</strong> artículos
                </span>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 bg-gray-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                  >
                    <span>🔍</span> Filtrar
                    {(appliedPlatform !== "Todas" || appliedCategory !== "todas" || searchQuery) && (
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                  </button>

                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-xs text-gray-400">Filtro aplicado:</span>
                    <span className="text-xs font-bold bg-white border border-gray-200 px-3 py-1 rounded-full text-red-600 shadow-2xs">
                      {appliedCategory === "todas" ? "General" : appliedCategory} {appliedPlatform !== "Todas" ? `• ${appliedPlatform}` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
                  <p className="font-medium text-gray-500 text-sm">Cargando catálogo en tiempo real...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-base font-semibold text-gray-700 mb-2">No se encontraron productos con estos filtros o búsqueda.</p>
                  <p className="text-xs text-gray-400 mb-6">Probá seleccionando otras categorías o limpiando la búsqueda.</p>
                  <button 
                    onClick={handleResetFilters}
                    className="bg-gray-900 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md hover:bg-black transition-all cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                <div className="flex w-full flex-col">
                  {appliedCategory !== "todas" || (searchQuery && searchQuery.trim() !== "") ? (
                    renderProductGrid(filteredProducts)
                  ) : (
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

          <div className="mt-16 flex w-full flex-col items-center justify-between gap-6 rounded-3xl border border-gray-100 bg-gray-50/60 p-8 md:flex-row md:p-10 md:text-left text-center">
            <div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 md:text-2xl">¿No encontrás lo que buscás?</h3>
              <p className="max-w-xl text-sm md:text-base font-normal text-gray-600">Traemos productos a pedido todas las semanas. Escribinos para consultar por lo que quieras que nosotros nos encargamos.</p>
            </div>
            <button onClick={() => setContactOpen(true)} className="shrink-0 transform rounded-xl bg-gray-900 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-black cursor-pointer">
              Consultar Stock
            </button>
          </div>
        </div>
      </section>

      {/* Botón flotante móvil (Solo aparece si el catálogo está visible en pantalla) */}
      {isCatalogInView && !isMobileFilterOpen && (
        <div className="lg:hidden fixed bottom-6 right-6 z-50 animate-in fade-in duration-300">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3.5 rounded-full text-xs font-bold shadow-xl hover:bg-black transition-transform active:scale-95 cursor-pointer"
          >
            <span className="text-base">🔍</span> Filtrar productos
            {(appliedPlatform !== "Todas" || appliedCategory !== "todas" || searchQuery) && (
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>
        </div>
      )}

      {/* Modal / Drawer de Filtros para Móvil */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 transition-opacity">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-base">Filtrar catálogo</h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-gray-400 hover:text-gray-700 font-bold p-2 bg-gray-100 rounded-full text-xs cursor-pointer"
              >
                ✕ Cerrar
              </button>
            </div>
            
            <CatalogFilters {...sharedFilterProps} isMobile={true} />
          </div>
        </div>
      )}

      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
      />

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Catalogo;