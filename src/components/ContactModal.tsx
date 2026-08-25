import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { createPortal } from "react-dom";

// VALORES DE LA CUENTA DE EMAILJS 
const YOUR_SERVICE_ID = "service_b19m4ps";
const YOUR_TEMPLATE_ID = "template_tikxykq";
const YOUR_PUBLIC_KEY = "Vh0IbO4_3AIDfjE5o";

// Tipamos las props del Modal
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Tipamos la estructura de los datos del formulario
interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  motivo: string;
  servicio: string;
  mensaje: string;
  pais: string;
  trampa_bots: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "Consulta",
    servicio: "Landing Page",
    mensaje: "",
    pais: "Cargando...",
    trampa_bots: "",
  });

  const [errors, setErrors] = useState<{ email?: string | null }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Detectar país mediante la API ipwhois[cite: 3]
  useEffect(() => {
    if (isOpen && formData.pais === "Cargando...") {
      fetch("https://ipwhois.app/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) throw new Error("Fallo API");
          setFormData((prev) => ({
            ...prev,
            pais: `${data.country} (${data.country_code})`,
          }));
        })
        .catch(() => {
          setFormData((prev) => ({ ...prev, pais: "Ubicación no disponible" }));
        });
    }
  }, [isOpen, formData.pais]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Tipamos el evento genérico para inputs, selects y textareas
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email" && errors.email) {
      setErrors({ ...errors, email: null });
    }
  };

  // Tipamos el evento de envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.trampa_bots) {
      console.log("Bot detectado.");
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 4000);
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Por favor, ingresa un email válido." });
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.nombre,
      from_email: formData.email,
      phone: formData.telefono,
      subject: formData.motivo,
      service_type: formData.servicio,
      message: formData.mensaje,
      country: formData.pais,
    };

    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, YOUR_PUBLIC_KEY)
      .then((response) => {
        console.log("ÉXITO!", response.status, response.text);
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFormData((prev) => ({
            ...prev,
            mensaje: "",
            nombre: "",
            email: "",
            telefono: "",
            trampa_bots: "",
          }));
        }, 3000);
      })
      .catch((err) => {
        console.error("FALLÓ...", err);
        setIsSubmitting(false);
        alert(
          "Hubo un error al enviar el mensaje. Por favor intenta nuevamente."
        );
      });
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm 
      ${isOpen ? "overlay-animation" : "overlay-out"}`}
    >
      <div
        className={`relative w-full max-w-2xl bg-[#0A0A0F] border border-brand-purple/30 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col max-h-[85vh] 
        ${isOpen ? "modal-animation" : "modal-out"}`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-brand-cyan via-brand-purple to-brand-green"></div>

        <div className="flex justify-between items-center p-5 border-b border-white/10 bg-white/5 shrink-0">
          <h2 className="text-2xl font-bold text-white">
            Iniciar <span className="text-brand-cyan">Contacto</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-all"
          >
            ✕
          </button>
        </div>

        {/* --- CANALES DE CONTACTO --- */}
        <div className="md:col-span-2 pb-3 bg-linear-to-b from-brand-purple/70 to-brand-cyan/70 text-center">
          <p className="text-xs text-gray-400 mb-2 font-mono">
            Nuestros canales de contacto:
          </p>
          <div className="flex justify-center gap-6">
            {/* Instagram */}
            <a
              href="https://instagram.com/entercode_ok"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-400/20 hover:border-pink-400 hover:text-pink-400 hover:scale-110 transition-all duration-300 group"
              title="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Mail */}
            <a
              href="mailto:entercode.contacto@gmail.com"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-cyan/20 hover:border-brand-cyan hover:text-brand-cyan hover:scale-110 transition-all duration-300 group"
              title="Enviar Email"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/entercode_ok"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#229ED9]/20 hover:border-[#229ED9] hover:text-[#229ED9] hover:scale-110 transition-all duration-300 group"
              title="Telegram"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>

        {/* --- FORMULARIO DE CONTACTO --- */}
        <div className="p-6 overflow-y-auto custom-scrollbar font-mono">
          <p className="text-xs text-center text-gray-400 mb-4 font-mono">
            O completa el siguiente formulario y nos pondremos en contacto:
          </p>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center border border-brand-green">
                <svg
                  className="w-8 h-8 text-brand-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">
                ¡Mensaje Transmitido!
              </h3>
              <p className="text-gray-400">
                El equipo de EnterCode ha recibido tu señal.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="text"
                name="trampa_bots"
                value={formData.trampa_bots}
                onChange={handleChange}
                style={{ display: "none" }}
                autoComplete="off"
              />

              <div className="space-y-2">
                <label className="text-xs text-brand-cyan uppercase tracking-wider">
                  Nombre/Empresa
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all placeholder:text-gray-600"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-brand-cyan uppercase tracking-wider">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all placeholder:text-gray-600"
                  placeholder="+549 11..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-brand-cyan uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-900/50 border rounded-lg p-3 text-white focus:ring-1 outline-none transition-all placeholder:text-gray-600 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-700 focus:border-brand-purple focus:ring-brand-purple"
                  }`}
                  placeholder="juan@email.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs text-brand-cyan uppercase tracking-wider">
                  Motivo
                </label>
                <div className="relative">
                  <select
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-purple outline-none appearance-none cursor-pointer"
                  >
                    <option className="bg-[#0A0A0F]">Consulta</option>
                    <option className="bg-[#0A0A0F]">Presupuesto</option>
                    <option className="bg-[#0A0A0F]">Contratar Servicio</option>
                    <option className="bg-[#0A0A0F]">Otro</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-purple">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-brand-cyan uppercase tracking-wider">
                  Servicio
                </label>
                <div className="relative">
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-purple outline-none appearance-none cursor-pointer"
                  >
                    <option className="bg-[#0A0A0F]">Landing Page</option>
                    <option className="bg-[#0A0A0F]">Aplicación Web</option>
                    <option className="bg-[#0A0A0F]">Página Empresarial</option>
                    <option className="bg-[#0A0A0F]">Menú Digital</option>
                    <option className="bg-[#0A0A0F]">Mantenimiento</option>
                    <option className="bg-[#0A0A0F]">Diseño Web</option>
                    <option className="bg-[#0A0A0F]">Otro</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-purple">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-brand-cyan uppercase tracking-wider">
                  Datos Adicionales
                </label>
                <textarea
                  name="mensaje"
                  rows={3}
                  required
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all placeholder:text-gray-600 resize-none"
                  placeholder="Cuéntanos más..."
                />
              </div>

              <div className="hidden md:col-span-2 text-xs text-gray-500">
                <span className="text-brand-green">●</span> Origen detectado:{" "}
                {formData.pais}
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-brand-cyan to-brand-purple text-black font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting ? "Procesando..." : "ENVIAR MENSAJE"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;