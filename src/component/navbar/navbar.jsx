import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { create } from "zustand";
import CineVaultLogo from "../../img-folder/navbarImg";
import { FiSearch } from "react-icons/fi";
import { FiX } from "react-icons/fi"; 
import { FiMenu } from "react-icons/fi";

const useSearchStore = create((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Series", href: "/series" },
  { label: "Trending", href: "/trending" },
  { label: "My List", href: "/my-list" },
];

export default function Navbar() {
  const { query, setQuery } = useSearchStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-[#C8102E] font-bold text-2xl select-none shrink-0"
        >
          <CineVaultLogo />
        </NavLink>

        <ul className="hidden md:flex items-center">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `px-3 lg:px-4 h-16 flex items-center text-[15px] font-semibold border-b-2 transition-colors duration-150 ` +
                  (isActive
                    ? "text-[#C8102E] border-[#C8102E]"
                    : "text-gray-500 border-transparent hover:text-gray-900")
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 hover:border-[#C8102E] rounded-md px-3 h-9">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search movies, series..."
              className="bg-transparent text-[14px] outline-none w-36 lg:w-52 text-gray-800 placeholder-gray-400"
            />
            {query ? (
              <FiX
                size={15}
                className="text-gray-400 cursor-pointer hover:text-[#C8102E] transition-colors"
                onClick={() => setQuery("")}
              />
            ) : (
              <FiSearch size={15} className="text-gray-400" />
            )}
          </div>

          {/* Sign In */}
          <button className="h-9 px-3 lg:px-4 text-[14px] font-semibold text-[#C8102E] border-[1.5px] border-[#C8102E] rounded-md hover:bg-red-50 transition-colors whitespace-nowrap">
            Sign In
          </button>

          {/* Join Now */}
          <button className="h-9 px-3 lg:px-4 text-[14px] font-semibold text-white bg-[#C8102E] rounded-md hover:bg-[#a80d25] transition-colors whitespace-nowrap">
            Join Now
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-600 p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Drawer from right */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden
    ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <span className="text-[#C8102E] font-bold text-lg">CineVault</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-500 p-1"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 px-4 py-3 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <NavLink
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 px-3 text-[15px] font-semibold rounded-lg transition-colors ` +
                    (isActive
                      ? "text-[#C8102E] bg-red-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50")
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 h-10 mt-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search movies, series..."
              className="bg-transparent text-[14px] outline-none flex-1 text-gray-800 placeholder-gray-400"
            />
            <FiSearch size={15} color="#9ca3af" />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-4 py-4 flex flex-col gap-2 border-t border-gray-100">
          <button className="h-11 text-[14px] font-semibold text-[#C8102E] border-[1.5px] border-[#C8102E] rounded-lg hover:bg-red-50 transition-colors">
            Sign In
          </button>
          <button className="h-11 text-[14px] font-semibold text-white bg-[#C8102E] rounded-lg hover:bg-[#a80d25] transition-colors">
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
}
