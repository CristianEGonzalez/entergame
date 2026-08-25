import React from "react";

// Definimos los tipos de las propiedades (props) que recibe el botón
interface ButtonProps {
  nombre: string;
  link?: string; // El signo de interrogación indica que es opcional
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ nombre, link, onClick, className }) => {
  const buttonClasses = className ? className :
      `inline-block
      bg-linear-to-r from-brand-cyan to-brand-purple 
      font-orbitron text-black font-bold 
      py-2 lg:px-8 md:px-1 px-6 rounded-xl text-center 
      hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] 
      transition-all transform hover:scale-105
      cursor-pointer`;

  // CASO A: Es un Link externo o ancla
  if (link) {
    return (
      <a href={link} className={buttonClasses}>
        {nombre}
      </a>
    );
  }

  // Botón B: (para abrir modales, etc)
  return (
    <button onClick={onClick} className={buttonClasses}>
      {nombre}
    </button>
  );
};

export default Button;