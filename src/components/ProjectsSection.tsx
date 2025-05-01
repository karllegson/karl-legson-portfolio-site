import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ButtonHover } from './ui/button-hover';
import { ExternalLink, Construction, ChevronDown, ChevronUp, X } from 'lucide-react';
import ImageModal from './ImageModal';

type Project = {
  id: number;
  title: string;
  description: string;
  imageBefore: string;
  imageAfter: string;
  url: string;
  date: string;
  status?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Volunteer Connect",
    description: "A web application designed to streamline the process of matching volunteers with service opportunities. The platform allows organizations to post volunteer events and users to browse, filter, and sign up based on their interests, skills, and availability.",
    imageBefore: "/images/VolunteerConnectPlanning.png",
    imageAfter: "/images/VolunteerConnect.png",
    url: "",
    date: "February 2025",
    status: "In Development"
  },
  {
    id: 2,
    title: "Career Harvest",
    description: "Contributed to the frontend development of a web application that aggregates internship listings from sources like LinkedIn. Implemented user-facing features such as filtering, saving jobs, and marking applications as submitted.",
    imageBefore: "/images/CareerHarvestPlanning.png",
    imageAfter: "/images/CareerHarvest.png",
    url: "https://careerharvest.org",
    date: "March 2024",
    status: "In Development"
  },
  {
    id: 3,
    title: "BizzNest Scheduler",
    description: "NESTwork is a randomized scheduling app built with HTML, CSS, and JavaScript. The application pairs or groups interns from various locations and departments based on customizable rules.",
    imageBefore: "/images/BizzNESTPlanning.png",
    imageAfter: "/images/Bizznest-scheduler.png",
    url: "https://bizznest.github.io/modesto-bizznest-scheduler/",
    date: "December 2024",
    status: "Completed"
  },
  {
    id: 4,
    title: "Landing Pages for a Home Services Company",
    description: "I code landing pages, subpages, and blog posts for various home service companies, using content provided by SEO and content teams. My focus is on clean, semantic HTML that supports search engine visibility, fast load times, and responsive performance. These pages are built to align with each company's marketing goals and SEO strategy, ensuring the content is structured effectively for both users and crawlers.",
    imageBefore: "/images/HomeServiceCompanyPlanning.png",
    imageAfter: "/images/HomeServiceCompany.png",
    url: "",
    date: "January 2025",
    status: "Completed"
  }
];

const ProjectsSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewStates, setViewStates] = useState<{ [key: number]: 'planning' | 'actual' }>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    setIsLoaded(true);
    const initialStates = projects.reduce((acc, project) => {
      acc[project.id] = 'actual';
      return acc;
    }, {} as { [key: number]: 'planning' | 'actual' });
    setViewStates(initialStates);

    // Initialize all descriptions as collapsed
    const initialDescriptions = projects.reduce((acc, project) => {
      acc[project.id] = false;
      return acc;
    }, {} as { [key: number]: boolean });
    setExpandedDescriptions(initialDescriptions);
  }, []);

  const toggleView = (projectId: number) => {
    setViewStates(prev => ({
      ...prev,
      [projectId]: prev[projectId] === 'planning' ? 'actual' : 'planning'
    }));
  };

  const toggleDescription = (projectId: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <section id="projects" className="py-12 relative overflow-hidden bg-dark-300">
      <div className="absolute inset-0 opacity-10 grid-background"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-[#FFDC00] text-xs font-medium mb-2 tracking-wider">
              COLLABORATIVE PROJECTS WITH REAL IMPACT
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              See our latest projects
            </h2>
          </div>
          
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 opacity-0",
            isLoaded && "opacity-100"
          )}>
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    {project.status === "In Development" && (
                      <div className="flex items-center gap-1 bg-[#FFDC00]/10 px-2 py-0.5 rounded-full">
                        <Construction className="w-3 h-3 text-[#FFDC00]" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleView(project.id)}
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
                        viewStates[project.id] === 'planning' 
                          ? "bg-[#FFDC00] text-black"
                          : "bg-transparent text-white border border-white/20"
                      )}
                    >
                      Planning
                    </button>
                    <button
                      onClick={() => toggleView(project.id)}
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
                        viewStates[project.id] === 'actual'
                          ? "bg-[#FFDC00] text-black"
                          : "bg-transparent text-white border border-white/20"
                      )}
                    >
                      Actual
                    </button>
                  </div>
                </div>
                
                {/* Project Image */}
                <div 
                  className="relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer mb-3"
                  onClick={() => setSelectedImage(
                    viewStates[project.id] === 'planning' 
                      ? project.imageBefore 
                      : project.imageAfter
                  )}
                >
                  <img 
                    src={viewStates[project.id] === 'planning' ? project.imageBefore : project.imageAfter}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-all duration-700"
                  />
                </div>
                
                <div className="flex flex-col gap-3 mt-6">
                  <div 
                    className="relative cursor-pointer group/description"
                    onClick={() => toggleDescription(project.id)}
                  >
                    <p className={cn(
                      "text-neutral-400 text-xs leading-relaxed transition-all duration-300 pr-8",
                      !expandedDescriptions[project.id] && "line-clamp-2"
                    )}>
                      {project.description}
                    </p>
                    <button 
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors"
                      aria-label={expandedDescriptions[project.id] ? "Collapse description" : "Expand description"}
                    >
                      {expandedDescriptions[project.id] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-white">
                      {project.date}
                    </span>
                    <ButtonHover 
                      href={project.url}
                      target="_blank"
                      className={cn(
                        "py-1 px-2",
                        project.title === "Volunteer Connect"
                          ? "bg-neutral-800/50 border-neutral-700 cursor-not-allowed"
                          : "bg-[#FFDC00]/10 border-[#FFDC00]/30 hover:bg-[#FFDC00]/20"
                      )}
                      onClick={(e) => {
                        if (project.title === "Volunteer Connect") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <span className={cn(
                        "text-xs whitespace-nowrap",
                        project.title === "Volunteer Connect" ? "text-neutral-400" : "text-[#FFDC00]"
                      )}>
                        Visit Website
                      </span>
                      <ExternalLink className={cn(
                        "w-3 h-3",
                        project.title === "Volunteer Connect" ? "text-neutral-400" : "text-[#FFDC00]"
                      )} />
                    </ButtonHover>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage || ''}
        altText="Project preview"
      />
    </section>
  );
};

export default ProjectsSection;
