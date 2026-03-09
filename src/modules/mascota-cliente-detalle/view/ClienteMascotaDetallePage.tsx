"use client";

import React from "react";
import { useClienteMascotaDetalleViewModel } from "../viewmodel/useClienteMascotaDetalleViewModel";
import MascotaDetalleHeader from "./MascotaDetalleHeader";
import MascotaTabs from "./MascotaTabs";
import HistorialTab from "./HistorialTab";
import CartillaVacunacionTab from "./CartillaVacunacionTab";

// ─── Colors ───────────────────────────────────────────────────────────────────
const green = "#4F8A7C";
const white = "#FFFFFF";
const bg = "#F7F9FB";
const textMain = "#1F2937";
const textSub = "#6B7280";
const border = "#E5E7EB";

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F7F9FB]">
      <div className="w-9 h-9 border-4 border-gray-200 border-t-[#4F8A7C] rounded-full animate-spin" />
    </div>
  );
}

// ─── Sidebar icons ────────────────────────────────────────────────────────────
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

const NAV_ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
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
  citas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
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
  { label: "Panel principal", key: "dashboard" },
  { label: "Mis mascotas", key: "mascotas", active: true },
  { label: "Citas", key: "citas" },
  { label: "Configuración", key: "configuracion" },
];

function Sidebar() {
  return (
    <aside
      style={{
        width: "190px",
        minHeight: "100vh",
        backgroundColor: white,
        borderRight: `1px solid ${border}`,
        padding: "20px 12px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "32px",
          padding: "0 8px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "10px",
            backgroundColor: green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PawIcon />
        </div>
        <span style={{ fontSize: "17px", fontWeight: 700, color: textMain }}>PetCare</span>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: item.active ? green : "transparent",
              color: item.active ? white : textSub,
              fontSize: "13px",
              fontWeight: item.active ? 600 : 400,
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

// ─── Back arrow icon ─────────────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
interface ClienteMascotaDetallePageProps {
  mascotaId: string;
}

export function ClienteMascotaDetallePage({ mascotaId }: ClienteMascotaDetallePageProps) {
  const {
    mascota,
    historial,
    vacunas,
    isLoading,
    isLoadingVacunas,
    error,
    tabActivo,
    setTabActivo,
  } = useClienteMascotaDetalleViewModel(mascotaId);

  if (isLoading) return <Spinner />;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: bg,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <Sidebar />

      <main style={{ flex: 1, minWidth: 0, padding: "32px" }}>
        {/* Page title + breadcrumb */}
        <div className="flex items-center gap-3 mb-6">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeftIcon />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Perfil de Mascota</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Mis mascotas{" "}
              <span className="text-[#4F8A7C] font-medium">
                / {mascota?.nombre ?? ""}
              </span>
            </p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        <div style={{ maxWidth: "860px" }}>
          {/* Header card */}
          {mascota && <MascotaDetalleHeader mascota={mascota} />}

          {/* Tabs */}
          <MascotaTabs tabActivo={tabActivo} onTabChange={setTabActivo} />

          {/* Tab content */}
          {tabActivo === "historial" && <HistorialTab historial={historial} />}
          {tabActivo === "vacunas" && (
            <CartillaVacunacionTab
              vacunas={vacunas}
              isLoadingVacunas={isLoadingVacunas}
            />
          )}
        </div>
      </main>
    </div>
  );
}
