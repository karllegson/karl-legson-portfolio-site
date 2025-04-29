
import { useState } from 'react';
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React and Node.js",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    url: "#",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A minimalist portfolio website for a photographer",
    tags: ["React", "Tailwind CSS", "Framer Motion", "NextJS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    url: "#",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity app for managing tasks and projects",
    tags: ["React", "Redux", "Express", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    url: "#",
  },
  {
    id: 4,
    title: "Travel Blog",
    description: "A blog website for sharing travel experiences",
    tags: ["React", "GraphQL", "Contentful", "Gatsby"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    url: "#",
  },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  const filters = ['All', 'React', 'Node.js', 'Tailwind CSS'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section 
      id="projects" 
      className="py-20 relative grid-background"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-200/80 to-dark-300/80 pointer-events-none"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My <span className="heading-highlight">Projects</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project represents my passion for creating beautiful and functional web experiences.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all",
                  activeFilter === filter 
                    ? "bg-highlight text-white" 
                    : "bg-dark-100 text-neutral-400 hover:bg-dark-100/70 hover:text-white"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <a 
              key={project.id} 
              href={project.url} 
              className="project-card opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 * index}s` }}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover"
              />
              <div className="project-content">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-neutral-300 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs bg-black/50 text-white px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
