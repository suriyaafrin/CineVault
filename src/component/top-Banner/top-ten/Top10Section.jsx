import { useEffect } from "react";
import { useState } from "react";
import { MdChevronRight } from "react-icons/md";

import Top10Card from "./top10Card";
import Top10Modal from "./top10Modal";
import useTop10Store from "./useTop10Store";

import MovieDetailModal from "../newReleaseSec/movieDetailModal";
import { formatDuration } from "../../../utils/formateDuration";

const Top10Section = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { items, isLoading, error, activeId, setActiveId, fetchTop10 } =
    useTop10Store();

  useEffect(() => {
    fetchTop10();
  }, [fetchTop10]);

  const activeMovie = items.find((movie) => movie.id === activeId);

  if (isLoading) {
    return (
      <section className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-[#111]">Loading top 10...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-[#C8102E]">Failed to load: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#C8102E] text-[21px] font-bold">
            Top 10 this month
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1 text-[13px] text-[#C8102E] hover:opacity-80 transition-opacity"
          >
            View All <MdChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3 lg:gap-6">
          {items.slice(0, 5).map((movie, index) => (
            <Top10Card key={movie.id} movie={movie} rank={index + 1} />
          ))}
        </div>
      </div>

      {modalOpen && <Top10Modal onClose={() => setModalOpen(false)} />}

      {activeMovie && (
        <MovieDetailModal
          movie={activeMovie}
          onClose={() => setActiveId(null)}
          formatDuration={formatDuration}
        />
      )}
    </section>
  );
};

export default Top10Section;
