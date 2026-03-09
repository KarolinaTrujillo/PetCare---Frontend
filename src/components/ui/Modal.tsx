"use client";

import { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenedor del modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10 animate-fadeIn">

        {/* Header */}
        {title && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              {title}
            </h2>
          </div>
        )}

        {/* Contenido */}
        <div>
          {children}
        </div>

      </div>

    </div>
  );
}