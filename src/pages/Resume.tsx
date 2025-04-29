
import { useState } from 'react';
import { cn } from "@/lib/utils";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonHover } from '@/components/ui/button-hover';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { ArrowDown, Briefcase, BookOpen, FileText } from 'lucide-react';

const Resume = () => {
  const [activeSection, setActiveSection] = useState<'education' | 'experience'>('education');

  const education = [
    {
      id: 1,
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      location: "Palo Alto, CA",
      duration: "2018 - 2020",
      description: "Specialized in Human-Computer Interaction and Web Technologies. Thesis focused on improving user experience in web applications through intuitive design patterns.",
      courses: ["Advanced Web Development", "User Experience Design", "Data Visualization", "AI in Modern Applications"]
    },
    {
      id: 2,
      degree: "Bachelor of Science in Software Engineering",
      institution: "MIT",
      location: "Cambridge, MA",
      duration: "2014 - 2018",
      description: "Foundation in software development principles with focus on web and mobile technologies. Graduated with honors.",
      courses: ["Web Programming", "Database Systems", "Software Engineering Practices", "Mobile App Development"]
    }
  ];

  const experience = [
    {
      id: 1,
      role: "Senior Frontend Developer",
      company: "TechFusion Inc.",
      location: "San Francisco, CA",
      duration: "2021 - Present",
      description: "Leading a team of 5 developers to build modern web applications using React, TypeScript, and Tailwind CSS. Implemented design systems that improved development efficiency by 40%.",
      achievements: [
        "Redesigned company flagship product, increasing user engagement by 35%",
        "Introduced automated testing, reducing bugs in production by 60%",
        "Mentored junior developers, leading to increased team productivity"
      ]
    },
    {
      id: 2,
      role: "Web Developer",
      company: "Digital Innovations",
      location: "Boston, MA",
      duration: "2020 - 2021",
      description: "Developed responsive web applications for clients in finance and healthcare sectors using modern JavaScript frameworks.",
      achievements: [
        "Built a patient management system that streamlined operations by 25%",
        "Optimized website performance, improving loading speeds by 40%",
        "Implemented accessible design features, ensuring ADA compliance"
      ]
    },
    {
      id: 3,
      role: "Frontend Intern",
      company: "WebSolutions",
      location: "New York, NY",
      duration: "2019 (Summer)",
      description: "Assisted in developing UI components for various client projects using React.",
      achievements: [
        "Contributed to the development of a component library",
        "Implemented responsive designs for mobile-first applications",
        "Participated in code reviews and agile development processes"
      ]
    }
  ];

  const skills = {
    technical: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "HTML/CSS", "Tailwind CSS", "GraphQL", "REST APIs", "Git"],
    soft: ["Team Leadership", "Project Management", "Problem Solving", "Communication", "Time Management"]
  };

  return (
    <div className="min-h-screen bg-dark-200 text-white">
      <BackgroundAnimation />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="heading-highlight">Resume</span>
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              My educational background, professional experience, and technical skills
            </p>
            
            <div className="mt-8 flex justify-center">
              <ButtonHover className="flex items-center gap-2">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resume;
