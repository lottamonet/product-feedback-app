import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddFeedback from "./pages/AddFeedback.jsx";
import "./App.css";

// The whole app is just these two routes/pages per the PRD:
// "/" (Home — view/filter/sort/upvote suggestions) and "/add-feedback"
// (the submission form).
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-feedback" element={<AddFeedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
