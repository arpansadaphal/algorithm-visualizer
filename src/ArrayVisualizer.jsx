import React from "react";
import ArrayBar from "./ArrayBar";

export default function ArrayVisualizer({ array }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", height: "300px", marginTop: "20px" }}>
      {array.map((item, idx) => (
        <ArrayBar key={idx} value={item.value} state={item.state} />
      ))}
    </div>
  );
}
