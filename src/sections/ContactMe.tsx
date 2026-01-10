import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-hot-toast";

function ContactMe() {
  const { t } = useTranslation();
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
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = t("validation.email.invalid_email");
      isSucceeded = false;
    }

    if (!form.content.trim()) {
      newErrors.content = t("validation.content.required");
      isSucceeded = false;
    }
    console.log(newErrors);

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
        if (response.status == 422) {
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
                  className="
                  w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white disabled:bg-gray-900 disabled:text-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:focus:ring-0"
                  placeholder={t("contact.name")}
                  type="text"
                  value={form.full_name}
                  disabled={isLoading}
                  onChange={(e) =>
                    setForm({ ...form, full_name: e.target.value })
                  }
                />
                {errors.full_name && (
                  <p className="px-3 text-red-500 text-sm">
                    {errors.full_name}
                  </p>
                )}
                <input
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white disabled:bg-gray-900 disabled:text-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:focus:ring-0"
                  placeholder={t("contact.email")}
                  type="email"
                  value={form.email}
                  disabled={isLoading}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="px-3 text-red-500 text-sm">{errors.email}</p>
                )}
                <textarea
                  className="w-full px-4 pt-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white disabled:bg-gray-900 disabled:text-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:focus:ring-0"
                  placeholder={t("contact.content")}
                  value={form.content}
                  disabled={isLoading}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={5}
                ></textarea>
                {errors.content && (
                  <p className="px-3 pb-3 text-red-500 text-sm disabled:bg-gray-900 disabled:text-gray-500 disabled:border-gray-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:focus:ring-0 ">
                    {errors.content}
                  </p>
                )}
                <button
                  className="flex items-center justify-center w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-70"
                  disabled={isLoading}
                  onClick={() => handleSend()}
                >
                  {isLoading ? (
                    <svg
                      className="h-5 w-5 animate-spin text-white"
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
                  ) : (
                    t("contact.send")
                  )}
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
