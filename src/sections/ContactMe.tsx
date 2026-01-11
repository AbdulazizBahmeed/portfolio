import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

function ContactMe() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  function validate() {
    let isSucceeded = true;
    const newErrors = {
      full_name: "",
      email: "",
      content: "",
    };

    if (!form.full_name.trim()) {
      newErrors.full_name = t("validation.full_name.required");
      isSucceeded = false;
    }

    if (!form.email.trim()) {
      newErrors.email = t("validation.email.required");
      isSucceeded = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = t("validation.email.invalid_email");
      isSucceeded = false;
    }

    if (!form.content.trim()) {
      newErrors.content = t("validation.content.required");
      isSucceeded = false;
    }

    setErrors(newErrors);
    return isSucceeded;
  }

  async function handleSend() {
    if (!validate()) return;
    setErrors({
      full_name: "",
      email: "",
      content: "",
    });
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const json = await response.json();
          toast.error(json.message);
        } else {
          toast.error(t("contact.server_error"));
        }
      } else {
        setForm({ full_name: "", email: "", content: "" });
        toast.success(t("contact.success_message"));
      }
    } catch (error) {
      toast.error(t("contact.error_message"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-20 bg-gradient-to-br from-gray-900 via-black to-red-950 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-10 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("contact.title")}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-red-600 rounded-full" />
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-r from-red-800 to-transparent rounded-full" />
          </div>
        </div>

        {/* Contact Form */}
        <div
          className={`max-w-2xl mx-auto transform transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-8 shadow-2xl border border-gray-800">
            <div className="space-y-6">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t("contact.name")}
                </label>
                <div className="relative">
                  <input
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none text-white placeholder-gray-500 transition-all duration-300 ${
                      errors.full_name
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                        : focusedField === "full_name"
                        ? "border-red-500 ring-2 ring-red-500/50"
                        : "border-gray-700 hover:border-gray-600"
                    } disabled:bg-gray-900 disabled:text-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed disabled:opacity-60`}
                    placeholder={t("contact.name_placeholder")}
                    type="text"
                    value={form.full_name}
                    disabled={isLoading}
                    onFocus={() => setFocusedField("full_name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setForm({ ...form, full_name: e.target.value })
                    }
                  />
                  {errors.full_name && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.full_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t("contact.email")}
                </label>
                <div className="relative">
                  <input
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none text-white placeholder-gray-500 transition-all duration-300 ${
                      errors.email
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                        : focusedField === "email"
                        ? "border-red-500 ring-2 ring-red-500/50"
                        : "border-gray-700 hover:border-gray-600"
                    } disabled:bg-gray-900 disabled:text-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed disabled:opacity-60`}
                    placeholder='abdulaziz@bahmeed.dev'
                    type="email"
                    value={form.email}
                    disabled={isLoading}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t("contact.content")}
                </label>
                <div className="relative">
                  <textarea
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none ${
                      errors.content
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                        : focusedField === "content"
                        ? "border-red-500 ring-2 ring-red-500/50"
                        : "border-gray-700 hover:border-gray-600"
                    } disabled:bg-gray-900 disabled:text-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed disabled:opacity-60`}
                    placeholder={t("contact.content_placeholder")}
                    value={form.content}
                    disabled={isLoading}
                    onFocus={() => setFocusedField("content")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    rows={5}
                  />
                  {errors.content && (
                    <p className="mt-2 text-red-500 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.content}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="group relative w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/50 hover:scale-[1.02] active:scale-95 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-70 disabled:hover:scale-100"
                disabled={isLoading}
                onClick={handleSend}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      <span>{t("contact.sending")}</span>
                    </>
                  ) : (
                    <>
                      <span>{t("contact.send")}</span>
                      <svg className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMe;