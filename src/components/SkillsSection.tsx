
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  progress: number;
  category: 'frontend' | 'backend' | 'tools';
};

const skills: Skill[] = [
  { name: "HTML & CSS", progress: 95, category: 'frontend' },
  { name: "JavaScript", progress: 90, category: 'frontend' },
  { name: "React", progress: 85, category: 'frontend' },
  { name: "Tailwind CSS", progress: 90, category: 'frontend' },
  { name: "TypeScript", progress: 80, category: 'frontend' },
  { name: "Node.js", progress: 75, category: 'backend' },
  { name: "Express", progress: 80, category: 'backend' },
  { name: "MongoDB", progress: 70, category: 'backend' },
  { name: "PostgreSQL", progress: 65, category: 'backend' },
  { name: "Git", progress: 85, category: 'tools' },
  { name: "Figma", progress: 80, category: 'tools' },
  { name: "Docker", progress: 60, category: 'tools' },
];

const SkillsSection = () => {
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');

  return (
    <section id="skills" className="py-20 bg-dark-300">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="heading-highlight">Skills</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            I specialize in modern web development technologies and constantly strive to expand my skillset to deliver the best results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <SkillCategory title="Frontend Development" skills={frontendSkills} delay={0} />
          <SkillCategory title="Backend Development" skills={backendSkills} delay={0.3} />
          <SkillCategory title="Tools & Technologies" skills={toolsSkills} delay={0.6} />
        </div>
      </div>
    </section>
  );
};

const SkillCategory = ({ 
  title, 
  skills, 
  delay 
}: { 
  title: string; 
  skills: Skill[];
  delay: number;
}) => (
  <div 
    className="opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}s` }}
  >
    <h3 className="text-xl font-semibold text-white mb-6 text-center lg:text-left">{title}</h3>
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <SkillBar 
          key={skill.name} 
          skill={skill} 
          delay={delay + (index * 0.1)} 
        />
      ))}
    </div>
  </div>
);

const SkillBar = ({ 
  skill, 
  delay 
}: { 
  skill: Skill; 
  delay: number;
}) => (
  <div 
    className="opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-neutral-300">{skill.name}</span>
      <span className="text-sm text-neutral-400">{skill.progress}%</span>
    </div>
    <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
      <div 
        className={cn(
          "h-full rounded-full transition-all duration-1000",
          skill.progress >= 90 ? "bg-highlight" : 
          skill.progress >= 75 ? "bg-gradient-to-r from-highlight to-orange-500" : 
          "bg-gradient-to-r from-neutral-500 to-neutral-400"
        )}
        style={{ width: `${skill.progress}%`, transform: 'translateX(-100%)', animationDelay: `${delay + 0.3}s` }}
      ></div>
    </div>
  </div>
);

export default SkillsSection;
