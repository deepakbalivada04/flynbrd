import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const ScrollContext = createContext({
  scrollProgress: 0,
  currentPhase: 1,
  setScrollProgress: () => {},
  setCurrentPhase: () => {},
  scrollProgressRef: { current: 0 },
  scrollToPhase: () => {},
});

export const ScrollProvider = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(1);
  const scrollProgressRef = useRef(0);

  const scrollToPhase = (phaseNumber) => {
    const targetElement = document.getElementById(`section-${phaseNumber}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        scrollProgress,
        setScrollProgress,
        currentPhase,
        setCurrentPhase,
        scrollProgressRef,
        scrollToPhase,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollNarrative = () => useContext(ScrollContext);

