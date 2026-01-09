import { useState } from "react";
import { useTranslation } from "react-i18next";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const LANGUAGES = {
    ar: {
      next: "en",
      label: "EN",
    },
    en: {
      next: "ar",
      label: "عربي",
    },
  };

  const currentLang = i18n.language as keyof typeof LANGUAGES;


  return (
    <>
      <nav className="fixed w-full bg-black shadow-lg z-50 ">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="hidden md:flex space-x-8">
              <a
                href="#hero"
                className="nav-link text-white hover:text-red-500"
              >
                {t("navbar.home")}
              </a>
              <a
                href="#about"
                className="nav-link text-white hover:text-red-500"
              >
                {t("navbar.about")}
              </a>
              <a
                href="#skills"
                className="nav-link text-white hover:text-red-500"
              >
                {t("navbar.skills")}
              </a>
              <a
                href="#contact"
                className="nav-link text-white hover:text-red-500"
              >
                {t("navbar.contact")}
              </a>
              <button
                className="nav-link text-white hover:text-red-500"
                onClick={() => i18n.changeLanguage(`${LANGUAGES[currentLang].next}`)}
              >
                {LANGUAGES[currentLang].label}
              </button>
            </div>
            <button
              className="md:hidden text-white w-[100%] flex justify-end items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <ul className="bg-white mx-4 mb-4 rounded-2xl shadow-lg p-6 space-y-4">
              <li className=" text-center text-xl">
                <a
                  href="#hero"
                  className="text-dark"
                  onClick={() => setIsOpen(false)}
                >
                  {t("navbar.home")}
                </a>
              </li>
              <li className=" text-center text-xl">
                <a
                  href="#about"
                  className="text-dark"
                  onClick={() => setIsOpen(false)}
                >
                  {t("navbar.about")}
                </a>
              </li>
              <li className=" text-center text-xl">
                <a
                  href="#skills"
                  className="text-dark"
                  onClick={() => setIsOpen(false)}
                >
                  {t("navbar.skills")}
                </a>
              </li>
              <li className=" text-center text-xl">
                <a
                  href="#contact"
                  className="text-dark"
                  onClick={() => setIsOpen(false)}
                >
                  {t("navbar.contact")}
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
