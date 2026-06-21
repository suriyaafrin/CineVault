import { ageRatings } from "../../data/movieData/movieData";
import { useExploreStore } from "./useExploreStore";
const sortOptions = ["A-Z", "Rating", "Popularity", "Year"];
const yearOptions = ["1970 - 2030", "2000 - 2030", "2010 - 2030", "2020 - 2030"];

export default function FilterSidebar() {
  const sortBy = useExploreStore((state) => state.sortBy);
  const setSortBy = useExploreStore((state) => state.setSortBy);
  const yearRange = useExploreStore((state) => state.yearRange);
  const setYearRange = useExploreStore((state) => state.setYearRange);
  const ageRating = useExploreStore((state) => state.ageRating);
  const setAgeRating = useExploreStore((state) => state.setAgeRating);

  return (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Sort By
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]/40"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Year
        </span>
        <select
          value={yearRange}
          onChange={(e) => setYearRange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]/40"
        >
          {yearOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Age Rating
        </span>
        <select
          value={ageRating}
          onChange={(e) => setAgeRating(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]/40"
        >
          {ageRatings.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}