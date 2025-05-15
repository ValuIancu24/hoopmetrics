import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Grid
} from '@mui/material';

function NbaComparison({ 
  userPercentage = 0, 
  userTotalPoints = 0, 
  userFTPercentage = 0, 
  userGamesPlayed = 0,
  userStats = {} 
}) {
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('percentage');
  const [order, setOrder] = useState('desc');
  
  // Enhanced NBA player data with detailed shooting stats
  // Data sourced from basketball-reference.com
  const nbaPlayers = [
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

  // Calculate derived stats for NBA players
  const enhancedNbaPlayers = React.useMemo(() => {
    return nbaPlayers.map(player => {
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
  }, [nbaPlayers]);

  // Simulate a loading delay to make it feel like it's fetching data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate user's full stats with defaults to avoid undefined errors
  const userFullStats = React.useMemo(() => {
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
  }, [userStats, userTotalPoints, userGamesPlayed]);

  // Handle sort request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Calculated values that depend on the main state
  const allPlayers = React.useMemo(() => {
    if (loading) return [];
    return [userFullStats, ...enhancedNbaPlayers];
  }, [loading, userFullStats, enhancedNbaPlayers]);

  // Sort function
  const sortedPlayers = React.useMemo(() => {
    if (loading) return [];
    
    return [...allPlayers].sort((a, b) => {
      const aValue = a[orderBy] || 0;
      const bValue = b[orderBy] || 0;
      
      if (order === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [allPlayers, order, orderBy, loading]);
  
  // Pre-calculate all rankings
  const rankings = React.useMemo(() => {
    if (loading) {
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
  }, [allPlayers, loading, userFullStats]);

  // Create sortable header cell component
  const SortableTableCell = React.memo(({ id, label, numeric = true, width }) => {
    return (
      <TableCell 
        align={numeric ? 'right' : 'left'} 
        sortDirection={orderBy === id ? order : false}
        style={width ? {width} : {}}
      >
        <TableSortLabel
          active={orderBy === id}
          direction={orderBy === id ? order : 'asc'}
          onClick={() => handleRequestSort(id)}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    );
  });

  // Render loading state
  if (loading) {
    return (
      <Paper elevation={3} className="comparison-paper">
        <Typography variant="h5" component="h2" gutterBottom>
          NBA Comparison
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" height={400}>
          <div className="loading-spinner"></div>
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading NBA career statistics...
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className="comparison-paper">
      <Typography variant="h5" component="h2" gutterBottom>
        NBA Comparison
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Your NBA Rankings
        </Typography>
        
        {userFullStats.percentage > 0 || userFullStats.careerPoints > 0 ? (
          <Grid container spacing={3}>
            {/* Field Goal Percentage Ranking */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderLeft: '4px solid #1976d2',
                  height: '100%'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  Field Goal Percentage (FG%)
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  #{rankings.fgPercentage} of {sortedPlayers.length}
                </Typography>
                <Typography variant="body2">
                  {userFullStats.percentage > 0 
                    ? `Your ${userFullStats.percentage}% shooting places you in the ${rankings.percentile}th percentile among these NBA stars.`
                    : 'Add field goal sessions to see your ranking in this category.'}
                </Typography>
              </Paper>
            </Grid>
            
            {/* Free Throw Percentage Ranking */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderLeft: '4px solid #f50057',
                  height: '100%'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" color="secondary">
                  Free Throw Percentage (FT%)
                </Typography>
                <Typography variant="h4" color="secondary" gutterBottom>
                  #{rankings.ftPercentage} of {sortedPlayers.length}
                </Typography>
                <Typography variant="body2">
                  {userFullStats.ftPercentage > 0 
                    ? `Your ${userFullStats.ftPercentage}% free throw shooting ranks ${userFullStats.ftPercentage > 80 ? 'impressively' : 'competitively'} among NBA players.`
                    : 'Add free throw sessions to see your ranking in this category.'}
                </Typography>
              </Paper>
            </Grid>
            
            {/* 3-Point Percentage Ranking */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderLeft: '4px solid #4caf50',
                  mt: 2,
                  height: '100%'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#4caf50' }}>
                  3-Point Percentage (3P%)
                </Typography>
                <Typography variant="h4" sx={{ color: '#4caf50' }} gutterBottom>
                  #{rankings.fg3Percentage} of {sortedPlayers.length}
                </Typography>
                <Typography variant="body2">
                  {userFullStats.fg3Percentage > 0 
                    ? `Your ${userFullStats.fg3Percentage}% from beyond the arc ${userFullStats.fg3Percentage > 35 ? 'shows excellent range' : 'is developing nicely'}.`
                    : 'Add 3-point shooting sessions to see your ranking from downtown.'}
                </Typography>
              </Paper>
            </Grid>
            
            {/* 2-Point Percentage Ranking */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderLeft: '4px solid #ff9800',
                  mt: 2,
                  height: '100%'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ff9800' }}>
                  2-Point Percentage (2P%)
                </Typography>
                <Typography variant="h4" sx={{ color: '#ff9800' }} gutterBottom>
                  #{rankings.fg2Percentage} of {sortedPlayers.length}
                </Typography>
                <Typography variant="body2">
                  {userFullStats.fg2Percentage > 0 
                    ? `Your ${userFullStats.fg2Percentage}% on 2-pointers ${userFullStats.fg2Percentage > 50 ? 'is extremely efficient' : 'shows room for growth'}.`
                    : 'Add 2-point shooting sessions to see your mid-range and inside scoring rank.'}
                </Typography>
              </Paper>
            </Grid>
            
            {/* Career Points Ranking */}
            <Grid item xs={12}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderLeft: '4px solid #9c27b0',
                  mt: 2
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#9c27b0' }}>
                  Career Points
                </Typography>
                <Typography variant="h4" sx={{ color: '#9c27b0' }} gutterBottom>
                  #{rankings.careerPoints} of {sortedPlayers.length}
                </Typography>
                <Typography variant="body2">
                  With {userFullStats.careerPoints} career points {userFullStats.gamesPlayed > 0 ? `and ${(userFullStats.careerPoints / userFullStats.gamesPlayed).toFixed(1)} points per game` : ''}, 
                  {userFullStats.careerPoints > 1000 
                    ? " you're on your way to the record books!" 
                    : userFullStats.careerPoints > 100 
                      ? " you're building a solid career." 
                      : " you're just getting started on your scoring journey."}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Add shooting sessions to see your NBA rankings across different categories
          </Typography>
        )}
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Career Stats Comparison
      </Typography>
      
      <TableContainer style={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <SortableTableCell id="name" label="Player" numeric={false} />
              <SortableTableCell id="team" label="Team" numeric={false} />
              {/* Reordered stats as requested */}
              <SortableTableCell id="percentage" label="FG%" />
              <SortableTableCell id="fgm" label="FGM" />
              <SortableTableCell id="fga" label="FGA" />
              <SortableTableCell id="ftPercentage" label="FT%" />
              <SortableTableCell id="ftm" label="FTM" />
              <SortableTableCell id="fta" label="FTA" />
              <SortableTableCell id="fg3Percentage" label="3P%" />
              <SortableTableCell id="fg3m" label="3PM" />
              <SortableTableCell id="fg3a" label="3PA" />
              <SortableTableCell id="fg2Percentage" label="2P%" />
              <SortableTableCell id="fg2m" label="2PM" />
              <SortableTableCell id="fg2a" label="2PA" />
              <SortableTableCell id="careerPoints" label="Career Points" />
              <SortableTableCell id="gamesPlayed" label="Games" />
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow 
                key={player.name}
                sx={{ 
                  bgcolor: player.name === "YOU" ? 'rgba(33, 150, 243, 0.1)' : 'inherit',
                  '&:nth-of-type(odd)': {
                    bgcolor: player.name === "YOU" 
                      ? 'rgba(33, 150, 243, 0.1)' 
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  <Typography fontWeight={player.name === "YOU" ? 'bold' : 'normal'}>
                    {player.name} {player.name === "YOU" ? "(You)" : ""}
                  </Typography>
                </TableCell>
                <TableCell>{player.team}</TableCell>
                {/* Reordered stats to match the header */}
                <TableCell align="right">{player.percentage}%</TableCell>
                <TableCell align="right">{player.fgm.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fga.toLocaleString()}</TableCell>
                <TableCell align="right">{player.ftPercentage}%</TableCell>
                <TableCell align="right">{player.ftm.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fta.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fg3Percentage}%</TableCell>
                <TableCell align="right">{player.fg3m.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fg3a.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fg2Percentage}%</TableCell>
                <TableCell align="right">{player.fg2m.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fg2a.toLocaleString()}</TableCell>
                <TableCell align="right">{player.careerPoints.toLocaleString()}</TableCell>
                <TableCell align="right">{player.gamesPlayed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Note: NBA statistics sourced from Basketball Reference through 2025 season. 
          Click on any column header to sort by that stat.
        </Typography>
      </Box>
    </Paper>
  );
}

export default NbaComparison;