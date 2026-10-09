
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;

  const themeToggle = document.getElementById("themeToggle");
  const viewToggle = document.getElementById("viewToggle");
  const backToTop = document.getElementById("backToTop");

  const clock = document.getElementById("clock");
  const date = document.getElementById("date");
  const day = document.getElementById("day");

  const TIME_ZONE = "Europe/Berlin";

  // Safely read saved settings.
  function readSetting(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  // Safely save settings.
  function saveSetting(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The dashboard still works if storage is unavailable.
    }
  }

  // =========================
  // DARK / LIGHT MODE
  // =========================

  function applyTheme(theme) {
    const selectedTheme = theme === "light" ? "light" : "dark";

    root.setAttribute("data-theme", selectedTheme);

    themeToggle.textContent =
      selectedTheme === "dark" ? "☀️ Light mode" : "🌙 Dark mode";

    themeToggle.setAttribute(
      "aria-label",
      selectedTheme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    saveSetting("unhinged-theme", selectedTheme);
  }

  const savedTheme = readSetting("unhinged-theme");
  applyTheme(savedTheme === "light" ? "light" : "dark");

  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // =========================
  // COMPACT / FULL VIEW
  // =========================

  function applyView(compact) {
    body.classList.toggle("compact", compact);

    viewToggle.textContent = compact ? "Full View" : "Compact View";

    viewToggle.setAttribute(
      "aria-label",
      compact ? "Switch to full view" : "Switch to compact view"
    );

    saveSetting("unhinged-compact", compact ? "true" : "false");
  }

  applyView(readSetting("unhinged-compact") === "true");

  viewToggle.addEventListener("click", () => {
    applyView(!body.classList.contains("compact"));
  });

  // =========================
  // LIVE CLOCK
  // =========================

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const dayFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "long"
  });

  function updateClockAndDate() {
    const now = new Date();

    clock.textContent = timeFormatter.format(now);
    date.textContent = dateFormatter.format(now);
    day.textContent = dayFormatter.format(now);
  }

  // Display immediately, then update every second.
  updateClockAndDate();
  window.setInterval(updateClockAndDate, 1000);

  // =========================
  // BACK TO TOP
  // =========================

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
