import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface LocationState {
  scrollTo?: string;
}

export const useScrollToSection = () => {
  const location = useLocation();
  const pageLoaded = useRef(false);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.scrollTo && !pageLoaded.current) {
      const sectionId = state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      pageLoaded.current = true;
    }
  }, [location]);
}; 