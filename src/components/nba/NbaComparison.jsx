// src/components/nba/NbaComparison.jsx
import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box
} from '@mui/material';
import LoadingSpinner from '../common/LoadingSpinner';
import StatRankings from './StatRankings';
import PlayerTable from './PlayerTable';
import useSort from '../../hooks/useSort';
import useStats from '../../hooks/useStats';
import { nbaPlayers, calculatePlayerStats, createUserStatsObject } from './nbaData';

/**
 * Main component for comparing user stats with NBA players
 * 
 * @param {number} userPercentage - User's field goal percentage
 * @param {number} userTotalPoints - User's total points scored
 * @param {number} userFTPercentage - User's free throw percentage
 * @param {number} userGamesPlayed - User's games played count
 * @param {Object} userStats - Object containing detailed user shooting statistics
 */
function NbaComparison({ 
  userPercentage = 0, 
  userTotalPoints = 0, 
  userFTPercentage = 0, 
  userGamesPlayed = 0,
  userStats = {} 
}) {
  // Component state
  const [loading, setLoading] = useState(true);
  
  // Get sorting functionality from custom hook
  const { order, orderBy, handleRequestSort, sortedItems } = useSort('percentage', 'desc');
  
  // Calculate derived stats for NBA players
  const enhancedNbaPlayers = React.useMemo(() => {
    return calculatePlayerStats(nbaPlayers);
  }, []);

  // Calculate user's full stats object
  const userFullStats = React.useMemo(() => {
    return createUserStatsObject(userStats, userTotalPoints, userGamesPlayed);
  }, [userStats, userTotalPoints, userGamesPlayed]);

  // Combine all players (user + NBA) for rankings and display
  const allPlayers = React.useMemo(() => {
    if (loading) return [];
    return [userFullStats, ...enhancedNbaPlayers];
  }, [loading, userFullStats, enhancedNbaPlayers]);

  // Get player rankings from stats hook
  const rankings = useStats(allPlayers, userFullStats);
  
  // Sort players based on current sort settings - CALL the function with allPlayers
  const sortedPlayers = React.useMemo(() => {
    // Make sure to call sortedItems as a function with allPlayers as argument
    return sortedItems(allPlayers);
  }, [allPlayers, sortedItems, order, orderBy]); // Add order, orderBy to dependencies

  // Simulate a loading delay to make it feel like it's fetching data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Render loading state
  if (loading) {
    return (
      <Paper elevation={3} className="comparison-paper">
        <Typography variant="h5" component="h2" gutterBottom>
          NBA Comparison
        </Typography>
        <LoadingSpinner message="Loading NBA career statistics..." />
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
        
        <StatRankings 
          userStats={userFullStats} 
          rankings={rankings} 
          totalPlayers={sortedPlayers.length} 
        />
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Career Stats Comparison
      </Typography>
      
      <PlayerTable 
        players={sortedPlayers} 
        orderBy={orderBy} 
        order={order} 
        onRequestSort={handleRequestSort} 
      />
      
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