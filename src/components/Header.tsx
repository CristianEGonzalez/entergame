import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from "./Button";
import ContactModal from "./ContactModal";
import EnterGameLogo from "./EnterGameLogo";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  const hamburgerLine: string = `h-1 w-6 my-1 rounded-full bg-gray-100 transition ease transform duration-300`;
  
  const links: string[] = ["Catalogo", "Comprar", "Vender", "Canje", "FAQ"];

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
        <div className="relative z-50 flex items-center tracking-tighter">
          <Link to="/" onClick={(e) => handleNavClick(e, "inicio")}>
            <EnterGameLogo className="w-64 lg:w-72 hover:scale-105 transition-transform duration-300" />
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center">
          {links.map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="text-gray-300 hover:text-brand-red font-bold transition-colors duration-300 text-sm uppercase tracking-wider mr-6"
            >
              {item}
            </Link>
          ))}

          {/* Enlace a Instagram (Desktop) */}
          <a
            href="https://instagram.com/entergame_ok"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de EnterGame"
            className="flex items-center justify-center mr-6 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <defs>
                <radialGradient id="instagram-gradient-header" cx="30%" cy="107%" r="150%">
                  <stop offset="0%" stopColor="#fdf497" />
                  <stop offset="5%" stopColor="#fdf497" />
                  <stop offset="45%" stopColor="#fd5949" />
                  <stop offset="60%" stopColor="#d6249f" />
                  <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
              </defs>
              <path fill="url(#instagram-gradient-header)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <Button 
            nombre="Contactar" 
            onClick={() => setContactOpen(true)} 
            className="bg-brand-red text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition-colors shadow-md"
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
          flex flex-col items-center justify-start pt-28 gap-8 md:hidden z-40
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

        {/* Enlace a Instagram (Mobile) */}
        <a
          href="https://instagram.com/entergame_ok"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-gray-800 text-lg font-bold py-2 px-4 rounded-xl bg-gray-100 border border-gray-200"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <defs>
              <radialGradient id="instagram-gradient-mobile" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
              </radialGradient>
            </defs>
            <path fill="url(#instagram-gradient-mobile)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Seguinos en Instagram
        </a>

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