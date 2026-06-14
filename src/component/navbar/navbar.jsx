import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { create } from "zustand";
import CineVaultLogo from "../../img-folder/navbarImg";

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

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-[#C8102E] font-bold text-2xl select-none shrink-0">
          <CineVaultLogo />
        </NavLink>

        {/* Desktop Nav Links */}
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

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search */}
          <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-md px-3 h-9">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search movies, series..."
              className="bg-transparent text-[14px] outline-none w-36 lg:w-52 text-gray-800 placeholder-gray-400"
            />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
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
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-[15px] font-semibold py-2.5 px-2 rounded-md transition-colors ` +
                (isActive ? "text-[#C8102E] bg-red-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50")
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Mobile Search */}
          <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-md px-3 h-10 mt-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search movies, series..."
              className="bg-transparent text-[14px] outline-none flex-1 text-gray-800 placeholder-gray-400"
            />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Mobile Buttons */}
          <div className="flex gap-2 mt-2">
            <button className="flex-1 h-10 text-[14px] font-semibold text-[#C8102E] border-[1.5px] border-[#C8102E] rounded-md hover:bg-red-50 transition-colors">
              Sign In
            </button>
            <button className="flex-1 h-10 text-[14px] font-semibold text-white bg-[#C8102E] rounded-md hover:bg-[#a80d25] transition-colors">
              Join Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}