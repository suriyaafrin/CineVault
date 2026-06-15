import { create } from "zustand";
import CineVaultLogo from "../../img-folder/navbarImg";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const useFooterStore = create((set) => ({
  hoveredLink: null,
  setHoveredLink: (link) => set({ hoveredLink: link }),
}));


const LinkColumn = ({ title, links }) => {
  const { hoveredLink, setHoveredLink } = useFooterStore();

  return (
    <div>
      <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className={`text-sm transition-colors duration-150 ${
                hoveredLink === link ? "text-white" : "text-red-200"
              }`}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};


const CineVaultFooter = () => {
  const socials = [
    { icon: <FaFacebookF className="w-5 h-5" />, label: "Facebook" },
    { icon: <FaTwitter className="w-5 h-5" />, label: "Twitter" },
    { icon: <FaInstagram className="w-5 h-5" />, label: "Instagram" },
    { icon: <FaYoutube className="w-5 h-5" />, label: "YouTube" },
  ];

  return (
    <footer className="bg-[#C8102E] border-t border-[#a50d26] py-10 px-10">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <CineVaultLogo className="text-sm text-red-200" />
            <p className="text-sm text-red-200 leading-relaxed max-w-50">
              Your ultimate destination for movies and TV series. Watch anytime, anywhere.
            </p>
          </div>

          <LinkColumn
            title="Explore"
            links={["Movies", "Series", "Trending", "New Releases", "Top Rated"]}
          />
          <LinkColumn
            title="Account"
            links={["My List", "Watch Later", "History", "Settings", "Help Center"]}
          />
          <LinkColumn
            title="Legal"
            links={["Terms of Use", "Privacy Policy", "Cookie Policy", "DMCA", "Contact Us"]}
          />

          
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex items-center gap-3 flex-wrap">
              {socials.map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-red-200 hover:text-white transition-colors duration-150"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        
        <div className="mt-8 pt-6 border-t border-[#a50d26]">
          <p className="text-xs text-red-200">© 2024 CineVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default CineVaultFooter;