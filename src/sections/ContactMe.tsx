import { useTranslation } from "react-i18next";

function ContactMe() {
  const { t } = useTranslation();

  return (
    <>
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-gray-900 via-black to-red-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">
              {t("contact.title")}
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="md:w-3/5 mx-auto">
            <div className="bg-gray-900 rounded-lg p-8 shadow-2xl border border-gray-800">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t("contact.name")}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                />
                <input
                  type="email"
                  placeholder={t("contact.email")}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                />
                <textarea
                  placeholder={t("contact.message")}
                  rows={6}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                ></textarea>
                <button className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition">
                  {t("contact.send")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactMe;
