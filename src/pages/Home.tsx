import React from "react";
import Hero from "../components/Hero";
import Canje from "../components/Canje";
import Comprar from "../components/Comprar";
import Vender from "../components/Vender";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Comprar />
      <Vender />
      <Canje />
      {/*<FAQ /> */}
    </main>
  );
};

export default Home;