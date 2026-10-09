
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
   RANDOM CONTENT
========================================= */

const quotes = [
  "My last brain cell just blundered a rook.",
  "I came, I saw, I hung my queen.",
  "The voices said Nf3. I played Ke2.",
  "Trust the process. Distrust the processor.",
  "I have a plan. It is classified. Even from me.",
  "Chess is 10% skill and 90% wondering why you did that.",
  "My opponent is thinking. I am buffering.",
  "If confidence were ELO, I'd be a world champion.",
  "That wasn't a blunder. It was a donation.",
  "I sacrificed my queen for emotional damage.",
  "The position is equal. My mental stability isn't.",
  "I play 4D chess. Unfortunately, my opponent plays chess.",
  "Every move is theory if you forget the theory.",
  "I calculated 20 moves ahead and missed the first one.",
  "The king is safe. The king has been informed otherwise.",
  "I don't lose games. I create cautionary tales.",
  "A brilliant move, according to absolutely nobody.",
  "My opening repertoire is just vibes and panic.",
  "The board is 64 squares of personal betrayal.",
  "I am not tilted. The planet is simply misaligned.",
  "Checkmate is temporary. Posting about it is forever.",
  "My strategy is beyond your understanding. Mine too.",
  "I have achieved inner peace. Then I hung a bishop.",
  "This is fine. The evaluation bar disagrees."
];

const questions = [
  "Would you rather fight one horse-sized knight or eight pawn-sized rooks?",
  "What is the most suspicious move you can play on move one?",
  "If chess pieces had jobs, which piece would get fired first?",
  "Would you rather never blunder again or always find brilliant moves?",
  "What is your most unreasonable chess opinion?",
  "If your chess rating described your personality, what would it say?",
  "Which chess piece would be the worst roommate?",
  "Would you rather play without queens or without rooks?",
  "What is the funniest excuse for losing a completely winning position?",
  "If pawns could talk, what would they complain about?",
  "What opening sounds like a threat?",
  "Would you trust a chess engine that only speaks in riddles?",
  "What is the most chaotic legal chess move you can imagine?",
  "Which piece has the biggest ego?",
  "If your opponent offered a draw, what would your villain origin story be?",
  "What would be the worst name for a chess opening?",
  "Would you rather play 100 bullet games or one game lasting 10 hours?",
  "If the chessboard had a 65th square, what would be on it?",
  "What is a hill you are willing to die on in chess opinions?",
  "If you could ban one move from chess, what would it be?",
  "Which piece would win in a rap battle?",
  "Would you rather know every opening or never make a tactical mistake?",
  "What is the most cursed username you have ever seen?",
  "Explain your current mood using only chess notation.",
  "What would your autobiography be called if you were a chess piece?"
];

const chaosMessages = [
  ["Everything is under control.", "This message is legally not a guarantee."],
  ["The knight has escaped.", "Do not attempt to negotiate with the knight."],
  ["Brain cell disconnected.", "Please wait while we locate a replacement."],
  ["Opening theory deleted.", "You are now playing by ancient instinct."],
  ["The council has decided.", "Nobody knows who the council is."],
  ["Critical chaos detected.", "Remaining calm is no longer supported."],
  ["Reality has been recalculated.", "Your previous position may no longer exist."],
  ["A pawn has filed a complaint.", "The king has declined to comment."],
  ["System running on 1% logic.", "Please do not close this tab."],
  ["Grandmaster thoughts detected.", "They appear to belong to someone else."],
  ["The vibes are immaculate.", "The moves, however, are under investigation."],
  ["Unexpected plot twist.", "The plot has also lost track of itself."],
  ["The chessboard is judging you.", "It has seen every blunder."],
  ["Absolutely no thoughts.", "Just 64 squares and a dream."],
  ["The chaos is intentional.", "At least that is the official statement."],
  ["We have reached peak nonsense.", "Further nonsense remains possible."]
];

/* =========================================
   ELEMENTS
========================================= */

const $ = (selector) => document.querySelector(selector);

const quoteText = $("#quoteText");
const questionText = $("#questionText");
const chaosTitle = $("#chaosTitle");
const chaosMessage = $("#chaosMessage");
const chaosPanel = $("#chaosPanel");
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
   RANDOM CURSED QUOTES
========================================= */

function generateQuote() {
  lastQuoteIndex = randomIndex(quotes.length, lastQuoteIndex);
  quoteText.textContent = quotes[lastQuoteIndex];
}

$("#newQuote").addEventListener("click", generateQuote);

/* =========================================
   RANDOM FORUM QUESTIONS
========================================= */

function generateQuestion() {
  lastQuestionIndex = randomIndex(questions.length, lastQuestionIndex);
  questionText.textContent = questions[lastQuestionIndex];
}

$("#newQuestion").addEventListener("click", generateQuestion);

/* =========================================
   CHAOS BUTTON
========================================= */

function summonChaos() {
  lastChaosIndex = randomIndex(chaosMessages.length, lastChaosIndex);

  const [title, message] = chaosMessages[lastChaosIndex];

  chaosTitle.textContent = title;
  chaosMessage.textContent = message;

  // Restart the animation on every click.
  chaosPanel.classList.remove("chaos-active");
  void chaosPanel.offsetWidth;
  chaosPanel.classList.add("chaos-active");

  clearTimeout(chaosTimer);

  chaosTimer = setTimeout(() => {
    chaosPanel.classList.remove("chaos-active");
  }, 1000);

  showToast("✳ CHAOS SUMMONED SUCCESSFULLY. PROBABLY.");
}

$("#chaosButton").addEventListener("click", () => {
  summonChaos();

  // Scroll to the result when the top button is used.
  chaosPanel.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});

$("#chaosAgain").addEventListener("click", summonChaos);

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
