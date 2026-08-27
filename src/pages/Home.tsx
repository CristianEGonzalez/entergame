import React from "react";
import Hero from "../components/Hero";
import Canje from "../components/Canje";
// import Projects from "../components/Projects";
// import FAQ from "../components/FAQ";
// import Services from "../components/Services";
// import About from "../components/About";
// import WhyChoose from "../components/WhyChoose";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Canje />
      {/* <Services />
      <About />
      <WhyChoose />
      <Projects />
      <FAQ /> */}
    </main>
  );
};

export default Home;