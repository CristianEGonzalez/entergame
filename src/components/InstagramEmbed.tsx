import React, { useEffect } from 'react';

// Declaración global para evitar errores de TypeScript con el script de Instagram
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export const InstagramEmbed: React.FC = () => {
  useEffect(() => {
    // Carga el script de Instagram si no está presente en el documento
    const existingScript = document.querySelector(
      'script[src="//www.instagram.com/embed.js"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Si el script ya existe, le indicamos a Instagram que procese los embeds nuevos
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }
  }, []);

  return (
    <div className="flex justify-center my-4">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink="https://www.instagram.com/p/Ddu5cMUleUr/?utm_source=ig_embed&utm_campaign=loading"
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow:
            '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: '99.375%',
        }}
      >
        {/* Contenido original adaptado a JSX (puedes conservar todo el HTML interno tal cual) */}
        <div style={{ padding: '16px' }}>
          <a
            href="https://www.instagram.com/p/Ddu5cMUleUr/?utm_source=ig_embed&utm_campaign=loading"
            style={{
              background: '#FFFFFF',
              lineHeight: 0,
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* ... (puedes mantener el resto del SVG y divs internos que pegaste) ... */}
          </a>
        </div>
      </blockquote>
    </div>
  );
};