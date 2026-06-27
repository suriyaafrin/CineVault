import { usePersonalStore } from "./usePersonalStore";
import PersonalRow from "./PersonalRow";
import PersonalModal from "./PersonalModal";

function PersonalTrendingSection() {
  const personalItems = usePersonalStore((state) => state.personalItems);
  const openPersonalModal = usePersonalStore(
    (state) => state.openPersonalModal
  );

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
        {personalItems.map((item) => (
          <PersonalRow key={item.id} item={item} onOpen={openPersonalModal} />
        ))}
      </div>

      <PersonalModal />
    </div>
  );
}

export default PersonalTrendingSection;
