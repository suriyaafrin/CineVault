import { createPortal } from "react-dom";
import { FaPlay, FaTimes } from "react-icons/fa";
import { usePersonalStore } from "./usePersonalStore";

// NOTE: This file didn't exist in what was shared with me — built fresh
// based on usePersonalStore's shape and the Watch-now pattern already
// established in MovieDetailModal. Double check markup/classes match your
// existing modal styling conventions before shipping.
function PersonalModal() {
  const activePersonalId = usePersonalStore((state) => state.activePersonalId);
  const personalItems = usePersonalStore((state) => state.personalItems);
  const activeDetails = usePersonalStore((state) => state.activeDetails);
  const isLoadingDetails = usePersonalStore((state) => state.isLoadingDetails);
  const closePersonalModal = usePersonalStore((state) => state.closePersonalModal);

  if (!activePersonalId) return null;

  const item = personalItems.find((i) => i.id === activePersonalId);
  if (!item) return null;

  const year = item.releaseDate ? item.releaseDate.slice(0, 4) : null;
  const genreNames = activeDetails?.genres?.map((g) => g.name).join(", ") || null;

  const trailer =
    activeDetails?.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    ) || activeDetails?.videos?.results?.find((v) => v.site === "YouTube");

  const handleWatchNow = () => {
    if (trailer) {
      window.open(
        `https://www.youtube.com/watch?v=${trailer.key}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-6"
      onClick={(e) => e.target === e.currentTarget && closePersonalModal()}
    >
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl">
        <div className="relative h-44">
          {item.posterUrl ? (
            <img
              src={item.posterUrl}
              alt={item.title}
              className="h-full w-full object-cover opacity-70"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-black/5">
              <span className="text-2xl font-bold tracking-wide text-black/20">
                {item.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />
          <button
            onClick={closePersonalModal}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/70 transition-colors hover:bg-white"
          >
            <FaTimes size={13} />
          </button>
        </div>

        <div className="px-4 pb-2 pt-3">
          <h3 className="text-base font-semibold leading-tight text-black">
            {item.title}
          </h3>
          {year && <p className="mt-0.5 text-xs text-black/40">{year}</p>}

          {isLoadingDetails ? (
            <span className="mt-1.5 inline-block rounded bg-black/5 px-2 py-0.5 text-[10px] text-black/40">
              Loading...
            </span>
          ) : (
            genreNames && (
              <span className="mt-1.5 inline-block rounded bg-black/5 px-2 py-0.5 text-[10px] text-black/60">
                {genreNames}
              </span>
            )
          )}

          {item.rating && (
            <div className="mt-3">
              <p className="text-[10px] text-black/40">Rating</p>
              <p className="text-sm font-medium text-yellow-500">
                ★ {item.rating.toFixed(1)}
              </p>
            </div>
          )}
        </div>

        {item.overview && (
          <div className="px-4 pb-4">
            <p className="border-t border-black/[0.07] pt-3 text-xs leading-relaxed text-black/60">
              {item.overview}
            </p>
          </div>
        )}

        <div className="flex gap-2 border-t border-black/[0.07] px-4 py-3">
          <button
            onClick={handleWatchNow}
            disabled={isLoadingDetails || !trailer}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#C8102E] py-2 text-xs font-medium text-white transition-colors hover:bg-[#a50d26] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/40"
          >
            <FaPlay size={11} />
            {isLoadingDetails
              ? "Loading..."
              : trailer
              ? "Watch now"
              : "No trailer available"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default PersonalModal;