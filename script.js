
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;

  const themeToggle = document.getElementById("themeToggle");
  const viewToggle = document.getElementById("viewToggle");
  const backToTop = document.getElementById("backToTop");
  const worldClocks = document.getElementById("worldClocks");
  const worldCount = document.getElementById("worldCount");

  // 20 cities, each with its own time zone.
  const cities = [
    { city: "London", country: "United Kingdom", flag: "🇬🇧", zone: "Europe/London" },
    { city: "Paris", country: "France", flag: "🇫🇷", zone: "Europe/Paris" },
    { city: "Berlin", country: "Germany", flag: "🇩🇪", zone: "Europe/Berlin" },
    { city: "Moscow", country: "Russia", flag: "🇷🇺", zone: "Europe/Moscow" },
    { city: "Istanbul", country: "Türkiye", flag: "🇹🇷", zone: "Europe/Istanbul" },
    { city: "Dubai", country: "UAE", flag: "🇦🇪", zone: "Asia/Dubai" },
    { city: "Karachi", country: "Pakistan", flag: "🇵🇰", zone: "Asia/Karachi" },
    { city: "New Delhi", country: "India", flag: "🇮🇳", zone: "Asia/Kolkata" },
    { city: "Dhaka", country: "Bangladesh", flag: "🇧🇩", zone: "Asia/Dhaka" },
    { city: "Bangkok", country: "Thailand", flag: "🇹🇭", zone: "Asia/Bangkok" },
    { city: "Singapore", country: "Singapore", flag: "🇸🇬", zone: "Asia/Singapore" },
    { city: "Hong Kong", country: "China", flag: "🇭🇰", zone: "Asia/Hong_Kong" },
    { city: "Tokyo", country: "Japan", flag: "🇯🇵", zone: "Asia/Tokyo" },
    { city: "Seoul", country: "South Korea", flag: "🇰🇷", zone: "Asia/Seoul" },
    { city: "Sydney", country: "Australia", flag: "🇦🇺", zone: "Australia/Sydney" },
    { city: "Auckland", country: "New Zealand", flag: "🇳🇿", zone: "Pacific/Auckland" },
    { city: "Honolulu", country: "Hawaii, USA", flag: "🇺🇸", zone: "Pacific/Honolulu" },
    { city: "Los Angeles", country: "USA", flag: "🇺🇸", zone: "America/Los_Angeles" },
    { city: "New York", country: "USA", flag: "🇺🇸", zone: "America/New_York" },
    { city: "São Paulo", country: "Brazil", flag: "🇧🇷", zone: "America/Sao_Paulo" }
  ];

  // =========================
  // SAFE SETTINGS STORAGE
  // =========================

  function readSetting(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function saveSetting(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The site still works if storage is unavailable.
    }
  }

  // =========================
  // DARK / LIGHT MODE
  // =========================

  function applyTheme(theme) {
    const selected = theme === "light" ? "light" : "dark";

    root.setAttribute("data-theme", selected);

    themeToggle.textContent =
      selected === "dark" ? "☀️ Light mode" : "🌙 Dark mode";

    themeToggle.setAttribute(
      "aria-label",
      selected === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    saveSetting("unhinged-theme", selected);
  }

  applyTheme(readSetting("unhinged-theme"));

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
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

    saveSetting("unhinged-compact", String(compact));
  }

  applyView(readSetting("unhinged-compact") === "true");

  viewToggle.addEventListener("click", () => {
    applyView(!body.classList.contains("compact"));
  });

  // =========================
  // WORLD CLOCK CREATION
  // =========================

  const clockElements = [];

  function createWorldClocks() {
    worldClocks.replaceChildren();
    worldCount.textContent = `${cities.length} CITIES`;

    cities.forEach((city, index) => {
      const card = document.createElement("article");
      card.className = "clock-card";

      const top = document.createElement("div");
      top.className = "clock-card-top";

      const flag = document.createElement("span");
      flag.className = "city-flag";
      flag.textContent = city.flag;
      flag.setAttribute("aria-hidden", "true");

      const identity = document.createElement("div");

      const name = document.createElement("h3");
      name.className = "city-name";
      name.textContent = city.city;

      const region = document.createElement("p");
      region.className = "city-region";
      region.textContent = city.country;

      identity.append(name, region);
      top.append(flag, identity);

      const time = document.createElement("div");
      time.className = "city-time";
      time.setAttribute("aria-label", `${city.city} local time`);
      time.textContent = "--:--:--";

      const date = document.createElement("p");
      date.className = "city-date";
      date.textContent = "Loading date…";

      const day = document.createElement("p");
      day.className = "city-day";
      day.textContent = "Loading weekday…";

      card.append(top, time, date, day);
      worldClocks.appendChild(card);

      clockElements.push({ city, time, date, day });

      // Prepare formatters once for each clock.
      try {
        clockElements[index].timeFormatter = new Intl.DateTimeFormat(
          "en-GB",
          {
            timeZone: city.zone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          }
        );

        clockElements[index].dateFormatter = new Intl.DateTimeFormat(
          "en-GB",
          {
            timeZone: city.zone,
            day: "numeric",
            month: "short",
            year: "numeric"
          }
        );

        clockElements[index].dayFormatter = new Intl.DateTimeFormat(
          "en-GB",
          {
            timeZone: city.zone,
            weekday: "long"
          }
        );
      } catch (error) {
        time.textContent = "Unavailable";
        date.textContent = "Time zone error";
        day.textContent = city.zone;
      }
    });
  }

  // =========================
  // UPDATE ALL 20 CLOCKS
  // =========================

  function updateWorldClocks() {
    const now = new Date();

    clockElements.forEach((item) => {
      if (!item.timeFormatter) return;

      item.time.textContent = item.timeFormatter.format(now);
      item.date.textContent = item.dateFormatter.format(now);
      item.day.textContent = item.dayFormatter.format(now);
    });
  }

  createWorldClocks();
  updateWorldClocks();

  // Align updates to the next second for smoother ticking.
  function scheduleNextUpdate() {
    const delay = 1000 - (Date.now() % 1000);

    window.setTimeout(() => {
      updateWorldClocks();
      scheduleNextUpdate();
    }, delay);
  }

  scheduleNextUpdate();

  // Refresh after returning to the browser tab.
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      updateWorldClocks();
    }
  });

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
