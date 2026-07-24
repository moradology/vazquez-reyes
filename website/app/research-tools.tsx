"use client";

import { useEffect, useState } from "react";

export function ResearchTools() {
  const [scale, setScale] = useState("0");

  useEffect(() => {
    const saved = window.localStorage.getItem("vr-scale");
    if (saved === "1" || saved === "2") {
      setScale(saved);
      document.documentElement.dataset.scale = saved;
    }
  }, []);

  function applyScale(value: string) {
    setScale(value);
    if (value === "0") {
      delete document.documentElement.dataset.scale;
    } else {
      document.documentElement.dataset.scale = value;
    }
    window.localStorage.setItem("vr-scale", value);
  }

  return (
    <div className="research-tools" role="group" aria-label="Reading tools">
      {["0", "1", "2"].map((value, index) => (
        <button
          aria-pressed={scale === value}
          key={value}
          onClick={() => applyScale(value)}
          type="button"
        >
          A{index === 1 ? "+" : index === 2 ? "++" : ""}
        </button>
      ))}
      <button onClick={() => window.print()} type="button">
        Print
      </button>
    </div>
  );
}
