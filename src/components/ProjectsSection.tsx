import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ButtonHover } from './ui/button-hover';
import { ExternalLink, Construction, ChevronDown, ChevronUp, X } from 'lucide-react';
import ImageModal from './ImageModal';

type Project = {
  id: number;
  title: string;
  description: string | JSX.Element;
  imageBefore: string;
  imageAfter: string;
  additionalImages?: string[];
  url: string;
  githubUrl?: string;
  date: string;
  status?: string;
};

const projects: Project[] = [
  {
    id: 7,
    title: "WitWars.com",
    description: "WitWars is a social web app I built after my coworkers and I joked about ranking who's the funniest. It lets users create profiles, add friends, and trade witty messages in real time. Built with React, Vite, Tailwind CSS, Firebase, React Router, and Radix UI, it's fast, fun, and designed for playful interactions.",
    imageBefore: "/images/witwarsplanning.png",
    imageAfter: "/images/witwars.png",
    additionalImages: [
      "/images/witwars1.png",
      "/images/witwars2.png",
      "/images/witwars3.png"
    ],
    url: "https://witwars.com",
    githubUrl: "https://github.com/karllegson/witwars",
    date: "2025",
    status: "Completed"
  },
  {
    id: 6,
    title: "NormalText.com",
    description: "NormalText is a clean, modern web app that I developed entirely on my own. It serves a simple yet practical purpose: paste in any formatted text, and it instantly strips out all formatting, leaving you with clean, plain text. I created NormalText because I personally needed a quick and reliable way to remove formatting—especially when copying content from tools like ChatGPT or other AI platforms. The site is straightforward, minimalist, and designed for efficiency.",
    imageBefore: "/images/normaltextplanning.png",
    imageAfter: "/images/normaltext.png",
    additionalImages: [
      "/images/normaltext1.png",
      "/images/normaltext2.png",
      "/images/normaltext3.png"
    ],
    url: "https://normaltext.com",
    githubUrl: "https://github.com/karllegson/normaltext",
    date: "2025",
    status: "Completed"
  },
  {
    id: 5,
    title: "HTML Studio Pro",
    description: "HTML Studio Pro is a full-stack custom web application I built to support my SEO content posting work. Developed with React, TypeScript, Tailwind CSS, and Firebase, and deployed on Vercel, it streamlines formatting and prep tasks—allowing me to work faster and handle more volume. This tool directly boosted my efficiency, helping me scale from 50 to over 120 tasks per week and significantly increase my earning potential.",
    imageBefore: "/images/htmlstudioproplanning.png",
    imageAfter: "/images/htmlstudiopro.png",
    additionalImages: [
      "/images/htmlstudiopro1.png",
      "/images/htmlstudiopro2.png",
      "/images/htmlstudiopro3.png"
    ],
    url: "https://html-studio-pro.vercel.app/",
    githubUrl: "https://github.com/karllegson/html-studio-pro",
    date: "May 2025",
    status: "Completed"
  },
  {
    id: 1,
    title: "Volunteer Connect",
    description: "A web application designed to streamline the process of matching volunteers with service opportunities. The platform allows organizations to post volunteer events and users to browse, filter, and sign up based on their interests, skills, and availability.",
    imageBefore: "/images/VolunteerConnectPlanning.png",
    imageAfter: "/images/VolunteerConnect.png",
    additionalImages: [
      "/images/VolunteerConnect1.png",
      "/images/VolunteerConnect2.png",
      "/images/VolunteerConnect3.png"
    ],
    url: "",
    githubUrl: "https://github.com/joavelar/VolunteerConnect",
    date: "February 2025",
    status: "In Development"
  },
  {
    id: 2,
    title: "Career Harvest",
    description: "Contributed to the frontend development of a web application that aggregates internship listings from sources like LinkedIn. Implemented user-facing features such as filtering, saving jobs, and marking applications as submitted.",
    imageBefore: "/images/CareerHarvestPlanning.png",
    imageAfter: "/images/CareerHarvest.png",
    additionalImages: [
      "/images/CareerHarvest1.png",
      "/images/CareerHarvest2.png",
      "/images/CareerHarvest3.png"
    ],
    url: "https://careerharvest.org",
    githubUrl: "https://github.com/BizzNEST/career-harvest",
    date: "March 2024",
    status: "In Development"
  },
  {
    id: 3,
    title: "BizzNest Scheduler",
    description: "NESTwork is a randomized scheduling app built with HTML, CSS, and JavaScript. The application pairs or groups interns from various locations and departments based on customizable rules.",
    imageBefore: "/images/BizzNESTPlanning.png",
    imageAfter: "/images/Bizznest-scheduler.png",
    additionalImages: [
      "/images/BizzNest1.png",
      "/images/BizzNest2.png",
      "/images/BizzNest3.png"
    ],
    url: "https://bizznest.github.io/modesto-bizznest-scheduler/",
    githubUrl: "https://github.com/BizzNEST/modesto-bizznest-scheduler",
    date: "December 2024",
    status: "Completed"
  },
  {
    id: 4,
    title: "Landing Pages for a Home Service Companies",
    description: <>I code landing pages, subpages, and blog posts for <span className="text-emerald-400 font-bold">28+</span> home service companies. My focus is on clean, semantic HTML that supports search engine visibility, fast load times, and responsive performance. These pages are built to align with each company's marketing goals and SEO strategy, ensuring the content is structured effectively for both users and crawlers.</>,
    imageBefore: "/images/HomeServiceCompanyPlanning.png",
    imageAfter: "/images/HomeServiceCompany.png",
    additionalImages: [
      "/images/HomeServiceCompany1.png",
      "/images/HomeServiceCompany2.png",
      "/images/HomeServiceCompany3.png"
    ],
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
              See my latest projects
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
                  className="relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer mb-2"
                  onClick={() => setSelectedImage(
                    viewStates[project.id] === 'planning' 
                      ? project.imageBefore 
                      : project.imageAfter
                  )}
                >
                  <img 
                    src={viewStates[project.id] === 'planning' ? project.imageBefore : project.imageAfter}
                    alt={project.title}
                    className="w-full h-full object-contain bg-dark-100 transition-all duration-700"
                  />
                </div>
                
                <div className="flex flex-col gap-3 mt-2">
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
                        project.title === "Volunteer Connect" || project.title === "Landing Pages for a Home Service Companies"
                          ? "bg-neutral-800/50 border-neutral-700 cursor-not-allowed"
                          : "bg-[#FFDC00]/10 border-[#FFDC00]/30 hover:bg-[#FFDC00]/20"
                      )}
                      onClick={(e) => {
                        if (project.title === "Volunteer Connect" || project.title === "Landing Pages for a Home Service Companies") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <span className={cn(
                        "text-xs whitespace-nowrap",
                        project.title === "Volunteer Connect" || project.title === "Landing Pages for a Home Service Companies" ? "text-neutral-400" : "text-[#FFDC00]"
                      )}>
                        Visit Website
                      </span>
                      <ExternalLink className={cn(
                        "w-3 h-3",
                        project.title === "Volunteer Connect" || project.title === "Landing Pages for a Home Service Companies" ? "text-neutral-400" : "text-[#FFDC00]"
                      )} />
                    </ButtonHover>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-dark-100 p-2 rounded-lg text-neutral-400 hover:text-white transition-colors"
                        aria-label="GitHub"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
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
        additionalImages={
          selectedImage && projects.find(p => p.imageAfter === selectedImage)?.additionalImages || []
        }
        altText="Project preview"
      />
    </section>
  );
};

export default ProjectsSection;
