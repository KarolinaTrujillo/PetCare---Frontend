import React from "react";
import { ServiceDistributionUI } from "../model/metrics.ui.model";

interface ServicesDistributionProps {
  data: ServiceDistributionUI[];
  totalLabel: string;
}

function buildDonutSegments(
  data: ServiceDistributionUI[],
  cx: number,
  cy: number,
  r: number,
  strokeW: number
): { d: string; color: string; label: string; percentage: number }[] {
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return data.map((item) => {
    const dash = (item.percentage / 100) * circumference;
    const gap = circumference - dash;
    const rotation = (offset / 100) * 360 - 90;
    offset += item.percentage;

    return {
      d: `${dash} ${gap}`,
      color: item.color,
      label: item.label,
      percentage: item.percentage,
      rotation,
      dash,
      gap,
      circumference,
      cx,
      cy,
      r,
      strokeW,
    } as any;
  });
}

export default function ServicesDistribution({ data, totalLabel }: ServicesDistributionProps) {
  const cx = 90;
  const cy = 90;
  const r = 66;
  const strokeW = 22;
  const circumference = 2 * Math.PI * r;

  let cumulativePercent = 0;

  return (
    <div
      style={{
        width: "280px",
        flexShrink: 0,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "24px 28px",
      }}
    >
      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1F2937", marginBottom: "24px" }}>
        Distribución de Servicios
      </h3>

      {/* Donut */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ position: "relative", width: "180px", height: "180px" }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* Base ring */}
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="#F3F4F6"
              strokeWidth={strokeW}
            />
            {/* Segments */}
            {data.map((item, i) => {
              const dash = (item.percentage / 100) * circumference;
              const gap = circumference - dash;
              const rotation = (cumulativePercent / 100) * 360 - 90;
              cumulativePercent += item.percentage;

              return (
                <circle
                  key={i}
                  cx={cx} cy={cy} r={r}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={strokeW}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={0}
                  strokeLinecap="butt"
                  transform={`rotate(${rotation} ${cx} ${cy})`}
                />
              );
            })}
          </svg>

          {/* Center label */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#1F2937", lineHeight: 1 }}>
              {totalLabel}
            </p>
            <p style={{ fontSize: "10px", color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.06em", marginTop: "2px" }}>
              SERVICIOS
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  backgroundColor: item.color, flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "13px", color: "#6B7280" }}>{item.label}</span>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1F2937" }}>
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}