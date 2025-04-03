import React, { useState, useEffect } from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onClose }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedGetGudGit');
    if (!hasVisited) {
      setShowWelcome(true);
    }
  }, []);

  const welcomeSteps = [
    {
      title: "Welcome to GetGud@Git!",
      content: "The interactive platform that will help you master Git. Whether you're a complete beginner or looking to level up your skills, we've got you covered.",
      image: "welcome.png"
    },
    {
      title: "Learn at Your Own Pace",
      content: "Our step-by-step tutorials cover everything from basic commands to advanced workflows. Complete lessons at your own pace and track your progress as you go.",
      image: "tutorial.png"
    },
    {
      title: "Practice with Real Code",
      content: "Try commands in our interactive terminal and work with sample projects. See the results of your actions in real-time visualizations.",
      image: "practice.png"
    },
    {
      title: "Master Professional Workflows",
      content: "Learn industry-standard Git workflows and best practices that will prepare you for real-world collaboration.",
      image: "workflow.png"
    },
    {
      title: "Ready to Begin?",
      content: "Let's start your Git journey! Remember, you can always check the cheat sheet if you need a quick reference.",
      image: "start.png"
    }
  ];

  const handleClose = () => {
    localStorage.setItem('hasVisitedGetGudGit', 'true');
    setShowWelcome(false);
    if (onClose) onClose();
  };

  const nextStep = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!showWelcome) return null;

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <button className="close-button" onClick={handleClose}>×</button>
        
        <div className="welcome-content">
          <div className="welcome-step">
            <h2>{welcomeSteps[currentStep].title}</h2>
            <p>{welcomeSteps[currentStep].content}</p>
          </div>
          
          <div className="welcome-dots">
            {welcomeSteps.map((_, index) => (
              <div 
                key={index} 
                className={`welcome-dot ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              ></div>
            ))}
          </div>
          
          <div className="welcome-actions">
            {currentStep > 0 && (
              <button className="welcome-prev" onClick={prevStep}>Previous</button>
            )}
            <button className="welcome-next" onClick={nextStep}>
              {currentStep === welcomeSteps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 