function HotspotCard({ hotspot, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(hotspot.id)}
      className="group text-left w-full bg-white border border-gray-200 rounded-xl p-3.5
                 hover:border-[#C8102E] hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full bg-[#C8102E] opacity-60 animate-ping" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-[#C8102E]" />
        </span>
        <p className="text-sm font-medium text-gray-900">{hotspot.region}</p>
      </div>

      <p className="text-xs text-gray-400">
        <span className="text-[#C8102E] font-medium">{hotspot.genre}</span>{" "}
        trending due to high buzz
      </p>
    </button>
  );
}

export default HotspotCard;