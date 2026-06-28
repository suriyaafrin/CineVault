import { useEffect } from "react";
import { usePersonalStore } from "./usePersonalStore";
import PersonalRow from "./PersonalRow";
import PersonalModal from "./PersonalModal";

function PersonalTrendingSection() {
  const personalItems = usePersonalStore((state) => state.personalItems);
  const isLoading = usePersonalStore((state) => state.isLoading);
  const error = usePersonalStore((state) => state.error);
  const fetchPersonalItems = usePersonalStore((state) => state.fetchPersonalItems);
  const openPersonalModal = usePersonalStore(
    (state) => state.openPersonalModal
  );

  useEffect(() => {
    fetchPersonalItems();
  }, [fetchPersonalItems]);

  return (
    <div>
      <div className="mb-3">
        <p className="text-[11px] font-medium text-[#C8102E] tracking-wide">
          FOR YOU
        </p>
        <h2 className="text-base font-semibold text-gray-900">
          Personal trending
        </h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-2 flex flex-col">
        {isLoading ? (
          // Simple skeleton rows, matching the loading-placeholder pattern
          // used elsewhere in the project rather than a single spinner.
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="h-14 w-10 shrink-0 animate-pulse rounded-md bg-gray-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          ))
        ) : error ? (
          <p className="p-2 text-xs text-red-500">
            Couldn&apos;t load recommendations right now.
          </p>
        ) : personalItems.length === 0 ? (
          <p className="p-2 text-xs text-gray-400">
            No recommendations available yet.
          </p>
        ) : (
          personalItems.map((item) => (
            <PersonalRow key={item.id} item={item} onOpen={openPersonalModal} />
          ))
        )}
      </div>

      <PersonalModal />
    </div>
  );
}

export default PersonalTrendingSection;