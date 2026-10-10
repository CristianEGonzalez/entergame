import React from "react";
import Hero from "../components/Hero";
import Canje from "../components/Canje";
import Comprar from "../components/Comprar";
import Vender from "../components/Vender";
import Catalogo from "../components/Catalogo";
import Faq from "../components/Faq";

interface HomeProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const Home: React.FC<HomeProps> = ({ searchQuery, onClearSearch }) => {
  return (
    <main>
      <Hero />

      {/* Pasamos el searchQuery y la función para limpiarlo al catálogo */}
      <Catalogo 
        searchQuery={searchQuery} 
        onClearSearch={onClearSearch} 
      />

      <Comprar />
      <Vender />
      <Canje />
      <Faq />
    </main>
  );
};

export default Home;