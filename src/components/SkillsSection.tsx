import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  progress: number;
  category: 'frontend' | 'backend' | 'tools';
};

const skills: Skill[] = [
  // Frontend Development
  { name: "HTML & CSS", progress: 92, category: 'frontend' },
  { name: "JavaScript", progress: 88, category: 'frontend' },
  { name: "React", progress: 85, category: 'frontend' },
  { name: "Next.js", progress: 78, category: 'frontend' },
  { name: "TypeScript", progress: 75, category: 'frontend' },
  { name: "Tailwind CSS", progress: 90, category: 'frontend' },
  
  // Backend Development
  { name: "Node.js", progress: 75, category: 'backend' },
  { name: "REST APIs", progress: 80, category: 'backend' },
  { name: "Python", progress: 78, category: 'backend' },
  { name: "MySQL", progress: 72, category: 'backend' },
  { name: "Firebase", progress: 76, category: 'backend' },
  { name: "Database Management", progress: 75, category: 'backend' },
  
  // Tools & Technologies
  { name: "Git/GitHub", progress: 88, category: 'tools' },
  { name: "CI/CD", progress: 70, category: 'tools' },
  { name: "Debugging", progress: 85, category: 'tools' },
  { name: "Problem Solving", progress: 86, category: 'tools' },
  { name: "SEO Optimization", progress: 82, category: 'tools' },
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
          "h-full rounded-full animate-slide-right",
          skill.progress >= 90 ? "bg-gradient-to-r from-neutral-400/70 to-neutral-500/70" : 
          skill.progress >= 80 ? "bg-gradient-to-r from-neutral-400/60 to-neutral-500/60" : 
          "bg-gradient-to-r from-neutral-400/50 to-neutral-500/50"
        )}
        style={{ 
          width: `${skill.progress}%`,
          animationDelay: `${delay + 0.5}s`
        }}
      ></div>
    </div>
  </div>
);

export default SkillsSection;
