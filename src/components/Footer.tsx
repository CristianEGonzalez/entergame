import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Catálogo", href: "#catalogo" },
    { name: "Comprar", href: "#comprar" },
    { name: "Vender", href: "#vender" },
    { name: "Canje", href: "#canje" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="border-brand-red border-t-4 bg-gray-950 px-4 pt-16 pb-8 font-sans text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* === CONTENIDO PRINCIPAL === */}
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* 1. Marca y Descripción */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="font-orbitron! mb-4 flex items-center gap-1 text-3xl font-black tracking-tighter">
              <span className="text-brand-cyan">Enter</span>
              <span className="text-brand-red">Game</span>
            </h2>
            <p className="max-w-sm leading-relaxed font-medium text-gray-400">Tu próxima aventura empieza acá. Nos especializamos en la compra, venta y canje de juegos físicos para Nintendo Switch.</p>
          </div>

          {/* 2. Navegación Rápida */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-6 text-lg font-bold tracking-widest text-white uppercase">Secciones</h3>
            <ul className="flex flex-col items-center gap-3 md:items-start">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-medium text-gray-400 transition-colors hover:text-red-500">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Ubicación y Contacto */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="mb-6 text-lg font-bold tracking-widest text-white uppercase">Información</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <span className="text-xl">📍</span>
                <span className="font-medium">Ituzaingó, Zona Oeste, Buenos Aires</span>
              </div>

              {/* Instagram de la tienda */}
              <div className="flex items-center gap-3 text-gray-400">
                <span className="flex w-6 items-center justify-center text-xl">
                  <svg className="h-5 w-5 transition-transform hover:scale-110" viewBox="0 0 24 24">
                    <defs>
                      <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <path
                      fill="url(#instagram-gradient)"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                </span>
                <a href="https://instagram.com/entergame_ok" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan font-medium transition-colors">
                  @entergame_ok
                </a>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <span className="text-xl">🌐</span>
                <a href="https://entergame.vercel.app" className="font-medium transition-colors hover:text-cyan-400">
                  entergame.vercel.app
                </a>
              </div>
              <div className="pt-2">
                <a href="#inicio" className="inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-white/20">
                  ↑ Volver arriba
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* === LÍNEA DIVISORIA === */}
        <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-gray-800 to-transparent"></div>

        {/* === COPYRIGHT === */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm font-medium text-gray-500 md:flex-row md:text-left">
          <p>© {currentYear} EnterGame. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Desarrollado por{" "}
            <a href="https://www.entercode.com.ar" target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center font-black tracking-wide transition-transform hover:scale-105">
              <span className="mr-1 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text font-mono text-transparent">{`>`}</span>
              <span className="text-white">Enter</span>
              <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Code</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
