import React from "react";

export default function ArrayBar({ value, color }) {
  return (
    <div
      style={{
        margin: "0 2px",
        width: "25px",
        height: `${value * 3}px`,
        backgroundColor: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        color: "black",
        fontSize: "12px",
      }}
    >
      {value}
    </div>
  );
}
