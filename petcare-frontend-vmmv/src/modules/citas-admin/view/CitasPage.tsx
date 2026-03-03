"use client";

import React from "react";
import { useCitasViewModel } from "@/modules/citas-admin/viewmodel/useCitasViewModel";
import CitasHeader from "./CitasHeader";
import CitasTable from "./CitasTable";

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", backgroundColor: "#F8FAF9",
      }}
    >
      <div
        style={{
          width: "40px", height: "40px",
          border: "4px solid #E5E7EB", borderTop: "4px solid #6BAF9F",
          borderRadius: "50%", animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Shared icons ─────────────────────────────────────────────────────────────
function PawIcon({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="16" rx="5" ry="4" fill={color} />
      <circle cx="6" cy="10" r="2" fill={color} />
      <circle cx="18" cy="10" r="2" fill={color} />
      <circle cx="9" cy="7" r="2" fill={color} />
      <circle cx="15" cy="7" r="2" fill={color} />
    </svg>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
type NavItemDef = { label: string; key: string; active?: boolean };

const navItems: NavItemDef[] = [
  { label: "Panel principal", key: "dashboard" },
  { label: "Clientes", key: "clients" },
  { label: "Citas", key: "appointments", active: true },
  { label: "Pacientes", key: "patients" },
  { label: "Registrar personal", key: "staff" },
  { label: "Analisis", key: "analytics" },
  { label: "Configuración", key: "settings" },
];

const navIcons: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  clients: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" />
    </svg>
  ),
  appointments: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  ),
  patients: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 14c-2 0-4-1.5-4-4 0-3 2-5 4-5s4 2 4 5c0 2.5-2 4-4 4z" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  staff: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
    </svg>
  ),
  analytics: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  settings: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
};

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px", minHeight: "100vh", backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB", borderRadius: "16px",
        padding: "24px 16px", display: "flex", flexDirection: "column", flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", padding: "0 8px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#6BAF9F", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PawIcon />
        </div>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#1F2937" }}>PetCare</span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map((item) => (
          <div
            key={item.key}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "10px", cursor: "pointer",
              backgroundColor: item.active ? "#6BAF9F" : "transparent",
              color: item.active ? "#FFFFFF" : "#6B7280",
              fontSize: "14px", fontWeight: item.active ? 600 : 400,
            }}
          >
            {navIcons[item.key]}
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 16px", width: "220px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <span style={{ color: "#9CA3AF", fontSize: "14px" }}>Buscar</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#1F2937" }}>Dr. Smith</p>
          <p style={{ fontSize: "12px", color: "#6B7280" }}>Veterinary Surgeon</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CitasPage() {
  const { filteredCitas, searchTerm, setSearchTerm, loading } = useCitasViewModel();

  if (loading) return <Spinner />;

  return (
    <div
      style={{
        backgroundColor: "#F8FAF9", minHeight: "100vh", padding: "24px",
        display: "flex", gap: "24px",
        fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <Navbar />
        <CitasHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CitasTable citas={filteredCitas} />
      </div>
    </div>
  );
}