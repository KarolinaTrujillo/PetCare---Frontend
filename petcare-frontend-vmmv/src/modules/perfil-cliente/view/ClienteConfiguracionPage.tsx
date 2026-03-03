"use client";

import React from "react";
import { useClienteConfiguracionViewModel } from "@/modules/perfil-cliente/viewmodel/useClienteConfiguracionViewModel";
import ChangePasswordModal from "./ChangePasswordModal";

const C = {
  green: "#4F8A7C",
  greenDark: "#3E6F63",
  white: "#FFFFFF",
  bg: "#F7F9FB",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: C.bg }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "4px solid #E5E7EB",
          borderTop: `4px solid ${C.green}`,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ fontSize: "12px", fontWeight: 600, color: C.textSub }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "9px 13px",
          borderRadius: "8px",
          border: `1px solid ${focused ? C.green : C.border}`,
          fontSize: "14px",
          color: C.textMain,
          backgroundColor: C.white,
          outline: "none",
        }}
      />
    </div>
  );
}

export function ClienteConfiguracionPage() {
  const vm = useClienteConfiguracionViewModel();

  if (vm.loading) return <Spinner />;

  return (
    <div style={{ padding: "32px", backgroundColor: C.bg, minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: C.textMain }}>
          Configuración de Perfil
        </h1>
        <p style={{ fontSize: "13px", color: C.textSub }}>
          Gestiona tu información personal y preferencias de cuenta.
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          backgroundColor: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: "16px",
          padding: "28px 32px",
          maxWidth: "700px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
            marginBottom: "18px",
          }}
        >
          <FormInput
            label="Nombre completo"
            value={vm.form.nombreCompleto}
            onChange={(v) => vm.updateFormField("nombreCompleto", v)}
          />
          <FormInput
            label="Correo electrónico"
            value={vm.form.correoElectronico}
            onChange={(v) => vm.updateFormField("correoElectronico", v)}
            type="email"
          />
        </div>

        <div style={{ marginBottom: "28px" }}>
          <FormInput
            label="Teléfono"
            value={vm.form.telefono}
            onChange={(v) => vm.updateFormField("telefono", v)}
            type="tel"
          />
        </div>

        <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "24px" }} />

        <div style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: C.textMain, marginBottom: "12px" }}>
            Seguridad
          </h3>

          <button
            onClick={vm.abrirPasswordModal}
            style={{
              border: `1px solid ${C.border}`,
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "13px",
              cursor: "pointer",
              backgroundColor: C.white,
            }}
          >
            Cambiar contraseña
          </button>
        </div>

        {vm.savedOk && (
          <div
            style={{
              backgroundColor: "#E6F4F1",
              border: `1px solid ${C.green}`,
              borderRadius: "8px",
              padding: "10px 16px",
              fontSize: "13px",
              color: "#2F8F7A",
              marginBottom: "20px",
            }}
          >
            ✓ Cambios guardados correctamente.
          </div>
        )}

        {vm.error && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              padding: "10px 16px",
              fontSize: "13px",
              color: "#B91C1C",
              marginBottom: "20px",
            }}
          >
            {vm.error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button onClick={vm.cancelarCambios}>Cancelar</button>
          <button onClick={vm.guardarCambios} disabled={vm.saving}>
            {vm.saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={vm.isPasswordModalOpen}
        onClose={vm.cerrarPasswordModal}
        onSubmit={vm.cambiarPassword}
        loading={vm.passwordLoading}
        error={vm.passwordError}
      />
    </div>
  );
}