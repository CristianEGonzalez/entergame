import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nombre: string;
  telefono: string;
  motivo: string;
  mensaje: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
  const WHATSAPP_CHANNEL_URL = import.meta.env.VITE_WHATSAPP_CHANNEL_URL;
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    telefono: "",
    motivo: "Comprar un juego",
    mensaje: "",
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [subscribe, setSubscribe] = useState<boolean>(true);
  
  // NUEVO ESTADO: Controla si el formulario ya se envió
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);
      setIsSubmitted(false); // Reiniciamos el estado al abrir
    } else {
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "telefono") {
      const soloNumeros = value.replace(/\D/g, ""); 
      setFormData({ ...formData, [name]: soloNumeros });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (subscribe) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          Fecha: new Date().toLocaleDateString("es-AR"),
          Nombre: formData.nombre,
          Telefono: "'" + formData.telefono,
          Motivo: formData.motivo,
          Mensaje: formData.mensaje,
        }),
      }).catch((err) => console.error("Error guardando lead:", err));
    }

    const text = `🎮 *Nueva Consulta - EnterGame*\n\n*Nombre:* ${formData.nombre}\n*Motivo:* ${formData.motivo}\n*Detalles:* ${formData.mensaje}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    
    // Abre WhatsApp en nueva pestaña
    window.open(url, "_blank");
    
    // EN LUGAR DE CERRAR, CAMBIAMOS LA VISTA AL CANAL
    setIsSubmitted(true);
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative w-full max-w-lg bg-white border-2 border-gray-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 transform ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Barra superior estilo Nintendo */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="w-1/2 h-full bg-cyan-500"></div>
          <div className="w-1/2 h-full bg-red-600"></div>
        </div>

        {/* Cabecera */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 mt-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {!isSubmitted ? (
              <>Contactar a <span className="text-red-600">EnterGame</span></>
            ) : (
              <span className="text-[#25D366]">¡Ya casi estamos!</span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 transition-colors text-xl font-bold p-2"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO DEL MODAL */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh]">
          
          {!isSubmitted ? (
            /* --- VISTA 1: FORMULARIO --- */
            <>
              <p className="text-sm text-gray-600 mb-6 font-medium">
                Completá los datos y te redirigiremos a WhatsApp para chatear directamente con nosotros.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Tu Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-400"
                      placeholder="Ej: Mario"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">WhatsApp</label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-400"
                      placeholder="Tu número"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">¿Qué necesitás?</label>
                  <div className="relative">
                    <select
                      name="motivo"
                      value={formData.motivo}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none appearance-none cursor-pointer font-medium"
                    >
                      <option>Comprar un juego</option>
                      <option>Vender mis juegos</option>
                      <option>Cotizar un canje</option>
                      <option>Otra consulta</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-red-600 text-xs">▼</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Juegos de interés / a entregar</label>
                  <textarea
                    name="mensaje"
                    rows={3}
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                    placeholder="Hola, quería saber si tienen el Zelda..."
                  />
                </div>

                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center h-5">
                    <input
                      id="subscribe"
                      type="checkbox"
                      checked={subscribe}
                      onChange={(e) => setSubscribe(e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded-sm focus:ring-red-500 focus:ring-2 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="subscribe" className="text-sm text-gray-600 cursor-pointer select-none">
                    Quiero recibir novedades y ofertas.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#25D366] text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-[#25D366]/30 hover:bg-[#1EBE57] transition-all transform hover:-translate-y-1 flex justify-center items-center gap-3"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Continuar en WhatsApp
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* --- VISTA 2: INVITACIÓN AL CANAL --- */
            <div className="flex flex-col items-center text-center py-6 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
                📢
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                ¡Recibí ofertas y novedades antes que nadie!
              </h3>
              <p className="text-gray-600 font-medium mb-8">
                Te responderemos a la brevedad. Mientras tanto, unite a nuestra comunidad oficial para enterarte de los nuevos ingresos y ofertas antes de que se publiquen.
              </p>
              
              <div className="w-full flex flex-col gap-3">
                <a
                  href={WHATSAPP_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                >
                  Recibir ofertas y novedades
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;