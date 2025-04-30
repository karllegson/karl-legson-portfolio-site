import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ButtonHover } from './ui/button-hover';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <ButtonHover
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 bg-dark-200/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-dark-200 transition-colors border border-neutral-700"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </ButtonHover>
  );
};

export default BackButton; 