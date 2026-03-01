"use client";

import React from "react";
import { useClienteDashboardViewModel } from "@/modules/dashboard-cliente/viewmodel/useClienteDashboardViewModel";
import DashboardHeader from "./DashboardHeader";
import PetCard from "./PetCard";
import AppointmentCard from "./AppointmentCard";

const C = {
  green: "#5BAA9C",
  greenLight: "#E6F4F1",
  white: "#FFFFFF",
  bg: "#F7F9F8",
  textMain: "#1F2937",
  textSub: "#6B7280",
  border: "#E5E7EB",
};

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: C.bg }}>
      <div style={{ width: "38px", height: "38px", border: "4px solid #E5E7EB", borderTop: `4px solid ${C.green}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── Sidebar icons ────────────────────────────────────────────────────────────
const NAV_ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  citas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
    </svg>
  ),
  mascotas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="16" rx="5" ry="4" />
      <circle cx="6" cy="10" r="2" />
      <circle cx="18" cy="10" r="2" />
      <circle cx="9" cy="7" r="2" />
      <circle cx="15" cy="7" r="2" />
    </svg>
  ),
  configuracion: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { label: "Panel principal", key: "dashboard", active: true },
  { label: "Mis Citas",       key: "citas" },
  { label: "Mis mascotas",    key: "mascotas" },
  { label: "Configuración",   key: "configuracion" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function PawIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="16" rx="5" ry="4" fill="#fff" />
      <circle cx="6" cy="10" r="2" fill="#fff" />
      <circle cx="18" cy="10" r="2" fill="#fff" />
      <circle cx="9" cy="7" r="2" fill="#fff" />
      <circle cx="15" cy="7" r="2" fill="#fff" />
    </svg>
  );
}

function Sidebar() {
  return (
    <aside
      style={{
        width: "190px", minHeight: "100vh",
        backgroundColor: C.white,
        borderRight: `1px solid ${C.border}`,
        padding: "20px 12px",
        display: "flex", flexDirection: "column", flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", padding: "0 8px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", backgroundColor: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PawIcon />
        </div>
        <span style={{ fontSize: "17px", fontWeight: 700, color: C.textMain }}>PetCare</span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.key}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 12px", borderRadius: "10px", cursor: "pointer",
              backgroundColor: item.active ? C.green : "transparent",
              color: item.active ? C.white : C.textSub,
              fontSize: "13px", fontWeight: item.active ? 600 : 400,
            }}
          >
            {NAV_ICONS[item.key]}
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ nombre, membresia, initials }: { nombre: string; membresia: string; initials: string }) {
  return (
    <div
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 32px",
        backgroundColor: C.white,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {/* Search */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          backgroundColor: "#F3F4F6", borderRadius: "10px",
          padding: "8px 14px", width: "280px",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Buscar mascotas o servicios..."
          style={{ border: "none", outline: "none", fontSize: "13px", color: C.textMain, backgroundColor: "transparent", width: "100%" }}
        />
      </div>

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: C.textMain }}>{nombre}</p>
          <p style={{ fontSize: "11px", color: C.textSub }}>{membresia}</p>
        </div>
        <div
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            backgroundColor: "#D4B896",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: 700, color: "#fff",
          }}
        >
          {initials}
        </div>
      </div>
    </div>
  );
}

// ─── Section title row ────────────────────────────────────────────────────────
function SectionRow({ title, action }: { title: string; action?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.textMain }}>{title}</h2>
      {action && (
        <span style={{ fontSize: "13px", color: C.green, fontWeight: 500, cursor: "pointer" }}>
          {action}
        </span>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ClienteDashboardPage() {
  const { data, loading, error } = useClienteDashboardViewModel();

  if (loading) return <Spinner />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: C.bg, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Navbar */}
        {data && (
          <Navbar
            nombre={data.usuarioNombre}
            membresia={data.usuarioMembresia}
            initials={data.usuarioInitials}
          />
        )}

        {/* Content */}
        <div style={{ padding: "32px" }}>

          {/* Error */}
          {error && (
            <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color: "#B91C1C", marginBottom: "24px" }}>
              {error}
            </div>
          )}

          {data && (
            <>
              {/* Action buttons */}
              <DashboardHeader />

              {/* Main grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>

                {/* LEFT — Mis Mascotas */}
                <div>
                  <SectionRow title="Mis Mascotas" action="Ver todas" />
                  <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {data.mascotas.map((pet) => (
                      <PetCard key={pet.id} pet={pet} />
                    ))}
                  </div>
                </div>

                {/* RIGHT — Próximas Citas */}
                <div
                  style={{
                    backgroundColor: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <SectionRow title="Próximas Citas" action="Calendario" />

                  {data.proximasCitas.map((apt, i) => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      isLast={i === data.proximasCitas.length - 1}
                    />
                  ))}

                  {/* CTA */}
                  <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <p style={{ fontSize: "12px", color: C.textSub, marginBottom: "6px" }}>
                      ¿Necesitas una nueva cita?
                    </p>
                    <button
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "13px", fontWeight: 700, color: C.green,
                        display: "flex", alignItems: "center", gap: "4px",
                        margin: "0 auto",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Agendar cita nueva
                    </button>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}