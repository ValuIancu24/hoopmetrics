// src/hooks/useStats.js
import { useMemo } from 'react';

/**
 * Custom hook to calculate player rankings and percentiles
 * 
 * @param {Array} allPlayers - Array of all players including user
 * @param {Object} userFullStats - User's calculated statistics
 * @returns {Object} Various ranking metrics
 */
function useStats(allPlayers, userFullStats) {
  const rankings = useMemo(() => {
    if (!allPlayers || allPlayers.length === 0) {
      return {
        fgPercentage: 0,
        ftPercentage: 0,
        fg3Percentage: 0,
        fg2Percentage: 0,
        careerPoints: 0,
        percentile: 0
      };
    }
    
    const fgPercentageRank = [...allPlayers]
      .sort((a, b) => b.percentage - a.percentage)
      .findIndex(player => player.name === "YOU") + 1;
      
    const ftPercentageRank = userFullStats.ftPercentage <= 0 
      ? allPlayers.length
      : [...allPlayers]
          .sort((a, b) => b.ftPercentage - a.ftPercentage)
          .findIndex(player => player.name === "YOU") + 1;
          
    const fg3PercentageRank = userFullStats.fg3Percentage <= 0
      ? allPlayers.length
      : [...allPlayers]
          .sort((a, b) => b.fg3Percentage - a.fg3Percentage)
          .findIndex(player => player.name === "YOU") + 1;
          
    const fg2PercentageRank = userFullStats.fg2Percentage <= 0
      ? allPlayers.length
      : [...allPlayers]
          .sort((a, b) => b.fg2Percentage - a.fg2Percentage)
          .findIndex(player => player.name === "YOU") + 1;
          
    const careerPointsRank = [...allPlayers]
      .sort((a, b) => b.careerPoints - a.careerPoints)
      .findIndex(player => player.name === "YOU") + 1;
      
    // Calculate percentile
    const percentile = userFullStats.percentage <= 0 || allPlayers.length === 0
      ? 0
      : (((allPlayers.length - fgPercentageRank + 1) / allPlayers.length) * 100).toFixed(1);
      
    return {
      fgPercentage: fgPercentageRank,
      ftPercentage: ftPercentageRank,
      fg3Percentage: fg3PercentageRank,
      fg2Percentage: fg2PercentageRank,
      careerPoints: careerPointsRank,
      percentile: percentile
    };
  }, [allPlayers, userFullStats]);

  return rankings;
}

export default useStats;