import React from "react";
import Hero from "../components/Hero";
import Canje from "../components/Canje";
import Comprar from "../components/Comprar";
import Vender from "../components/Vender";
import Catalogo from "../components/Catalogo";
import Faq from "../components/Faq";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Catalogo />
      <Comprar />
      <Vender />
      <Canje />
      <Faq />
    </main>
  );
};

export default Home;