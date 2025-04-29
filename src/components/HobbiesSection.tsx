
type Hobby = {
  title: string;
  description: string;
  icon: string;
};

const hobbies: Hobby[] = [
  {
    title: "Photography",
    description: "Capturing moments and exploring visual storytelling through street and landscape photography.",
    icon: "📷",
  },
  {
    title: "Hiking",
    description: "Exploring nature trails and mountains while disconnecting from technology and finding inspiration.",
    icon: "🏔️",
  },
  {
    title: "Reading",
    description: "Diving into books about technology, design, science fiction, and personal development.",
    icon: "📚",
  },
  {
    title: "Coffee Brewing",
    description: "Perfecting the art of brewing different coffee methods and exploring unique beans from around the world.",
    icon: "☕",
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
