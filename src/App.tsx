import "./App.css";
import NavBar from "./sections/NavBar";
import Hero from "./sections/Hero";
import AboutMe from "./sections/AboutMe";
import Skills from "./sections/Skills";
import ContactMe from "./sections/ContactMe";
import Footer from "./sections/Footer";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <NavBar />
      <Hero />
      <AboutMe />
      <Skills />
      <ContactMe />
      <Footer />
    </>
  );
}

export default App;
