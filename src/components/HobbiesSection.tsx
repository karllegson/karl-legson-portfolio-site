type Hobby = {
  title: string;
  description: string;
  icon: string;
};

const hobbies: Hobby[] = [
  {
    title: "Music",
    description: "Passionate about music and its ability to inspire and energize. Always exploring new genres and artists.",
    icon: "🎵",
  },
  {
    title: "Billiards",
    description: "Enjoy playing pool, mastering precision shots, and the strategic aspects of the game.",
    icon: "🎱",
  },
  {
    title: "Aviation",
    description: "Flying airplanes and experiencing the freedom of the skies. Passionate about aviation and aerial adventures.",
    icon: "✈️",
  },
  {
    title: "Motorcycles",
    description: "Love the thrill and freedom of riding motorcycles. Exploring new routes and experiencing the open road.",
    icon: "🏍️",
  },
];

const HobbiesSection = () => {
  return (
    <section id="hobbies" className="py-20 bg-dark-200 relative grid-background">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-300/80 to-dark-200/80 pointer-events-none"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="heading-highlight">Hobbies</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Beyond coding, I enjoy various activities that help me stay balanced and inspired. Here are some of my interests outside of work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hobbies.map((hobby, index) => (
            <div 
              key={hobby.title}
              className="bg-dark-300/50 backdrop-blur-sm rounded-xl p-8 border border-neutral-800 transition-all duration-300 hover:border-neutral-700 opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="mb-4 text-4xl">{hobby.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{hobby.title}</h3>
              <p className="text-neutral-400">{hobby.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
