import HotspotModal from "./hotSpotModal";
import HotspotMap from "./map";


function GlobalHotspotsSection() {
  return (
    <div>
      <div className="mb-3">
        <p className="text-[11px] font-medium text-[#C8102E] tracking-wide">
          WORLDWIDE
        </p>
        <h2 className="text-base font-semibold text-gray-900">
          Global hotspots
        </h2>
      </div>

      <HotspotMap />

      <HotspotModal />
    </div>
  );
}

export default GlobalHotspotsSection;