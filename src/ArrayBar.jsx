import React from "react";

export default function ArrayBar({ value, color, size }) {
  // Use responsive width based on viewport and array size
  const barWidth = `clamp(8px, ${80 / size}vw, 30px)`;
  const barHeight = `clamp(20px, ${value * 0.5}vh, 250px)`; 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 1px",
      }}
    >
      {/* Bar */}
      <div
        style={{
          width: barWidth,
          height: barHeight,
          backgroundColor: color,
          borderRadius: "3px",
          transition: "all 0.2s ease", // smooth resize
        }}
      />
      {/* Value shown under bar */}
      <span
        style={{
          fontSize: "clamp(8px, 1.5vw, 12px)",
          marginTop: "2px",
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
}
