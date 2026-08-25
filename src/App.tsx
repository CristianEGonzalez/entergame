import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

// Páginas
import Home from './pages/Home';
// import Privacy from './pages/Privacy'; // Descomentar cuando esté la página
// import Terms from './pages/Terms';     // Descomentar cuando esté la página

// Componentes
import Header from './components/Header';
// import Footer from './components/Footer'; // Descomentar cuando esté el footer

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Futuras rutas de EnterGame:
        <Route path="/privacidad" element={<Privacy />} />
        <Route path="/terminos" element={<Terms />} />
        */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;