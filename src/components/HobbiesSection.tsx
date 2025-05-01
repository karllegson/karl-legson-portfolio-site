type Hobby = {
  description: string;
  icon: string;
};

const hobbies: Hobby[] = [
  {
    description: "In a past life, I might’ve been in a band that never made it out of the garage. These days, I rotate between guitar, bass, drums, and piano—basically trying to become a one-person jam session without bothering the neighbors too much. It’s chaotic, but fun.",
    icon: "♫",
  },
  {
    description: "Billiards is my way of pretending I understand physics. It's a calm, strategic game—until I miss an easy shot and suddenly question every decision I've ever made. Still, it's a good excuse to lean on a cue stick and look like I know what I'm doing.",
    icon: "⓼",
  },
  {
    description: "Yes, I fly planes. Not in a \"Top Gun\" way—more in a \"follows all FAA regulations and double-checks checklists\" kind of way. Flying is where focus and freedom meet, and also where I get to talk to air traffic controllers who sound suspiciously cooler than me on the radio.",
    icon: "✈︎",
  },
  {
    description: "Motorcycles are my preferred way of pretending I'm in a music video while dodging bugs at high speeds. I ride for the sense of freedom, the connection to the road, and to see how many layers of gear it takes to not freeze in 60-degree weather. It's dangerous, thrilling, and yes—my mom hates it.",
    icon: "🏍",
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
              key={hobby.icon}
              className="bg-dark-300/50 backdrop-blur-sm rounded-xl p-8 border border-neutral-800 transition-all duration-300 hover:border-neutral-700 opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="mb-4 text-5xl">{hobby.icon}</div>
              <p className="text-neutral-400">{hobby.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
