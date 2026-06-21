// Thin wrapper so the /series route stays exactly as-is in your router —

import ExploreContent from "../../movie-Series-Section/exploreMovies";

// all the real layout/grid/filter logic lives in ExploreContent.jsx.
export default function Series() {
  return <ExploreContent type="series" />;
}
