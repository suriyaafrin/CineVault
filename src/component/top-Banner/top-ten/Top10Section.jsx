import { useState } from "react";
import { MdChevronRight } from "react-icons/md";

import Top10Card from "./top10Card";
import Top10Modal from "./Top10Modal";
import { top10Movies } from "../../../../data/top10Data/top10Data";

const Top10Section = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
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

        {/* Fixed grid row — no scroll */}
        <div className="grid grid-cols-10 gap-50">
          {top10Movies.slice(0, 6).map((movie) => (
            <Top10Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && <Top10Modal onClose={() => setModalOpen(false)} />}
    </section>
  );
};

export default Top10Section;