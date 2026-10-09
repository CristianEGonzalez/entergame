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
      document.body.style.overflow = "hidden";
    } else if (!contactOpen) {
      document.body.style.overflow = "unset";
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
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-black/80 px-4 py-3 pb-3 font-sans shadow-xs backdrop-blur-md">
        {/* Logo Area */}
        <div className="relative z-50 flex items-center tracking-tighter">
          <Link to="/" onClick={(e) => handleNavClick(e, "inicio")}>
            {/* <EnterGameLogo className="w-64 lg:w-72 hover:scale-105 transition-transform duration-300" /> */}
            <h4 className="font-orbitron text-brand-cyan text-4xl font-black transition-all duration-300 hover:scale-[1.02] hover:opacity-80">
              Enter<span className="text-brand-magenta">Game</span>
            </h4>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden items-center md:flex">
          {links.map((item) => (
            <Link key={item} to={`/#${item.toLowerCase()}`} onClick={(e) => handleNavClick(e, item.toLowerCase())} className="hover:text-brand-magenta mr-6 text-sm font-bold tracking-wider text-gray-300 uppercase transition-colors duration-300">
              {item}
            </Link>
          ))}

          {/* Enlace a App Sorteos (Desktop) */}
          <Link to="/sorteos" className="mr-6 flex items-center gap-1.5 text-sm font-bold tracking-wider text-cyan-400 uppercase transition-colors duration-300 hover:text-cyan-300">
            <span>🎰</span>
            <span>App Sorteos</span>
          </Link>

          {/* Enlace a Instagram (Desktop) */}
          <a href="https://instagram.com/entergame_ok" target="_blank" rel="noopener noreferrer" aria-label="Instagram de EnterGame" className="group mr-6 flex items-center justify-center">
            <svg className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <defs>
                <radialGradient id="instagram-gradient-header" cx="30%" cy="107%" r="150%">
                  <stop offset="0%" stopColor="#fdf497" />
                  <stop offset="5%" stopColor="#fdf497" />
                  <stop offset="45%" stopColor="#fd5949" />
                  <stop offset="60%" stopColor="#d6249f" />
                  <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
              </defs>
              <path
                fill="url(#instagram-gradient-header)"
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
          </a>

          <Button nombre="Contactar" onClick={() => setContactOpen(true)} className="bg-brand-purple rounded-full px-6 py-2 font-bold text-white shadow-md transition-colors hover:bg-purple-700" />
        </nav>

        {/* Mobile Menu Icon */}
        <button className="group relative z-50 flex h-12 w-12 flex-col items-center justify-center md:hidden" aria-label="Abrir menú de navegación" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`${hamburgerLine} ${menuOpen ? "translate-y-3 rotate-45 bg-red-600!" : ""}`} />
          <div className={`${hamburgerLine} ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`${hamburgerLine} ${menuOpen ? "-translate-y-3 -rotate-45 bg-red-600!" : ""}`} />
        </button>
      </header>

      {/* --- MENÚ MÓVIL --- */}
      <div className={`fixed inset-0 z-40 flex h-full w-full flex-col items-center justify-start gap-8 bg-white/95 pt-28 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${menuOpen ? "visible scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0"} `}>
        {links.map((item) => (
          <Link key={item} to={`/#${item.toLowerCase()}`} onClick={(e) => handleNavClick(e, item.toLowerCase())} className="font-orbitron relative pb-1 text-2xl font-bold tracking-widest text-gray-800 uppercase transition-all duration-300 hover:text-red-600">
            {item}
          </Link>
        ))}

        {/* Enlace a App Sorteos (Mobile) */}
        <Link to="/sorteos" onClick={() => setMenuOpen(false)} className="font-orbitron relative flex items-center gap-2 pb-1 text-2xl font-bold tracking-widest text-cyan-600 uppercase transition-all duration-300 hover:text-cyan-500">
          <span>🎰</span>
          <span>App Sorteos</span>
        </Link>

        {/* Enlace a Instagram (Mobile) */}
        <a href="https://instagram.com/entergame_ok" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-lg font-bold text-gray-800">
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <defs>
              <radialGradient id="instagram-gradient-mobile" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="5%" stopColor="#fdf497" />
                <stop offset="45%" stopColor="#fd5949" />
                <stop offset="60%" stopColor="#d6249f" />
                <stop offset="90%" stopColor="#285AEB" />
              </radialGradient>
            </defs>
            <path
              fill="url(#instagram-gradient-mobile)"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
          </svg>
          Seguinos en Instagram
        </a>

        <Button nombre="Contactar" onClick={handleMobileContact} className="font-orbitron rounded-full bg-red-600 px-10 py-3 text-xl font-bold text-white shadow-lg transition-colors hover:bg-red-700" />
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Header;
