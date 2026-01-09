import skills from "../skills.json";

function Skills() {
  return (
    <>
      <section id="skills" className="py-30 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Technical Skills
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card bg-gray-900 p-8 rounded-lg border-2 border-gray-800 hover:border-red-600 flex flex-col items-center justify-center aspect-square"
              >
                <img
                  className="max-w-[50%] md:max-w-[60%] h-auto lg:max-w-[75%]"
                  src={`assets/${skill.image}`}
                  alt={skill.title}
                />
                <h3 className="text-base md:text-xl font-semibold text-white mt-5">
                  {skill.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;
