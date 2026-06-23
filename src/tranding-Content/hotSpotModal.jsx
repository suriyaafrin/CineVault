import { createPortal } from "react-dom";
import { useGlobalStore } from "./useGlobalStore";


function HotspotModal() {
  const hotspots = useGlobalStore((state) => state.hotspots);
  const activeHotspotId = useGlobalStore((state) => state.activeHotspotId);
  const closeHotspotModal = useGlobalStore((state) => state.closeHotspotModal);

  if (activeHotspotId === null) return null;

  const hotspot = hotspots.find((h) => h.id === activeHotspotId);
  if (!hotspot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={closeHotspotModal}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#C8102E] opacity-60 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#C8102E]" />
              </span>
              <h3 className="text-lg font-semibold text-gray-900">
                {hotspot.region}
              </h3>
            </div>
            <button
              type="button"
              onClick={closeHotspotModal}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center
                         justify-center hover:bg-gray-200 transition-colors -mt-1 -mr-1"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-1">{hotspot.detail}</p>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">
              Trending titles in this region
            </p>
            <ul className="flex flex-col gap-1.5">
              {hotspot.titles.map((title, i) => (
                <li
                  key={title}
                  className="flex items-center gap-2 text-sm text-gray-900"
                >
                  <span className="text-[#C8102E] font-medium w-4">
                    {i + 1}
                  </span>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default HotspotModal;