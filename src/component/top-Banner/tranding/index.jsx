import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

import MovieCard from "../MovieCard";
import { ScrollRow } from "../scrollRow";

const mockMovies = [
  { id: 1, title: "Oppenheimer", year: 2023, genre: "Drama", rating: 8.8, badge: "MOVIE", poster: "https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { id: 2, title: "Stranger Things", year: 2016, genre: "Sci-Fi", rating: 8.7, badge: "SERIES", poster: "https://image.tmdb.org/t/p/w300/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" },
  { id: 3, title: "Inception", year: 2010, genre: "Thriller", rating: 8.8, badge: "New", poster: "https://image.tmdb.org/t/p/w300/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" },
  { id: 4, title: "The Last of Us", year: 2023, genre: "Action", rating: 9.3, badge: "SERIES", poster: "https://image.tmdb.org/t/p/w300/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg" },
  { id: 5, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, badge: "MOVIE", poster: "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 6, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, badge: "MOVIE", poster: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 7, title: "Breaking Bad", year: 2008, genre: "Crime", rating: 9.5, badge: "SERIES", poster: "https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
];

export default function TrendingSection({ movies = mockMovies }) {
  return (
    <section className="py-6 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[21px] font-bold text-[#C8102E]">Trending this week</h2>
          <Link
            to="/trending"
            className="flex items-center gap-1 text-[13px] text-[#C8102E] hover:opacity-80 transition-opacity"
          >
            View All <FaChevronRight size={11} />
          </Link>
        </div>

        <ScrollRow>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ScrollRow>
      </div>
    </section>
  );
}