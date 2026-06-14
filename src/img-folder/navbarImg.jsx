const CineVaultLogo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Play button box */}
      <div className="bg-gray-200 rounded-lg flex items-center justify-center w-7 h-7">
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="6,4 6,20 20,12" fill="#E03030" />
        </svg>
      </div>

      {/* Text */}
      <span className="text-base font-bold  tracking-tight text-[#C8102E]">
        CineVault
      </span>
    </div>
  );
};

export default CineVaultLogo;