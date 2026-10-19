import React, { useState, useEffect } from "react";
import ContactModal from "./ContactModal";
import ProductModal from "./ProductModal";
import CatalogFilters from "./CatalogFilters";
import ProductGrid from "./ProductGrid";

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
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el catálogo:", err);
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

  // Aplicación para Mobile (cierra el modal y aplica lo temporal)
  const handleApplyFilters = () => {
    setAppliedPlatform(tempPlatform);
    setAppliedCategory(tempCategory);
    setIsMobileFilterOpen(false); 
    scrollToCatalogoTop(); 
  };

  // Aplicación instantánea para Desktop (aplica y actualiza todo de un solo golpe)
  const handleDesktopSelect = (category: string, platform: string) => {
    setAppliedCategory(category);
    setAppliedPlatform(platform);
    setTempCategory(category);
    setTempPlatform(platform);
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

  const sectionCategories = [
    {
      title: "Juegos Nuevos (Sellados)",
      icon: "🆕",
      items: filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "juego-nuevo"),
    },
    {
      title: "Juegos Usados",
      icon: "👾",
      items: filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "juego-usado"),
    },
    {
      title: "Consolas",
      icon: "🎮",
      items: filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "consola"),
    },
    {
      title: "Accesorios",
      icon: "🎧",
      items: filteredProducts.filter((p) => (p.category || "").toLowerCase().trim() === "accesorio"),
    },
  ];

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
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
      <section id="catalogo" className="relative w-full bg-[#201229] px-4 py-24 font-sans lg:px-8"> 
        
        {/* ======= CAPAS VISUALES SYNTHWAVE (FONDO) ======= */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand-purple/20 to-transparent bg-size-[100%_800px]" />
        </div>

        {/* Patrón sutil estático */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(46, 188, 252, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(249, 6, 242, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

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
            {/* ASIDE DESKTOP: Usa handleDesktopSelect para filtrar al instante */}
            <aside className="hidden lg:flex w-72 shrink-0 bg-gray-50/95 border border-gray-200/80 rounded-lg p-6 shadow-xs sticky top-24 flex-col max-h-[calc(100vh-7rem)] overflow-y-auto">
              <CatalogFilters 
                {...sharedFilterProps} 
                isMobile={false} 
                setTempCategory={(cat) => handleDesktopSelect(cat, appliedPlatform)}
                setTempPlatform={(plat) => handleDesktopSelect(appliedCategory, plat)}
              />
            </aside>

            <div className="grow w-full">
              <div className="flex items-center justify-between bg-gray-50/60 border border-gray-100 rounded-2xl px-5 py-3 mb-8">
                <span className="text-xs font-medium text-gray-500">
                  Mostrando <strong className="text-gray-900">{filteredProducts.length}</strong> artículos
                </span>
                
                <div className="flex items-center gap-3">
                  {/* Botón Superior Responsive */}
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 bg-gray-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                  >
                    <span>🔍</span> Filtrar Categoría
                    {/* El punto rojo SOLO se muestra si hay una categoría seleccionada */}
                    {appliedCategory !== "todas" && (
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
                    <ProductGrid items={filteredProducts} onSelectProduct={handleSelectProduct} />
                  ) : (
                    sectionCategories.map(
                      (cat) =>
                        cat.items.length > 0 && (
                          <div key={cat.title} className="mb-14 w-full">
                            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
                              <h3 className="text-lg font-bold tracking-tight text-white text-shadow-lg text-shadow-brand-magenta flex items-center gap-2">
                                <span>{cat.icon}</span> {cat.title}
                              </h3>
                              <span className="text-xs font-semibold text-gray-400">{cat.items.length} disponibles</span>
                            </div>
                            <ProductGrid items={cat.items} onSelectProduct={handleSelectProduct} />
                          </div>
                        )
                    )
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

      {/* Botón Flotante Inferior Responsive */}
      {isCatalogInView && !isMobileFilterOpen && (
        <div className="lg:hidden fixed bottom-6 right-6 z-50 animate-in fade-in duration-300">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3.5 rounded-full text-xs font-bold shadow-xl hover:bg-black transition-transform active:scale-95 cursor-pointer"
          >
            <span className="text-base">🔍</span> Filtrar Categoría
            {/* El punto rojo SOLO se muestra si hay una categoría seleccionada */}
            {(appliedPlatform!== "Todas" || appliedCategory !== "todas") && (
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>
        </div>
      )}

      {/* MODAL / DRAWER MOBILE */}
{isMobileFilterOpen && (
  <div className="fixed inset-0 z-9999 flex justify-start bg-black/30 backdrop-blur-2xs transition-opacity">
    <div className="w-1/2 min-w-65 max-w-sm bg-white h-full p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-sm">Filtrar catálogo</h3>
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="text-gray-400 hover:text-gray-700 font-bold p-1.5 bg-gray-100 rounded-full text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
        
        <CatalogFilters {...sharedFilterProps} isMobile={true} />
      </div>
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