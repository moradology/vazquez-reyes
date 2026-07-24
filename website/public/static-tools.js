(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let pendingSlideObserver;

  function currentSlideIndex(slides) {
    return slides.reduce(
      (best, slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().top);
        return distance < best.distance ? { distance, index } : best;
      },
      { distance: Number.POSITIVE_INFINITY, index: 0 },
    ).index;
  }

  function showSlide(index) {
    const deck = document.querySelector("[data-presentation]");
    if (!deck) return;
    const total = Number(deck.dataset.slideTotal) || 1;
    const bounded = Math.max(0, Math.min(total - 1, index));
    const id = `slide-${String(bounded + 1).padStart(2, "0")}`;

    function scrollToTarget() {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      return true;
    }

    pendingSlideObserver?.disconnect();
    pendingSlideObserver = undefined;
    if (scrollToTarget()) return;

    pendingSlideObserver = new MutationObserver(() => {
      if (scrollToTarget()) {
        pendingSlideObserver?.disconnect();
        pendingSlideObserver = undefined;
      }
    });
    pendingSlideObserver.observe(deck, { childList: true, subtree: true });
  }

  // These delegated presentation controls are installed before the body is
  // parsed on the static site. They therefore work while images, fonts, and
  // the rest of the deck are still loading.
  document.addEventListener("keydown", (event) => {
    const deck = document.querySelector("[data-presentation]");
    const slides = [...document.querySelectorAll("[data-slide]")];
    if (!deck || slides.length === 0) return;

    const target = event.target;
    if (
      target instanceof HTMLElement &&
      (target.matches("input, textarea, select, button, a") ||
        target.isContentEditable)
    ) {
      return;
    }

    const current = currentSlideIndex(slides);
    if (
      event.key === "ArrowRight" ||
      event.key === "PageDown" ||
      event.key === " "
    ) {
      event.preventDefault();
      showSlide(current + 1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      showSlide(current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(Number(deck.dataset.slideTotal) - 1);
    }
  });

  document.addEventListener("click", async (event) => {
    const fullscreenButton =
      event.target instanceof Element
        ? event.target.closest("[data-presentation-fullscreen]")
        : null;
    if (!fullscreenButton) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.requestFullscreen();
    } catch {
      fullscreenButton.textContent = "Full screen unavailable";
    }
  });

  document.addEventListener("fullscreenchange", () => {
    const fullscreenButton = document.querySelector(
      "[data-presentation-fullscreen]",
    );
    if (fullscreenButton) {
      fullscreenButton.textContent = document.fullscreenElement
        ? "Exit full screen"
        : "Present full screen";
    }
  });

  function initializePageTools() {
    const buttons = [...document.querySelectorAll(".research-tools button")];
    const scaleButtons = buttons.slice(0, 3);
    const printButton = buttons[3];
    const timeline = document.querySelector(".timeline-explorer");

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

    if (timeline) {
      const branchButtons = [
        ...timeline.querySelectorAll("[data-timeline-branch-filter]"),
      ];
      const scopeButtons = [
        ...timeline.querySelectorAll("[data-timeline-scope-filter]"),
      ];
      const personSelect = timeline.querySelector(
        "[data-timeline-person-filter]",
      );
      const rows = [...timeline.querySelectorAll("[data-timeline-event]")];
      const placeRows = [
        ...timeline.querySelectorAll("[data-timeline-place-image]"),
      ];
      const count = timeline.querySelector("[data-timeline-count]");
      const empty = timeline.querySelector("[data-timeline-empty]");
      let branch =
        branchButtons.find(
          (button) => button.getAttribute("aria-pressed") === "true",
        )?.dataset.timelineBranchFilter ?? "all";
      let scope =
        scopeButtons.find(
          (button) => button.getAttribute("aria-pressed") === "true",
        )?.dataset.timelineScopeFilter ?? "direct";

      function branchMatches(value) {
        return branch === "all" || value === "both" || value === branch;
      }

      function applyTimelineFilters() {
        const selectedPerson = personSelect?.value ?? "all";
        let visible = 0;

        for (const row of rows) {
          const people = (row.dataset.timelinePeople ?? "").split(" ");
          const show =
            branchMatches(row.dataset.timelineBranch) &&
            (scope === "all" || row.dataset.timelineDirect === "true") &&
            (selectedPerson === "all" || people.includes(selectedPerson));
          row.hidden = !show;
          if (show) visible += 1;
        }
        for (const row of placeRows) {
          row.hidden = selectedPerson !== "all";
        }

        if (personSelect) {
          for (const option of [...personSelect.options].slice(1)) {
            option.hidden =
              !branchMatches(option.dataset.timelineBranch) ||
              (scope === "direct" &&
                option.dataset.timelineDirect !== "true");
          }
          if (personSelect.selectedOptions[0]?.hidden) {
            personSelect.value = "all";
            applyTimelineFilters();
            return;
          }
        }

        if (count) {
          count.innerHTML = `Showing <strong>${visible}</strong> ${
            visible === 1 ? "event" : "events"
          }, earliest to latest`;
        }
        if (empty) empty.hidden = visible > 0;
      }

      for (const button of branchButtons) {
        button.addEventListener("click", () => {
          branch = button.dataset.timelineBranchFilter;
          branchButtons.forEach((item) =>
            item.setAttribute("aria-pressed", String(item === button)),
          );
          applyTimelineFilters();
        });
      }
      for (const button of scopeButtons) {
        button.addEventListener("click", () => {
          scope = button.dataset.timelineScopeFilter;
          scopeButtons.forEach((item) =>
            item.setAttribute("aria-pressed", String(item === button)),
          );
          applyTimelineFilters();
        });
      }
      personSelect?.addEventListener("change", applyTimelineFilters);
      applyTimelineFilters();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePageTools, {
      once: true,
    });
  } else {
    initializePageTools();
  }
})();
