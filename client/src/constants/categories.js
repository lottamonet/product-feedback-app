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
// SuggestionCard — picked to stay legible against the light backgrounds.
export const CATEGORY_COLORS = {
  ui: { bg: "#EAF6FE", text: "#1D8FD1" },
  ux: { bg: "#F3EAFB", text: "#8B3FD1" },
  enhancement: { bg: "#F5EAFC", text: "#AD1FEA" },
  bug: { bg: "#FDEEE9", text: "#D96B47" },
  feature: { bg: "#EAEDFC", text: "#4661E6" },
};
