import { useExploreStore } from "./useExploreStore";


export default function Pagination({ totalPages = 10 }) {
  const currentPage = useExploreStore((state) => state.currentPage);
  const setPage = useExploreStore((state) => state.setPage);

  const pages = [1, 2, 3, "...", 6, 7, 8, 9, 10].filter(
    (p) => typeof p === "string" || p <= totalPages
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 text-sm">
      <button
        onClick={() => setPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        Previous
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`w-8 h-8 rounded-md font-medium transition-colors ${
              page === currentPage
                ? "bg-[#C8102E] text-white"
                : "text-[#C8102E] hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        Next
      </button>
    </div>
  );
}