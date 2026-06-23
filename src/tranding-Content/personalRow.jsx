function PersonalRow({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item.id)}
      className="group flex items-center gap-3 w-full text-left p-2 rounded-lg
                 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <span className="text-sm font-semibold text-[#C8102E] w-5 shrink-0">
        #{item.rank}
      </span>

      <img
        src={item.image}
        alt={item.title}
        className="w-10 h-14 object-cover rounded-md shrink-0
                   group-hover:outline group-hover:outline-2 group-hover:outline-[#C8102E]"
      />

      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {item.title}
        </p>
        {item.subtitle && (
          <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
        )}
      </div>
    </button>
  );
}

export default PersonalRow;