function BuzzCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item.id)}
      className="group text-left w-full bg-white border border-gray-200 rounded-xl overflow-hidden
                 hover:border-[#C8102E] hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className="absolute top-2 left-2 bg-[#C8102E] text-white text-[10px] font-medium
                     px-2 py-0.75 rounded-md tracking-wide"
        >
          {item.tag}
        </span>
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-gray-900 truncate">
          {item.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {item.subtitle}
        </p>
      </div>
    </button>
  );
}

export default BuzzCard;