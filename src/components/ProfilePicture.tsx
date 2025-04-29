import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const ProfilePicture = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Profile image path
  const profileImage = "/images/profile.png";
  
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FFDC00] to-[#FFDC00]/50 rounded-full blur-sm opacity-70 animate-pulse"></div>
      <Avatar className={`w-40 h-40 md:w-44 md:h-44 ring-2 ring-[#FFDC00]/20 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <AvatarImage 
          src={profileImage} 
          className="object-cover object-center"
          onLoad={() => setIsLoaded(true)}
        />
        <AvatarFallback className="bg-dark-300 text-[#FFDC00] text-2xl">KL</AvatarFallback>
      </Avatar>
      
      {/* Interactive elements */}
      <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-[#FFDC00] rounded-full flex items-center justify-center animate-float">
        <span className="text-dark-300 font-bold">👋</span>
      </div>
    </div>
  );
};

export default ProfilePicture;
