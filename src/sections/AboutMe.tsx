function AboutMe() {
  return (
    <>
      <section id="about" className="py-30 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mb-8"></div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed text-center">
            With extensive experience in cloud infrastructure and DevOps
            practices, I specialize in building robust CI/CD pipelines,
            implementing GitOps workflows, and orchestrating containerized
            applications. My passion lies in automating processes and creating
            scalable, reliable systems that enable teams to deliver software
            faster and more efficiently. I thrive on solving complex
            infrastructure challenges and continuously learning new technologies
            to stay at the forefront of the DevOps landscape.
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutMe;
