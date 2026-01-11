import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function Hero() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex lg:justify-between justify-center items-center flex-wrap lg:flex-nowrap gap-12 lg:gap-16">
          {/* Text Content */}
          <div className={`lg:max-w-[55%] w-full ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Greeting */}
            <h2
              className={`text-xl md:text-2xl font-semibold text-gray-300 mb-3 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {t("hero.greeting")}
            </h2>

            {/* Name */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-gradient">
                {t("hero.full_name")}
              </span>
            </h1>

            {/* Job Title */}
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {t("hero.job_title")}
              </span>
            </h2>

            {/* Bio */}
            <p
              className={`text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {t("hero.short_bio")}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-4 flex-wrap gap-4 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <a
                href="#skills"
                className="group relative border-2 border-red-600 text-red-500 px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">{t("hero.skills")}</span>
                <div className="absolute inset-0 bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              <a
                href="#contact"
                className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-red-500/50 hover:scale-105 active:scale-95 overflow-hidden group"
              >
                <span className="relative z-10">{t("hero.contact")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>

            {/* Social Links or Stats (Optional Enhancement) */}
            <div
              className={`mt-12 flex ${isRTL ? 'space-x-reverse' : ''} space-x-6 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
            </div>
          </div>

          {/* Image */}
          <div
            className={`flex justify-center items-center w-full lg:w-auto transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100 scale-100"
                : `${isRTL ? '-translate-x-12' : 'translate-x-12'} opacity-0 scale-95`
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse" />
              
              {/* Image container */}
              <div className="relative">
                <img
                  className="relative rounded-2xl h-auto w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                  src="/assets/personal-photo.jpg"
                  alt={t("hero.full_name")}
                  loading="eager"
                />
                
                {/* Decorative corner accents */}
                <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 w-16 h-16 border-t-4 border-l-4 border-red-500 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-16 h-16 border-b-4 border-r-4 border-red-500 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <a
          href="#about"
          className="flex flex-col items-center text-gray-400 hover:text-red-500 transition-colors duration-300 group"
          aria-label="Scroll to about section"
        >
          <span className="text-sm mb-2 font-medium">Scroll Down</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Hero;