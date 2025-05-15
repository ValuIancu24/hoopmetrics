// src/components/nba/nbaData.js

/**
 * NBA player career statistics data
 * Data sourced from basketball-reference.com
 */
export const nbaPlayers = [
    { 
      name: "Zion Williamson", 
      team: "New Orleans Pelicans", 
      careerPoints: 3295, 
      gamesPlayed: 144,
      fg2m: 1281,
      fg2a: 2041,
      fg3m: 23,
      fg3a: 74,
      ftm: 664,
      fta: 970
    },
    { 
      name: "Nikola Jokić", 
      team: "Denver Nuggets", 
      careerPoints: 14890, 
      gamesPlayed: 653,
      fg2m: 5234,
      fg2a: 9163,
      fg3m: 583,
      fg3a: 1679,
      ftm: 2673,
      fta: 3236
    },
    { 
      name: "Giannis Antetokounmpo", 
      team: "Milwaukee Bucks", 
      careerPoints: 18771, 
      gamesPlayed: 741,
      fg2m: 6493,
      fg2a: 11185,
      fg3m: 544,
      fg3a: 1754,
      ftm: 4152,
      fta: 5863
    },
    { 
      name: "Kevin Durant", 
      team: "Phoenix Suns", 
      careerPoints: 27300, 
      gamesPlayed: 1001,
      fg2m: 7195,
      fg2a: 13629,
      fg3m: 2053,
      fg3a: 5314,
      ftm: 6752,
      fta: 7627
    },
    { 
      name: "LeBron James", 
      team: "Los Angeles Lakers", 
      careerPoints: 39868, 
      gamesPlayed: 1471,
      fg2m: 12241,
      fg2a: 21879,
      fg3m: 2368,
      fg3a: 6513,
      ftm: 8382,
      fta: 11398
    },
    { 
      name: "Joel Embiid", 
      team: "Philadelphia 76ers", 
      careerPoints: 11290, 
      gamesPlayed: 398,
      fg2m: 3571,
      fg2a: 6843,
      fg3m: 418,
      fg3a: 1193,
      ftm: 3312,
      fta: 3980
    },
    { 
      name: "Stephen Curry", 
      team: "Golden State Warriors", 
      careerPoints: 23152, 
      gamesPlayed: 882,
      fg2m: 4587,
      fg2a: 8568,
      fg3m: 3505,
      fg3a: 8226,
      ftm: 3463,
      fta: 3814
    },
    { 
      name: "Kyrie Irving", 
      team: "Dallas Mavericks", 
      careerPoints: 16066, 
      gamesPlayed: 719,
      fg2m: 4531,
      fg2a: 8763,
      fg3m: 1655,
      fg3a: 4159,
      ftm: 2594,
      fta: 2941
    },
    { 
      name: "Ja Morant", 
      team: "Memphis Grizzlies", 
      careerPoints: 6462, 
      gamesPlayed: 247,
      fg2m: 2123,
      fg2a: 4180,
      fg3m: 275,
      fg3a: 813,
      ftm: 1391,
      fta: 1859
    },
    { 
      name: "Luka Dončić", 
      team: "Dallas Mavericks", 
      careerPoints: 10519, 
      gamesPlayed: 395,
      fg2m: 2853,
      fg2a: 5438,
      fg3m: 938,
      fg3a: 2652,
      ftm: 1938,
      fta: 2602
    },
    { 
      name: "Devin Booker", 
      team: "Phoenix Suns", 
      careerPoints: 13815, 
      gamesPlayed: 578,
      fg2m: 3743,
      fg2a: 7467,
      fg3m: 1237,
      fg3a: 3307,
      ftm: 2854,
      fta: 3263
    },
    { 
      name: "Jayson Tatum", 
      team: "Boston Celtics", 
      careerPoints: 13215, 
      gamesPlayed: 508,
      fg2m: 3214,
      fg2a: 6435,
      fg3m: 1337,
      fg3a: 3584,
      ftm: 2776,
      fta: 3329
    },
    { 
      name: "Anthony Edwards", 
      team: "Minnesota Timberwolves", 
      careerPoints: 6147, 
      gamesPlayed: 278,
      fg2m: 1546,
      fg2a: 3154,
      fg3m: 673,
      fg3a: 1885,
      ftm: 1036,
      fta: 1347
    },
    { 
      name: "Damian Lillard", 
      team: "Milwaukee Bucks", 
      careerPoints: 19325, 
      gamesPlayed: 769,
      fg2m: 3985,
      fg2a: 8259,
      fg3m: 2423,
      fg3a: 6579,
      ftm: 4508,
      fta: 5031
    },
    { 
      name: "Trae Young", 
      team: "Atlanta Hawks",
      careerPoints: 9461, 
      gamesPlayed: 398,
      fg2m: 2081,
      fg2a: 4460,
      fg3m: 1024,
      fg3a: 2897,
      ftm: 2224,
      fta: 2533
    }
  ];
  
  /**
   * Processes player data to calculate additional statistics
   * @param {Array} players - Array of player objects with raw stats
   * @returns {Array} - Enhanced player objects with calculated percentages
   */
  export const calculatePlayerStats = (players) => {
    return players.map(player => {
      const fgm = player.fg2m + player.fg3m;
      const fga = player.fg2a + player.fg3a;
      
      return {
        ...player,
        fgm: fgm,
        fga: fga,
        percentage: fga > 0 ? parseFloat(((fgm / fga) * 100).toFixed(1)) : 0,
        fg2Percentage: player.fg2a > 0 ? parseFloat(((player.fg2m / player.fg2a) * 100).toFixed(1)) : 0,
        fg3Percentage: player.fg3a > 0 ? parseFloat(((player.fg3m / player.fg3a) * 100).toFixed(1)) : 0,
        ftPercentage: player.fta > 0 ? parseFloat(((player.ftm / player.fta) * 100).toFixed(1)) : 0
      };
    });
  };
  
  /**
   * Creates a user stats object formatted like NBA players
   * @param {Object} userStats - User's shot statistics
   * @param {number} userTotalPoints - User's total points
   * @param {number} userGamesPlayed - User's games played
   * @returns {Object} - User stats in same format as NBA players
   */
  export const createUserStatsObject = (userStats, userTotalPoints, userGamesPlayed) => {
    // Clean input stats to ensure we have numbers
    const fg2m = parseInt(userStats.fg2m) || 0;
    const fg2a = parseInt(userStats.fg2a) || 0;
    const fg3m = parseInt(userStats.fg3m) || 0;
    const fg3a = parseInt(userStats.fg3a) || 0;
    const ftm = parseInt(userStats.ftm) || 0;
    const fta = parseInt(userStats.fta) || 0;
    
    // Calculate total field goals (2PT + 3PT)
    const fgm = fg2m + fg3m;
    const fga = fg2a + fg3a;
    
    // Calculate percentages
    const fgPercentage = fga > 0 ? parseFloat(((fgm / fga) * 100).toFixed(1)) : 0;
    const fg2Percentage = fg2a > 0 ? parseFloat(((fg2m / fg2a) * 100).toFixed(1)) : 0;
    const fg3Percentage = fg3a > 0 ? parseFloat(((fg3m / fg3a) * 100).toFixed(1)) : 0;
    const ftPercentage = fta > 0 ? parseFloat(((ftm / fta) * 100).toFixed(1)) : 0;
    
    return {
      name: "YOU",
      team: "HoopMetrics All-Stars",
      careerPoints: userTotalPoints || 0,
      gamesPlayed: userGamesPlayed || 0,
      fg2m: fg2m,
      fg2a: fg2a,
      fg3m: fg3m,
      fg3a: fg3a,
      ftm: ftm,
      fta: fta,
      fgm: fgm,
      fga: fga,
      percentage: fgPercentage,
      fg2Percentage: fg2Percentage,
      fg3Percentage: fg3Percentage,
      ftPercentage: ftPercentage
    };
  };