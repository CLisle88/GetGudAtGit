import React, { useState, useEffect } from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ tutorials }) => {
  const [progress, setProgress] = useState({});

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('gitTutorialProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gitTutorialProgress', JSON.stringify(progress));
  }, [progress]);

  // Calculate completion percentages
  const calculateStats = () => {
    const stats = {
      totalLessons: 0,
      completedLessons: 0,
      sectionProgress: {}
    };

    tutorials.forEach(section => {
      const sectionId = section.id;
      const totalInSection = section.lessons.length;
      let completedInSection = 0;

      section.lessons.forEach(lesson => {
        stats.totalLessons++;
        const lessonKey = `${sectionId}-${lesson.id}`;
        
        if (progress[lessonKey]) {
          stats.completedLessons++;
          completedInSection++;
        }
      });

      stats.sectionProgress[sectionId] = {
        total: totalInSection,
        completed: completedInSection,
        percentage: totalInSection > 0 ? Math.round((completedInSection / totalInSection) * 100) : 0
      };
    });

    stats.overallPercentage = stats.totalLessons > 0 
      ? Math.round((stats.completedLessons / stats.totalLessons) * 100) 
      : 0;

    return stats;
  };

  const markLessonComplete = (sectionId, lessonId) => {
    const lessonKey = `${sectionId}-${lessonId}`;
    setProgress(prev => ({
      ...prev,
      [lessonKey]: true
    }));
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      setProgress({});
    }
  };

  const stats = calculateStats();

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <h3>Your Learning Progress</h3>
        <button className="reset-button" onClick={resetProgress}>Reset Progress</button>
      </div>

      <div className="overall-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${stats.overallPercentage}%` }}
          ></div>
        </div>
        <div className="progress-text">
          <span className="percentage">{stats.overallPercentage}%</span>
          <span className="count">{stats.completedLessons}/{stats.totalLessons} lessons completed</span>
        </div>
      </div>

      <div className="section-progress-list">
        {tutorials.map(section => (
          <div key={section.id} className="section-progress">
            <div className="section-title">{section.title}</div>
            <div className="section-progress-bar-container">
              <div 
                className="section-progress-bar"
                style={{ width: `${stats.sectionProgress[section.id]?.percentage || 0}%` }}
              ></div>
            </div>
            <div className="section-progress-text">
              {stats.sectionProgress[section.id]?.percentage || 0}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker; 