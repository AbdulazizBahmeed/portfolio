import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { i18n, t } = useTranslation();

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  const LANGUAGES = {
    ar: {
      next: "en" as const,
      label: "EN",
    },
    en: {
      next: "ar" as const,
      label: "AR",
    },
  } as const;

  type LanguageKey = keyof typeof LANGUAGES;
  
  const currentLang = (i18n.language in LANGUAGES 
    ? i18n.language 
    : "en") as LanguageKey;
  const isRTL = currentLang === "ar";

  // Track scroll position for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ["hero", "about", "skills", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { id: "hero", label: t("navbar.home") },
    { id: "about", label: t("navbar.about") },
    { id: "skills", label: t("navbar.skills") },
    { id: "contact", label: t("navbar.contact") },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg shadow-red-500/10"
            : "bg-black shadow-lg"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <a
                href="#hero"
                className="text-xl font-bold text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => handleNavClick("hero")}
              >
                <img className="max-w-10" src="/assets/fav.ico" alt="" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-1`}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 group ${
                    activeSection === item.id
                      ? "text-red-500"
                      : "text-white hover:text-red-400"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-full h-0.5 bg-red-500 transform ${isRTL ? 'origin-right' : 'origin-left'} transition-transform duration-300 ${
                      activeSection === item.id
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              ))}

              {/* Language Switcher */}
              <button
                onClick={() => changeLanguage(LANGUAGES[currentLang].next)}
                className={`${isRTL ? 'mr-4' : 'ml-4'} px-4 py-2 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500 rounded-lg transition-all duration-200 border border-red-500/30 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/50`}
                aria-label="Change language"
              >
                {LANGUAGES[currentLang].label}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg transition-all duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              <div className="flex justify-center">
              {/* <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"> */}
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45" : "translate-y-2"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4">
            <ul className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl shadow-2xl shadow-red-500/20 p-4 space-y-2 border border-red-500/10">
              {navItems.map((item, index) => (
                <li
                  key={item.id}
                  className="transform transition-all duration-300"
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen
                      ? "translateY(0)"
                      : "translateY(-10px)",
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`block px-4 py-3 text-center text-lg font-medium rounded-xl transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
                        : "text-gray-300 hover:bg-red-500/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li
                className="pt-2 transform transition-all duration-300"
                style={{
                  transitionDelay: isOpen ? `${navItems.length * 50}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                <button
                  onClick={() => {
                    changeLanguage(LANGUAGES[currentLang].next);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-center text-lg font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all duration-200 shadow-lg shadow-red-500/50"
                >
                  {LANGUAGES[currentLang].label} →{" "}
                  {LANGUAGES[LANGUAGES[currentLang].next].label}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default NavBar;