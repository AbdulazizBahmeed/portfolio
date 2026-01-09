import { useTranslation } from "react-i18next";


function Hero() {
    const { t } = useTranslation();

  return (
    <>
      <section
        id="hero"
        className="pt-24 pb-16 min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-black to-gray-900"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex lg:justify-between justify-center flex-align-center flex-wrap">
            <div className="lg:max-w-[60%]">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t("hero.greeting")}
              </h2>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="gradient-text">{t("hero.full_name")}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                <span className="gradient-text">{t("hero.job_title")}</span>
              </h2>
              <p className="text-gray-400 mb-8">
                {t("hero.short_bio")}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#skills"
                  className="border-2 border-red-600 text-red-500 px-8 py-3 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  {t("hero.skills")}
                </a>
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition"
                >
                  {t("hero.contact")}
                </a>
              </div>
            </div>
            <div className="flex justify-center align-center mt-10 lg:mt-0">
              <img
                className="rounded-lg h-auto max-w-70 md:max-w-90"
                src="/assets/personal-photo.jpg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
