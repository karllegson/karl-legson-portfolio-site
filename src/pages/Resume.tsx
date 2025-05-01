import { useState } from 'react';
import { cn } from "@/lib/utils";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { ButtonHover } from '@/components/ui/button-hover';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { ArrowDown, Briefcase, BookOpen, FileText } from 'lucide-react';
import ContactSection from '@/components/ContactSection';

const Resume = () => {
  const [activeSection, setActiveSection] = useState<'education' | 'experience'>('education');

  const education = [
    {
      id: 1,
      degree: "Bachelor of Science in Business Administration, Cum Laude",
      institution: "California State University, Stanislaus",
      location: "Modesto, California",
      duration: "May 2024",
      description: "Concentration: Computer Information Systems",
      courses: ["Database Management", "Systems Analysis", "Advanced Python Programming"]
    }
  ];

  const experience = [
    {
      id: 1,
      role: "Web Developer Intern",
      company: "Digital NEST",
      location: "Modesto, California",
      duration: "August 2024 - Present",
      description: "Collaborate with web development interns and UI designers to develop responsive websites from Figma designs.",
      achievements: [
        "Develop and customize WordPress websites for clients, integrating plugins and custom solutions",
        "Design and implement front-end functionalities, including dynamic filtering, search tools, and API integrations",
        "Utilize Git and GitHub for version control, ensuring efficient collaboration and clean code management",
        "Participate in project scoping and daily stand-up meetings to align tasks and ensure timely project progression"
      ]
    },
    {
      id: 2,
      role: "SEO Content Poster",
      company: "Level 10 Contractor",
      location: "Remote",
      duration: "January 2025 - Present",
      description: "Manage and optimize website content for improved SEO and user experience.",
      achievements: [
        "Publish and format blog posts, service area pages, and landing pages in WordPress",
        "Optimize images with accurate titles and alt descriptions to enhance SEO and accessibility",
        "Audit and maintain site links, ensuring seamless navigation and functional user experience",
        "Collaborate with web developers to align content with site structure and design updates"
      ]
    },
    {
      id: 3,
      role: "Information Technology Intern",
      company: "Stanislaus Union School District",
      location: "Modesto, California",
      duration: "January 2024 - May 2024",
      description: "Provided technical support and maintenance across multiple school sites.",
      achievements: [
        "Resolved technical tickets effectively, maintaining a high first-call resolution rate",
        "Assisted in complex installations and promoted teamwork by supporting other technicians",
        "Provided efficient troubleshooting for hardware and software issues, enhancing system reliability"
      ]
    }
  ];

  const skills = {
    technical: ["React", "TypeScript", "HTML", "CSS", "JavaScript", "WordPress", "Python", "Firebase", "Git/GitHub", "SQL"],
    soft: ["Team Collaboration", "Problem Solving", "Communication", "Time Management", "Bilingual (English, Tagalog)"],
    certifications: ["IT Network Pro (Specialized Network Management)"]
  };

  return (
    <div className="min-h-screen bg-dark-200 text-white">
      <BackgroundAnimation />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="heading-highlight">Resume</span>
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              My educational background, professional experience, and technical skills
            </p>
            
            <div className="mt-8 flex justify-center">
              <ButtonHover 
                className="flex items-center gap-2"
                onClick={() => window.open('/resume.pdf', '_blank')}
              >
                <FileText className="w-5 h-5" />
                Download Resume PDF
              </ButtonHover>
            </div>
          </header>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="p-1 bg-dark-300 rounded-full flex shadow-lg">
              <button
                onClick={() => setActiveSection('education')}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                  activeSection === 'education' 
                    ? "bg-highlight text-dark-300" 
                    : "hover:bg-dark-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Education</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveSection('experience')}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                  activeSection === 'experience' 
                    ? "bg-highlight text-dark-300" 
                    : "hover:bg-dark-100"
                )}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Experience</span>
                </div>
              </button>
            </div>
          </div>
          
          {/* Education Section */}
          <div className={cn(
            "transition-all duration-500",
            activeSection === 'education' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'
          )}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-highlight" />
              Education
            </h2>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <Card 
                  key={edu.id} 
                  className="bg-dark-100 border-neutral-800 overflow-hidden opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <CardTitle className="text-xl">
                        <span className="text-highlight">{edu.degree}</span>
                      </CardTitle>
                      <span className="text-sm text-neutral-400 bg-dark-300/50 px-3 py-1 rounded-full">
                        {edu.duration}
                      </span>
                    </div>
                    <div className="text-neutral-300">
                      {edu.institution}, {edu.location}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-neutral-400 mb-4">
                      {edu.description}
                    </p>
                    
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center gap-2 text-sm text-highlight hover:underline">
                        <span>Relevant Coursework</span>
                        <ArrowDown className="w-3 h-3" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3 pt-3 border-t border-neutral-800">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {edu.courses.map((course, i) => (
                            <li key={i} className="text-sm text-neutral-300 flex items-start">
                              <span className="text-highlight mr-2">•</span>
                              {course}
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Experience Section */}
          <div className={cn(
            "transition-all duration-500",
            activeSection === 'experience' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'
          )}>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-highlight" />
              Professional Experience
            </h2>
            
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <Card 
                  key={exp.id} 
                  className="bg-dark-100 border-neutral-800 overflow-hidden opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <CardTitle className="text-xl">
                        <span className="text-highlight">{exp.role}</span>
                      </CardTitle>
                      <span className="text-sm text-neutral-400 bg-dark-300/50 px-3 py-1 rounded-full">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="text-neutral-300">
                      {exp.company}, {exp.location}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-neutral-400 mb-4">
                      {exp.description}
                    </p>
                    
                    <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-neutral-300 flex items-start">
                          <span className="text-highlight mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="mt-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-semibold mb-6">Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-dark-100 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-lg">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-dark-300 rounded-full text-sm text-neutral-300 border border-neutral-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-100 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-lg">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-dark-300 rounded-full text-sm text-neutral-300 border border-neutral-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-16">
            <BackButton />
          </div>
        </div>
      </main>
      
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Resume;
