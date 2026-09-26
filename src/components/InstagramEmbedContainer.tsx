// InstagramEmbedContainer.tsx
import React, { useEffect } from 'react';

// Declaración global para evitar errores de TS
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface InstagramEmbedContainerProps {
  permalink: string;
}

export const InstagramEmbedContainer: React.FC<InstagramEmbedContainerProps> = ({ permalink }) => {
  useEffect(() => {
    const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.instgrm?.Embeds.process();
    }
  }, []);

  return (
    // Contenedor exterior flexible para alineación
    <div className="flex w-full items-center justify-center lg:justify-end">
      
      {/* Contenedor Máscara (Aquí está el truco) */}
      {/* 
        - relative: Para posicionar la máscara absolutamente dentro.
        - w-full max-w-[540px]: Mantiene el ancho responsive seguro.
        - overflow-hidden: Corta todo lo que sobresalga de esta caja.
        - aspect-[1/1.1]: Define una altura controlada (un poco más alto que cuadrado) para que la imagen se vea bien pero no se coma la pantalla.
      */}
      <div className="relative w-full max-w-[540px] overflow-hidden rounded-xl shadow-2xl aspect-[1/1.1]">
        
        {/* Contenido de Instagram - Posicionado Absolutamente */}
        {/* 
          - absolute top-[-50px]: Movemos el embed hacia arriba para esconder el encabezado de Instagram.
          - left-0 right-0 bottom-0: Ajusta el embed dentro de la máscara.
          - scale-[1.02]: Aumenta ligeramente el tamaño para rellenar los bordes de la máscara.
        */}
        <div className="absolute -top-[50px] left-0 right-0 -bottom-[130px] scale-[1.02]">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={`${permalink}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
            style={{
              background: 'transparent',
              border: 0,
              margin: 0,
              maxWidth: '100%',
              width: '100%',
              minWidth: '100%',
            }}
          >
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default InstagramEmbedContainer;