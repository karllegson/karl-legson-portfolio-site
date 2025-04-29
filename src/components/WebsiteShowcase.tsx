
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ButtonHover } from './ui/button-hover';
import { ExternalLink } from 'lucide-react';

type WebsiteProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  status?: string;
};

const websites: WebsiteProject[] = [
  {
    id: 1,
    title: "Invention Convention",
    description: "A platform for young inventors to showcase their innovative ideas and creations.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop",
    url: "#",
    date: "February 2025",
    status: "In Development"
  },
  {
    id: 2,
    title: "All Peoples Church",
    description: "A modern church website with a clean, responsive design for community engagement.",
    image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1471&auto=format&fit=crop",
    url: "#",
    date: "January 2025"
  },
  {
    id: 3,
    title: "Personal Portfolio",
    description: "A creative portfolio website with interactive elements highlighting achievements.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1470&auto=format&fit=crop",
    url: "#",
    date: "December 2024"
  }
];

const WebsiteShowcase = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="website-showcase" className="py-24 relative overflow-hidden bg-dark-300">
      <div className="absolute inset-0 opacity-10 grid-background"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-[#FFDC00]">Projects</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              A showcase of recent websites I've designed and developed
            </p>
          </div>
          
          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-10 transition-all duration-500 opacity-0",
            isLoaded && "opacity-100"
          )}>
            {websites.map((website) => (
              <div 
                key={website.id}
                className="group bg-dark-200 border border-neutral-800 rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFDC00]/5 hover:border-neutral-700"
              >
                {/* Website Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={website.image}
                    alt={website.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-70"></div>
                </div>
                
                {/* Website Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">
                      {website.title}
                    </h3>
                    <span className="text-xs px-3 py-1.5 rounded-full border border-[#FFDC00]/30 text-[#FFDC00] bg-[#FFDC00]/5">
                      {website.date}
                    </span>
                  </div>
                  
                  <p className="text-neutral-400 mb-6">
                    {website.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <ButtonHover 
                      href={website.url}
                      target="_blank"
                      className="bg-[#FFDC00]/10 border-[#FFDC00]/30 hover:bg-[#FFDC00]/20"
                    >
                      <span className="text-[#FFDC00]">Visit Website</span>
                      <ExternalLink className="w-4 h-4 text-[#FFDC00]" />
                    </ButtonHover>
                    
                    {website.status && (
                      <span className="text-xs px-3 py-1.5 rounded-full bg-neutral-800 text-neutral-400">
                        {website.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteShowcase;
