import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import SuggestionsHeader from "../components/SuggestionsHeader.jsx";
import SuggestionCard from "../components/SuggestionCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { getAllSuggestions, getSuggestionsByCategory } from "../api.js";
import "./Home.css";

function Home() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const request = activeCategory
      ? getSuggestionsByCategory(activeCategory)
      : getAllSuggestions();

    request
      .then(setSuggestions)
      .finally(() => setIsLoading(false));
  }, [activeCategory]);

  return (
    <div className="home-page">
      <Sidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      <main className="suggestions-panel">
        <SuggestionsHeader count={suggestions.length} />
        {!isLoading && suggestions.length === 0 && <EmptyState />}
        {suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </main>
    </div>
  );
}

export default Home;
