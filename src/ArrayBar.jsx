import React from "react";

export default function ArrayBar({ value, color, size }) {
  // Dynamic bar width
  const barWidth = Math.max(10, 500 / size);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 2px",
      }}
    >
      {/* Bar */}
      <div
        style={{
          width: `${barWidth}px`,
          height: `${value * 3}px`,
          backgroundColor: color,
          borderRadius: "3px",
        }}
      />
      {/* Value shown under bar */}
      <span style={{ fontSize: "10px", marginTop: "2px" }}>{value}</span>
    </div>
  );
}
