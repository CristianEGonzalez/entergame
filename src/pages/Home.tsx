import React from "react";
import Hero from "../components/Hero";
import Canje from "../components/Canje";
import Venta from "../components/Venta";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Canje />
      <Venta />
      {/*<FAQ /> */}
    </main>
  );
};

export default Home;