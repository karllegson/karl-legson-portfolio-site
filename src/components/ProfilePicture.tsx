import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const ProfilePicture = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Profile image path
  const profileImage = "/images/profile-photo.png";
  
  return (
    <div className="relative flex items-center justify-center">
      <Avatar className={`w-48 h-48 md:w-52 md:h-52 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <AvatarImage 
          src={profileImage} 
          className="object-cover scale-125 object-[center_40%]"
          onLoad={() => setIsLoaded(true)}
        />
        <AvatarFallback className="bg-dark-300 text-neutral-400 text-2xl">KL</AvatarFallback>
      </Avatar>
      
      {/* Interactive elements */}
      <div className="absolute -right-2 -bottom-4 w-10 h-10 bg-[#FFDC00] rounded-full flex items-center justify-center animate-float">
        <span className="text-dark-300 font-bold">👋</span>
      </div>
    </div>
  );
};

export default ProfilePicture;
