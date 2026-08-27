import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

// Páginas
import Home from './pages/Home';

// Componentes
import Header from './components/Header';
// import Footer from './components/Footer'; // Descomentar cuando esté el footer

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;