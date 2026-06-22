
import { genres } from "../../data/movieData/movieData";
import { useExploreStore } from "./useExploreStore";


export default function GenreTabs() {
  const activeGenre = useExploreStore((state) => state.activeGenre);
  const setGenre = useExploreStore((state) => state.setGenre);

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const isActive = genre === activeGenre;
        return (
          <button
            key={genre}
            onClick={() => setGenre(genre)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? "bg-[#C8102E] text-white"
                : "bg-gray-100 text-[#C8102E] hover:bg-gray-200"
            }`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}