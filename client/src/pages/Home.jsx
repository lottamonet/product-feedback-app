import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import SuggestionsHeader from "../components/SuggestionsHeader.jsx";
import SuggestionCard from "../components/SuggestionCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import {
  getAllSuggestions,
  getSuggestionsByCategory,
  upvoteSuggestion,
} from "../api.js";
import "./Home.css";

function Home() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // "most" | "least" upvotes — a stretch goal, so it lives as simple
  // client-side state rather than a query param the API needs to support.
  const [sortOrder, setSortOrder] = useState("most");
  // Hamburger menu stretch goal: only meaningful below the mobile
  // breakpoint, where Sidebar renders as an off-canvas panel instead of
  // always being visible.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const request = activeCategory
      ? getSuggestionsByCategory(activeCategory)
      : getAllSuggestions();

    request
      .then(setSuggestions)
      .finally(() => setIsLoading(false));
  }, [activeCategory]);

  // Closing the menu on category select means mobile users don't have to
  // separately dismiss it after picking a filter.
  function handleSelectCategory(category) {
    setActiveCategory(category);
    setIsMenuOpen(false);
  }

  // Optimistic update: bump the count locally right away so the click
  // feels instant, then confirm with the server in the background. If the
  // request fails, undo the local change so the UI doesn't show a vote
  // that was never actually saved.
  async function handleUpvote(id) {
    setSuggestions((current) =>
      current.map((s) => (s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s))
    );

    try {
      await upvoteSuggestion(id);
    } catch (err) {
      console.error(err);
      setSuggestions((current) =>
        current.map((s) => (s.id === id ? { ...s, upvotes: s.upvotes - 1 } : s))
      );
    }
  }

  // Sorting is derived at render time from `suggestions` + `sortOrder`
  // rather than stored separately, so the two can never drift out of sync.
  const sortedSuggestions = [...suggestions].sort((a, b) =>
    sortOrder === "most" ? b.upvotes - a.upvotes : a.upvotes - b.upvotes
  );

  return (
    <div className="home-page">
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <main className="suggestions-panel">
        <SuggestionsHeader
          count={suggestions.length}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
        {!isLoading && suggestions.length === 0 && <EmptyState />}
        {sortedSuggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            onUpvote={handleUpvote}
          />
        ))}
      </main>
    </div>
  );
}

export default Home;
