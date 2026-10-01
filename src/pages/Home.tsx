import React, { useState } from "react";
import Hero from "../components/Hero";
import Canje from "../components/Canje";
import Comprar from "../components/Comprar";
import Vender from "../components/Vender";
import Catalogo from "../components/Catalogo";
import Faq from "../components/Faq";

const Home: React.FC = () => {
  // Estado para la búsqueda global conectada entre el Hero y el Catálogo
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <main>
      {/* Pasamos la función que actualiza el estado al buscar */}
      <Hero onSearchSubmit={(query) => setSearchQuery(query)} />

      {/* Pasamos el searchQuery y la función para limpiarlo al catálogo */}
      <Catalogo 
        searchQuery={searchQuery} 
        onClearSearch={() => setSearchQuery("")} 
      />

      <Comprar />
      <Vender />
      <Canje />
      <Faq />
    </main>
  );
};

export default Home;