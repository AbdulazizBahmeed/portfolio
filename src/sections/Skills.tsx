import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import skills from "../skills.json";

function Skills() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      { threshold: 0.1 }
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
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("skills.title")}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-red-600 rounded-full" />
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-r from-red-800 to-transparent rounded-full" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto"></p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border-2 transition-all duration-500 ${
                hoveredIndex === index
                  ? "border-red-600 shadow-2xl shadow-red-500/30 scale-105 z-10"
                  : "border-gray-800 hover:border-gray-700"
              } transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${300 + index * 50}ms` : "0ms",
              }}
            >
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-800/10 rounded-xl opacity-0 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : ""
                }`}
              />

              {/* Card content */}
              <div className="relative p-6 md:p-8 flex flex-col items-center justify-center aspect-square">
                {/* Image container with animation */}
                <div
                  className={`relative w-full max-w-[60%] md:max-w-[65%] lg:max-w-[70%] mb-4 transition-transform duration-500 ${
                    hoveredIndex === index ? "scale-110 -rotate-6" : "scale-100"
                  }`}
                >
                  <img
                    className="w-full h-auto object-contain filter transition-all duration-500"
                    src={`assets/${skill.image}`}
                    alt={t(`skills.${skill.code}`) || skill.title}
                    loading="lazy"
                  />

                  {/* Subtle glow behind image */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 blur-xl rounded-full transition-opacity duration-500 -z-10 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                {/* Skill name */}
                <h3
                  className={`text-sm md:text-base lg:text-lg font-semibold text-center transition-all duration-200 ${
                    hoveredIndex === index
                      ? "text-red-500 scale-105"
                      : "text-white"
                  }`}
                >
                  {skill.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
