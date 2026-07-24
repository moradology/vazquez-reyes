(() => {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll(".research-tools button")];
  const scaleButtons = buttons.slice(0, 3);
  const printButton = buttons[3];

  function applyScale(value) {
    if (value === "0") delete root.dataset.scale;
    else root.dataset.scale = value;
    scaleButtons.forEach((button, index) => {
      button.setAttribute("aria-pressed", String(String(index) === value));
    });
    localStorage.setItem("vr-scale", value);
  }

  const saved = localStorage.getItem("vr-scale");
  applyScale(saved === "1" || saved === "2" ? saved : "0");
  scaleButtons.forEach((button, index) => {
    button.addEventListener("click", () => applyScale(String(index)));
  });
  printButton?.addEventListener("click", () => window.print());
})();
