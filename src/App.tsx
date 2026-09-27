import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

// Páginas
import Home from './pages/Home';
import Sorteos from './pages/Sorteos';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorteos" element={<Sorteos />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;