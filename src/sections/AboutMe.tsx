import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

function AboutMe() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("about.title")}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-red-600 rounded-full" />
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-r from-red-800 to-transparent rounded-full" />
          </div>
        </div>

        {/* Main Content Card */}
        <div
          className={`bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100 transform transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative">
            {/* Decorative quote mark */}
            <div
              className={`absolute ${
                isRTL ? "-right-2" : "-left-2"
              } -top-4 text-red-500 opacity-20 text-6xl font-serif`}
            >
              "
            </div>

            <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center relative z-10">
              {t("about.description")}
            </p>

            {/* Decorative quote mark */}
            <div
              className={`absolute ${
                isRTL ? "-left-2" : "-right-2"
              } -bottom-4 text-red-500 opacity-20 text-6xl font-serif`}
            >
              "
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
