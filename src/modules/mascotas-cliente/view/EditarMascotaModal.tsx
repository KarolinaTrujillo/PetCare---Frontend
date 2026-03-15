import React from "react";

interface EditarMascotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuardar: () => void;
  editNombre: string;
  setEditNombre: (nombre: string) => void;
  editRaza: string;
  setEditRaza: (raza: string) => void;
  editEspecie: "perro" | "gato";
  setEditEspecie: (specie: "perro" | "gato") => void;
}

export default function EditarMascotaModal({
  isOpen,
  onClose,
  onGuardar,
  editNombre,
  setEditNombre,
  editRaza,
  setEditRaza,
  editEspecie,
  setEditEspecie,
}: EditarMascotaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-2xl shadow-xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1F2937", marginBottom: "24px" }}>
          Editar mascota
        </h2>

        {/* ESPECIE */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "12px" }}>
            Especie
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            {/* PERRO */}
            <button
              onClick={() => setEditEspecie("perro")}
              style={{
                flex: 1,
                border: editEspecie === "perro" ? "2px solid #4F8A7C" : "2px solid #E5E7EB",
                borderRadius: "12px",
                padding: "16px",
                backgroundColor: editEspecie === "perro" ? "#E6F2EF" : "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              {editEspecie === "perro" && (
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#4F8A7C",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke={editEspecie === "perro" ? "#4F8A7C" : "#D1D5DB"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="32" cy="38" rx="18" ry="14" />
                <circle cx="32" cy="20" r="10" />
                <ellipse cx="20" cy="14" rx="5" ry="8" />
                <ellipse cx="44" cy="14" rx="5" ry="8" />
                <circle cx="28" cy="20" r="1.5" fill={editEspecie === "perro" ? "#4F8A7C" : "#D1D5DB"} stroke="none" />
                <circle cx="36" cy="20" r="1.5" fill={editEspecie === "perro" ? "#4F8A7C" : "#D1D5DB"} stroke="none" />
                <path d="M29 25 q3 3 6 0" />
              </svg>
              <span style={{ fontSize: "12px", fontWeight: 500, color: editEspecie === "perro" ? "#4F8A7C" : "#D1D5DB" }}>
                Perro
              </span>
            </button>

            {/* GATO */}
            <button
              onClick={() => setEditEspecie("gato")}
              style={{
                flex: 1,
                border: editEspecie === "gato" ? "2px solid #4F8A7C" : "2px solid #E5E7EB",
                borderRadius: "12px",
                padding: "16px",
                backgroundColor: editEspecie === "gato" ? "#E6F2EF" : "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              {editEspecie === "gato" && (
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#4F8A7C",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke={editEspecie === "gato" ? "#4F8A7C" : "#D1D5DB"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="32" cy="40" rx="16" ry="12" />
                <circle cx="32" cy="22" r="10" />
                <path d="M22 12 L18 4 L26 10" />
                <path d="M42 12 L46 4 L38 10" />
                <circle cx="28" cy="22" r="1.5" fill={editEspecie === "gato" ? "#4F8A7C" : "#D1D5DB"} stroke="none" />
                <circle cx="36" cy="22" r="1.5" fill={editEspecie === "gato" ? "#4F8A7C" : "#D1D5DB"} stroke="none" />
                <path d="M29 27 q3 2 6 0" />
              </svg>
              <span style={{ fontSize: "12px", fontWeight: 500, color: editEspecie === "gato" ? "#4F8A7C" : "#D1D5DB" }}>
                Gato
              </span>
            </button>
          </div>
        </div>

        {/* NOMBRE */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "8px" }}>
            Nombre
          </label>
          <input
            type="text"
            value={editNombre}
            onChange={(e) => setEditNombre(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "13px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* RAZA */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "8px" }}>
            Raza
          </label>
          <select
            value={editRaza}
            onChange={(e) => setEditRaza(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "13px",
              boxSizing: "border-box",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <option value="">Escoge una raza</option>
            <option value="Labrador">Labrador</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Persa">Persa</option>
            <option value="Siamés">Siamés</option>
          </select>
        </div>

        {/* BOTÓN */}
        <button
          onClick={onGuardar}
          style={{
            width: "100%",
            backgroundColor: "#4F8A7C",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3E6F63")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4F8A7C")}
        >
          Guardar cambios
        </button>

      </div>
    </div>
  );
}
