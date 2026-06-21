// Thin wrapper so the /movies route stays exactly as-is in your router —

import ExploreContent from "../../movie-Series-Section/exploreMovies";

// all the real layout/grid/filter logic lives in ExploreContent.jsx.
export default function Movies() {
  return <ExploreContent type="movie" />;
}
