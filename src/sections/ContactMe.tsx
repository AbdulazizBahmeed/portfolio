import { useTranslation } from "react-i18next";
import { useState } from "react";

function ContactMe() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  function validate() {
    let isSucceeded = true;
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isSucceeded = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
      isSucceeded = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isSucceeded = false;
    }
    console.log(newErrors);

    setErrors(newErrors);
    return isSucceeded;
  }

  async function handleSend() {
    if (!validate()) return;
    setErrors({
      name: "",
      email: "",
      message: "",
    });
    setLoading(true);

    try {
      //   const response = await fetch("https://api.example.com/contact", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(form),
      //   });

      //   if (!response.ok) {
      //     alert("Something went wrong with server. Please try again.");
      //   }

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                  placeholder={t("contact.name")}
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <p className="px-3 text-red-500 text-sm">{errors.name}</p>
                )}
                <input
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                  placeholder={t("contact.email")}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="px-3 text-red-500 text-sm">{errors.email}</p>
                )}
                <textarea
                  className="w-full px-4 pt-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                  placeholder={t("contact.message")}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={5}
                ></textarea>
                {errors.message && (
                  <p className="px-3 pb-3 text-red-500 text-sm">{errors.message}</p>
                )}
                <button
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition"
                  onClick={() => handleSend()}
                >
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
