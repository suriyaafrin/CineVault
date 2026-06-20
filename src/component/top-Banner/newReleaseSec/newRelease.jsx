import { useState } from "react";
import { newReleasesData } from "../../../../data/newReleaseData/data";
import MovieCard from "../movieCard";
import { ScrollRow } from "../scrollRow";
import AllNewReleasesModal from "./allNewReleasesModal";
import MovieDetailModal from "./movieDetailModal";

const formatDuration = (mins) => {
  if (!mins) return "";
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
};

const NewReleasesSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[21px] font-bold text-[#C8102E]">New Releases</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1 text-sm font-medium text-[#C8102E] hover:underline"
          >
            View All
            <span className="text-base leading-none">›</span>
          </button>
        </div>
        <ScrollRow>
          {newReleasesData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
          ))}
        </ScrollRow>

        {selectedMovie && (
          <MovieDetailModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            formatDuration={formatDuration}
          />
        )}
      </section>

      <AllNewReleasesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        movies={newReleasesData}
      />
    </>
  );
};

export default NewReleasesSection;