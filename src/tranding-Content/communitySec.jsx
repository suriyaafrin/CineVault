
import BuzzCard from "./buzzCard";
import BuzzModal from "./buzzModal";
import { useCommunityStore } from "./useCommunityStore";

function CommunitySection() {
  const buzzItems = useCommunityStore((state) => state.buzzItems);
  const openBuzzModal = useCommunityStore((state) => state.openBuzzModal);

  return (
    <section className=" max-w-6xl mx-auto bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="text-[11px] font-medium text-[#C8102E] tracking-wide">
            COMMUNITY
          </p>
          <h2 className="text-base font-semibold text-gray-900">
            CineVault social buzz
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {buzzItems.map((item) => (
          <BuzzCard key={item.id} item={item} onOpen={openBuzzModal} />
        ))}
      </div>

      <BuzzModal />
    </section>
  );
}

export default CommunitySection;