// These lowercase values are what the server stores and expects in the
// URL/body — they must exactly match the CHECK constraint on the
// suggestions table and the VALID_CATEGORIES list in server/src/index.js.
export const CATEGORIES = ["ui", "ux", "enhancement", "bug", "feature"];

// Display-only: how each category renders in the UI (Sidebar filters,
// SuggestionCard tags, AddFeedback dropdown).
export const CATEGORY_LABELS = {
  ui: "UI",
  ux: "UX",
  enhancement: "Enhancement",
  bug: "Bug",
  feature: "Feature",
};

// Background/text color pairs for each category's tag pill on a
// SuggestionCard. Text colors are darkened just enough from the original
// design palette to clear WCAG AA's 4.5:1 contrast minimum against their
// background (verified via Lighthouse's color-contrast audit) — `ux` was
// already compliant and is untouched.
export const CATEGORY_COLORS = {
  ui: { bg: "#EAF6FE", text: "#1876AD" },
  ux: { bg: "#F3EAFB", text: "#8B3FD1" },
  enhancement: { bg: "#F5EAFC", text: "#AA16E9" },
  bug: { bg: "#FDEEE9", text: "#B84A26" },
  feature: { bg: "#EAEDFC", text: "#425DE5" },
};
