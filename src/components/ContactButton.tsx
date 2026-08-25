import React, { useState } from 'react';
import Button from './Button';
import ContactModal from './ContactModal';

// Definimos los tipos de las propiedades que recibe el componente
interface ContactButtonProps {
  nombre?: string;
  className?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ nombre = "Contactar", className }) => {
  // Tipamos el estado como un booleano
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {/* Button genérico */}
      <Button 
        nombre={nombre} 
        onClick={() => setIsModalOpen(true)} 
        className={className}
      />

      {/* Utilizamos el Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ContactButton;