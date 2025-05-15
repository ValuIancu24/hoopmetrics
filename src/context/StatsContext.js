// src/context/StatsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateOverallStats } from '../utils/statCalculations';

// Create context
const StatsContext = createContext();

/**
 * Provider component for basketball statistics
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function StatsProvider({ children }) {
  // Initialize sessions from localStorage
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem('basketballSessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  
  // Calculate stats whenever sessions change
  const [stats, setStats] = useState(() => calculateOverallStats(sessions));
  
  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('basketballSessions', JSON.stringify(sessions));
    setStats(calculateOverallStats(sessions));
  }, [sessions]);

  // Add a new shooting session
  const addSession = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  // Remove a session by index
  const removeSession = (index) => {
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    setSessions(updatedSessions);
  };

  // Context value
  const value = {
    sessions,
    stats,
    addSession,
    removeSession
  };

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
}

/**
 * Custom hook to access stats context
 * @returns {Object} Stats context value
 */
export function useStatsContext() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStatsContext must be used within a StatsProvider');
  }
  return context;
}

export default StatsContext;