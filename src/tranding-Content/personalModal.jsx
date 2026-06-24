import { createPortal } from "react-dom";
import { FaPlay } from "react-icons/fa";
import { usePersonalStore } from "./usePersonalStore";

function PersonalModal() {
  const personalItems = usePersonalStore((state) => state.personalItems);
  const activePersonalId = usePersonalStore((state) => state.activePersonalId);
  const closePersonalModal = usePersonalStore(
    (state) => state.closePersonalModal,
  );

  if (activePersonalId === null) return null;

  const item = personalItems.find((p) => p.id === activePersonalId);
  if (!item) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={closePersonalModal}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={closePersonalModal}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white
                       flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
          <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-[11px] font-medium px-2.5 py-1 rounded-md tracking-wide">
            #{item.rank} for you
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          {item.subtitle && (
            <p className="text-sm text-gray-400 mt-0.5">{item.subtitle}</p>
          )}

          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            {item.detail}
          </p>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
            <span className="text-xs font-medium text-gray-500">
              {item.reason}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              // TODO: hook this up to your actual watch/player route
              console.log("Watch now:", item.id);
            }}
            className="w-full mt-4 bg-[#C8102E] text-white text-sm font-semibold
                       py-2.5 rounded-lg hover:bg-[#a80d26] transition-colors
                       flex items-center justify-center gap-2"
          >
            <FaPlay size={14} />
            Watch Now
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default PersonalModal;