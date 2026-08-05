const API_URL = import.meta.env.VITE_API_URL;

export async function getAllSuggestions() {
  const res = await fetch(`${API_URL}/get-all-suggestions`);
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
}

export async function getSuggestionsByCategory(category) {
  const res = await fetch(`${API_URL}/get-suggestions-by-category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
}

export async function addSuggestion(suggestion) {
  const res = await fetch(`${API_URL}/add-one-suggestion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(suggestion),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to add suggestion");
  }
  return data;
}
