import React, { useState, useEffect } from 'react';
import postsData from '../data/instagramPosts.json';
import enterGameLogo from '../assets/EnterGameLogo.png';

interface Post {
  id: string;
  permalink: string;
  imageUrl: string;
  caption: string;
  mediaType: 'sorteo' | 'preventa' | 'novedad';
}

export const InstagramCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const posts: Post[] = postsData as Post[];

  if (!posts || posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  const badgeConfig = {
    sorteo: { text: '¡GRAN SORTEO!', bg: 'bg-brand-red text-white' },
    preventa: { text: '¡PREVENTA ABIERTA!', bg: 'bg-brand-cyan text-gray-900' },
    novedad: { text: '¡NOVEDAD!', bg: 'bg-purple-600 text-white' },
  };

  const currentBadge = badgeConfig[currentPost.mediaType] || badgeConfig.preventa;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  // Efecto para el cambio automático cada 5 segundos
  useEffect(() => {
    if (posts.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length, isPaused]);

  return (
    <div 
      className="flex w-full flex-col items-center justify-center lg:justify-end"
      onMouseEnter={() => setIsPaused(true)}  // Pausa cuando el usuario pasa el mouse
      onMouseLeave={() => setIsPaused(false)} // Reanuda cuando el usuario saca el mouse
    >
      {/* Contenedor de la Tarjeta */}
      <div className="relative w-full max-w-105 overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 transition-all duration-300">
        
        {/* Cabecera estilo Instagram */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5 overflow-hidden">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white overflow-hidden">
                <img 
                  src={enterGameLogo} 
                  alt="EnterGame Logo" 
                  className="h-full w-full object-cover" 
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">entergame_ok</p>
              <p className="text-[10px] text-gray-500">Instagram Feed</p>
            </div>
          </div>
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm ${currentBadge.bg} animate-pulse`}>
            {currentBadge.text}
          </span>
        </div>

        {/* Imagen del post con enlace */}
        <a 
          href={currentPost.permalink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="relative block aspect-square w-full bg-gray-900 overflow-hidden group"
        >
          <img 
            src={currentPost.imageUrl} 
            alt="Publicación de EnterGame" 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-6">
            <span className="w-full rounded-xl bg-white/25 backdrop-blur-md py-2.5 text-center text-xs font-bold text-white shadow-lg border border-white/20">
              Ver publicación en Instagram ↗
            </span>
          </div>
        </a>

        {/* Pie de tarjeta y Botón */}
        <div className="p-4 bg-white">
          <p className="mb-3 text-xs font-medium text-gray-700 line-clamp-2 min-h-8">
            {currentPost.caption}
          </p>
          <a
            href={currentPost.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 py-3 text-center text-xs font-bold text-white shadow-md transition-all hover:opacity-95"
          >
            Ir al post de Instagram 🚀
          </a>
        </div>
      </div>

      {/* Controles del Carrusel (También sirven para cambiar manualmente) */}
      {posts.length > 1 && (
        <div className="mt-4 flex items-center gap-4">
          <button 
            onClick={handlePrev}
            className="rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-md border border-gray-200 transition-all hover:bg-gray-100"
          >
            ← Anterior
          </button>
          <span className="text-xs font-bold text-white">
            {currentIndex + 1} / {posts.length}
          </span>
          <button 
            onClick={handleNext}
            className="rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-md border border-gray-200 transition-all hover:bg-gray-100"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default InstagramCarousel;