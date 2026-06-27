import { useEffect } from "react";

function TestTMDB() {
  useEffect(() => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    console.log("API Key loaded:", API_KEY ? "✅ Yes" : "❌ No, check .env");

    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => console.log("TMDb response:", data))
      .catch((err) => console.error("TMDb fetch error:", err));
  }, []);

  return <div>Check your console for TMDb test results</div>;
}

export default TestTMDB;