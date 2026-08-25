import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from "./Button";
import ContactModal from "./ContactModal";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  const hamburgerLine: string = `h-1 w-6 my-1 rounded-full bg-gray-100 transition ease transform duration-300`;
  
  const links: string[] = ["Catálogo", "Canje", "Venta", "FAQ"];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!contactOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen, contactOpen]); 

  const handleMobileContact = (): void => {
    setMenuOpen(false);
    setContactOpen(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string): void => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md py-3 px-4 pb-3 flex justify-between items-center border-b border-gray-200 font-sans shadow-xs">
        
        {/* Logo Area */}
        <div className="relative z-50 flex items-center lg:text-3xl md:text-2xl text-2xl tracking-tighter">
          <span className="text-red-600 mr-2 text-2xl">🎮</span>
          <Link to="/" onClick={(e) => handleNavClick(e, "inicio")}
            className="font-orbitron font-bold mr-2 md:mr-12 text-cyan-500 tracking-tight">
            Enter<span className="text-red-600">Game</span>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center">
          {links.map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="text-gray-300 hover:text-red-600 font-bold transition-colors duration-300 text-sm uppercase tracking-wider mr-8"
            >
              {item}
            </Link>
          ))}
          <Button 
            nombre="Contactar" 
            onClick={() => setContactOpen(true)} 
            className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition-colors shadow-md"
          />
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden flex flex-col h-12 w-12 justify-center items-center group relative z-50"
          aria-label="Abrir menú de navegación"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={`${hamburgerLine} ${menuOpen ? "rotate-45 translate-y-3 bg-red-600!" : ""}`} />
          <div className={`${hamburgerLine} ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`${hamburgerLine} ${menuOpen ? "-rotate-45 -translate-y-3 bg-red-600!" : ""}`} />
        </button>

      </header>

      {/* --- MENÚ MÓVIL --- */}
      <div
        className={`
          fixed inset-0 h-full w-full
          bg-white/95 backdrop-blur-xl
          flex flex-col items-center justify-start pt-32 gap-10 md:hidden z-40
          transition-all duration-300 ease-in-out
          ${menuOpen 
            ? "opacity-100 scale-100 visible" 
            : "opacity-0 scale-95 invisible pointer-events-none"
          }
        `}
      >
        {links.map((item) => (
          <Link
            key={item}
            to={`/#${item.toLowerCase()}`}
            onClick={(e) => handleNavClick(e, item.toLowerCase())}
            className="text-gray-800 text-2xl font-orbitron font-bold uppercase tracking-widest relative pb-1 hover:text-red-600 transition-all duration-300"
          >
            {item}
          </Link>
        ))}

        <Button 
          nombre="Contactar" 
          onClick={handleMobileContact}
          className="bg-red-600 text-white font-orbitron font-bold py-3 px-10 rounded-full text-xl hover:bg-red-700 transition-colors shadow-lg"
        />
      </div>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
};

export default Header;