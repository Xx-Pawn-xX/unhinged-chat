
"use strict";

/* =========================================
   UNHINGED CHAT — CHAOS CONTROL
   Vanilla JavaScript. No libraries required.
========================================= */

const CLUB_URL = "https://www.chess.com/club/unhinged-chat/";
const FORUM_URL = "https://www.chess.com/clubs/forum/unhinged-chat/";
const MEMBERS_URL = "https://www.chess.com/clubs/members/unhinged-chat/";
const ABOUT_URL = "https://www.chess.com/clubs/about/unhinged-chat/";

const INVITE_URL =
  "https://www.chess.com/club/unhinged-chat/join?utm_campaign=club_invite_link&utm_source=chesscom&utm_medium=copy";

// These links are also declared in index.html for navigation.
// Keeping the URLs here makes them easy to update later.
const LINKS = {
  club: CLUB_URL,
  forums: FORUM_URL,
  members: MEMBERS_URL,
  about: ABOUT_URL
};
/* =========================================
   ELEMENTS
========================================= */

const $ = (selector) => document.querySelector(selector);

const quoteText = $("#quoteText");
const questionText = $("#questionText");
const clockElement = $("#clock");
const dateElement = $("#dateDay");
const toastElement = $("#toast");

let lastQuoteIndex = -1;
let lastQuestionIndex = -1;
let lastChaosIndex = -1;
let toastTimer = null;
let chaosTimer = null;

/* =========================================
   HELPERS
========================================= */

function randomIndex(length, previousIndex) {
  if (length <= 1) return 0;

  let index;

  do {
    index = Math.floor(Math.random() * length);
  } while (index === previousIndex);

  return index;
}

function showToast(message) {
  if (!toastElement) return;

  toastElement.textContent = message;
  toastElement.classList.add("visible");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toastElement.classList.remove("visible");
  }, 2300);
}


/* =========================================
   COPY TO CLIPBOARD
========================================= */

async function copyText(text, successMessage) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for browsers where Clipboard API is unavailable.
      const textarea = document.createElement("textarea");

      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";

      document.body.appendChild(textarea);
      textarea.select();

      const copied = document.execCommand("copy");
      textarea.remove();

      if (!copied) {
        throw new Error("Copy command was unsuccessful.");
      }
    }

    showToast(successMessage);
  } catch (error) {
    console.error("Clipboard error:", error);
    showToast("Copy failed. Please copy the link or text manually.");
  }
}

$("#copyInvite").addEventListener("click", () => {
  copyText(INVITE_URL, "Club invitation link copied! ♟");
});

$("#copyQuestion").addEventListener("click", () => {
  copyText(questionText.textContent.trim(), "Question copied!");
});

/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle = $("#themeToggle");
const themeIcon = $("#themeIcon");

function applyTheme(theme, announce = false) {
  const isLight = theme === "light";

  document.body.classList.toggle("light", isLight);
  themeIcon.textContent = isLight ? "☾" : "☼";

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );

  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isLight ? "#f2f6fd" : "#080d1b");

  try {
    localStorage.setItem("unhinged-theme", theme);
  } catch {
    // The theme still works if local storage is unavailable.
  }

  if (announce) {
    showToast(isLight ? "Light mode activated ☀" : "Dark mode activated 🌙");
  }
}

let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("unhinged-theme") || "dark";
} catch {
  // Use dark mode by default.
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light")
    ? "dark"
    : "light";

  applyTheme(nextTheme, true);
});

/* =========================================
   COMPACT / FULL DASHBOARD VIEW
========================================= */

const viewToggle = $("#viewToggle");

function applyView(compact, announce = false) {
  document.body.classList.toggle("compact", compact);

  viewToggle.textContent = compact
    ? "FULL VIEW ↗"
    : "COMPACT VIEW ↘";

  viewToggle.setAttribute(
    "aria-label",
    compact ? "Switch to full dashboard view" : "Switch to compact sidebar view"
  );

  try {
    localStorage.setItem("unhinged-view", compact ? "compact" : "full");
  } catch {
    // View switching still works without storage.
  }

  if (announce) {
    showToast(compact ? "Compact view activated." : "Full dashboard activated.");
  }
}

let savedView = "full";

try {
  savedView = localStorage.getItem("unhinged-view") || "full";
} catch {
  // Use full view by default.
}

applyView(savedView === "compact");

viewToggle.addEventListener("click", () => {
  const isCompact = !document.body.classList.contains("compact");
  applyView(isCompact, true);
});

/* =========================================
   LIVE CLOCK + DATE
========================================= */

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});

function updateDateTime() {
  const now = new Date();

  clockElement.textContent = timeFormatter.format(now);
  dateElement.textContent = dateFormatter.format(now);
}

updateDateTime();

// Update at least once per second.
setInterval(updateDateTime, 1000);

/* =========================================
   BACK TO TOP
========================================= */

$("#backToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================================
   INITIAL STATE
========================================= */

function initialiseDashboard() {
  // Show fresh content on each page load.
  generateQuote();
  generateQuestion();

  // Display a welcome toast only after a brief delay is not necessary;
  // keep the initial page clean and quiet.
}

initialiseDashboard();
