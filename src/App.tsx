import React, { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

// Páginas
import Home from './pages/Home';
import Sorteos from './pages/Sorteos';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Estado para la búsqueda global conectada entre Header y Catálogo
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <Header onSearchSubmit={(query) => setSearchQuery(query)} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              searchQuery={searchQuery} 
              onClearSearch={() => setSearchQuery("")} 
            />
          } 
        />
        <Route path="/sorteos" element={<Sorteos />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;