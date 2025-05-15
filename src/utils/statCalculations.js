// src/utils/statCalculations.js

/**
 * Calculate overall statistics from an array of shooting sessions
 * @param {Array} sessions - Array of shooting session objects
 * @returns {Object} Calculated statistics
 */
export const calculateOverallStats = (sessions) => {
    if (sessions.length === 0) {
      return { 
        shotsMade: 0, 
        shotsAttempted: 0, 
        percentage: 0, 
        totalPoints: 0,
        fgm: 0,  // Total field goals made (2PT + 3PT)
        fga: 0,  // Total field goals attempted (2PT + 3PT)
        fg2m: 0, // 2-point field goals made
        fg2a: 0, // 2-point field goals attempted
        fg3m: 0, // 3-point field goals made
        fg3a: 0, // 3-point field goals attempted
        ftm: 0,  // Free throws made
        fta: 0   // Free throws attempted
      };
    }
    
    const stats = sessions.reduce((acc, session) => {
      // Identify shot type
      const isFreeThrow = session.shotType === 'ft';
      const is2PointShot = session.shotType === '2pt';
      const is3PointShot = session.shotType === '3pt';
      
      // Calculate points based on shot type
      const pointsPerShot = is3PointShot ? 3 : (is2PointShot ? 2 : 1);
      const pointsScored = session.shotsMade * pointsPerShot;
      
      // Update field goal stats (everything except free throws)
      const fgMade = !isFreeThrow ? session.shotsMade : 0;
      const fgAttempted = !isFreeThrow ? session.shotsAttempted : 0;
      
      // Track detailed stats by shot type
      const fg2Made = is2PointShot ? session.shotsMade : 0;
      const fg2Attempted = is2PointShot ? session.shotsAttempted : 0;
      const fg3Made = is3PointShot ? session.shotsMade : 0;
      const fg3Attempted = is3PointShot ? session.shotsAttempted : 0;
      const ftMade = isFreeThrow ? session.shotsMade : 0;
      const ftAttempted = isFreeThrow ? session.shotsAttempted : 0;
      
      return {
        shotsMade: acc.shotsMade + session.shotsMade,
        shotsAttempted: acc.shotsAttempted + session.shotsAttempted,
        totalPoints: acc.totalPoints + pointsScored,
        fgm: acc.fgm + fgMade,
        fga: acc.fga + fgAttempted,
        fg2m: acc.fg2m + fg2Made,
        fg2a: acc.fg2a + fg2Attempted,
        fg3m: acc.fg3m + fg3Made,
        fg3a: acc.fg3a + fg3Attempted,
        ftm: acc.ftm + ftMade,
        fta: acc.fta + ftAttempted
      };
    }, { 
      shotsMade: 0, 
      shotsAttempted: 0, 
      totalPoints: 0,
      fgm: 0,
      fga: 0,
      fg2m: 0,
      fg2a: 0,
      fg3m: 0,
      fg3a: 0,
      ftm: 0,
      fta: 0
    });
    
    // Calculate percentages
    stats.percentage = stats.fga > 0 
      ? ((stats.fgm / stats.fga) * 100).toFixed(1) 
      : 0;
    
    stats.fg2Percentage = stats.fg2a > 0
      ? ((stats.fg2m / stats.fg2a) * 100).toFixed(1)
      : 0;
      
    stats.fg3Percentage = stats.fg3a > 0
      ? ((stats.fg3m / stats.fg3a) * 100).toFixed(1)
      : 0;
      
    stats.ftPercentage = stats.fta > 0
      ? ((stats.ftm / stats.fta) * 100).toFixed(1)
      : 0;
      
    return stats;
  };
  
  /**
   * Prepare chart data from sessions
   * @param {Array} sessions - Array of shooting session objects
   * @returns {Array} Formatted data for charts
   */
  export const prepareChartData = (sessions) => {
    return sessions.map(session => ({
      date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      percentage: parseFloat(session.percentage),
      shotsMade: session.shotsMade,
      shotsAttempted: session.shotsAttempted,
      shotType: session.shotType
    }));
  };
  
  /**
   * Get the most recent sessions for display
   * @param {Array} chartData - Array of formatted session data
   * @param {number} limit - Number of recent sessions to return
   * @returns {Array} Limited array of most recent sessions
   */
  export const getRecentSessions = (chartData, limit = 10) => {
    return [...chartData].reverse().slice(0, limit).reverse();
  };