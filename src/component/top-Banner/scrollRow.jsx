import { useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
export function ScrollRow({ children, className = "" }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group overflow-hidden">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow text-gray-600 hover:text-[#C8102E] hover:border-[#C8102E] transition-all sm:hidden"
        aria-label="Scroll left"
      >
        <FaChevronLeft size={14} />
      </button>

      <div
        ref={rowRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className={`flex gap-3 overflow-x-auto scroll-smooth px-0 ${className}`}
      >
        {children}
      </div>

      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow text-gray-600 hover:text-[#C8102E] hover:border-[#C8102E] transition-all sm:hidden"
        aria-label="Scroll right"
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}