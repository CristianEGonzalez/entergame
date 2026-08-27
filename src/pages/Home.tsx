import React from "react";
import Hero from "../components/Hero";
import Canje from "../components/Canje";
import Venta from "../components/Venta";
import Vender from "../components/Vender";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Venta />
      <Canje />
      <Vender />
      {/*<FAQ /> */}
    </main>
  );
};

export default Home;