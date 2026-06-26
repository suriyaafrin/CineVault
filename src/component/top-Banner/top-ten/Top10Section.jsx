import { useState } from "react";
import { MdChevronRight } from "react-icons/md";

import Top10Card from "./top10Card";
import Top10Modal from "./top10Modal";
import useTop10Store from "./useTop10Store";

import { top10Movies } from "../../../../data/top10Data/top10Data";

import MovieDetailModal from "../newReleaseSec/movieDetailModal";
import { formatDuration } from "../../../utils/formateDuration";

const Top10Section = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { activeId, setActiveId } = useTop10Store();
  const activeMovie = top10Movies.find((movie) => movie.id === activeId);

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
          {top10Movies.slice(0, 5).map((movie) => (
            <Top10Card key={movie.id} movie={movie} />
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