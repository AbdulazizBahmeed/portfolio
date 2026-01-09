import { useTranslation } from "react-i18next";


function AboutMe() {
  const { t } = useTranslation();

  return (
    <>
      <section id="about" className="py-30 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("about.title")}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mb-8"></div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed text-center">
            {t("about.description")}
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutMe;
