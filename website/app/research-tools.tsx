"use client";

import { useEffect, useSyncExternalStore } from "react";

const scaleEvent = "vr-scale-change";

function getScale() {
  const saved = window.localStorage.getItem("vr-scale");
  return saved === "1" || saved === "2" ? saved : "0";
}

function subscribeToScale(onStoreChange: () => void) {
  window.addEventListener(scaleEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(scaleEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function ResearchTools() {
  const scale = useSyncExternalStore(subscribeToScale, getScale, () => "0");

  useEffect(() => {
    if (scale === "0") {
      delete document.documentElement.dataset.scale;
    } else {
      document.documentElement.dataset.scale = scale;
    }
  }, [scale]);

  function applyScale(value: string) {
    window.localStorage.setItem("vr-scale", value);
    window.dispatchEvent(new Event(scaleEvent));
  }

  return (
    <details className="display-menu">
      <summary>Display</summary>
      <div className="research-tools" role="group" aria-label="Display options">
        <span>Text size</span>
        {["0", "1", "2"].map((value, index) => (
          <button
            aria-label={
              index === 0
                ? "Default text size"
                : index === 1
                  ? "Larger text"
                  : "Largest text"
            }
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
    </details>
  );
}
