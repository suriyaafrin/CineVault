import { createPortal } from "react-dom";
import { useCommunityStore } from "./useCommunityStore";

function BuzzModal() {
  const buzzItems = useCommunityStore((state) => state.buzzItems);
  const activeBuzzId = useCommunityStore((state) => state.activeBuzzId);
  const closeBuzzModal = useCommunityStore((state) => state.closeBuzzModal);

  if (activeBuzzId === null) return null;

  const item = buzzItems.find((b) => b.id === activeBuzzId);
  if (!item) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={closeBuzzModal}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={closeBuzzModal}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white
                       flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
          <span
            className="absolute top-3 left-3 bg-[#C8102E] text-white text-[11px] font-medium
                       px-2.5 py-1 rounded-md tracking-wide"
          >
            {item.tag}
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-400 mt-0.5">{item.subtitle}</p>

          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            {item.detail}
          </p>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
            <span className="text-xs font-medium text-gray-500">
              {item.stat}
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BuzzModal;