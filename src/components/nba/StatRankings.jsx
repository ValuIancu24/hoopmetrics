// src/components/nba/StatRankings.jsx
import React from 'react';
import { Typography, Grid } from '@mui/material';
import RankingCard from './RankingCard';

/**
 * Component to display the user's statistical rankings compared to NBA players
 * 
 * @param {Object} userStats - User's basketball statistics
 * @param {Object} rankings - Calculated ranking positions
 * @param {number} totalPlayers - Total number of players (including user)
 */
function StatRankings({ userStats, rankings, totalPlayers }) {
  if (!userStats || userStats.percentage <= 0 && userStats.careerPoints <= 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        Add shooting sessions to see your NBA rankings across different categories
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Field Goal Percentage Ranking */}
      <Grid item xs={12} md={6}>
        <RankingCard
          title="Field Goal Percentage (FG%)"
          rank={rankings.fgPercentage}
          totalPlayers={totalPlayers}
          description={userStats.percentage > 0 
            ? `Your ${userStats.percentage}% shooting places you in the ${rankings.percentile}th percentile among these NBA stars.`
            : 'Add field goal sessions to see your ranking in this category.'}
          borderColor="#1976d2"
          textColor="primary"
        />
      </Grid>
      
      {/* Free Throw Percentage Ranking */}
      <Grid item xs={12} md={6}>
        <RankingCard
          title="Free Throw Percentage (FT%)"
          rank={rankings.ftPercentage}
          totalPlayers={totalPlayers}
          description={userStats.ftPercentage > 0 
            ? `Your ${userStats.ftPercentage}% free throw shooting ranks ${userStats.ftPercentage > 80 ? 'impressively' : 'competitively'} among NBA players.`
            : 'Add free throw sessions to see your ranking in this category.'}
          borderColor="#f50057"
          textColor="secondary"
        />
      </Grid>
      
      {/* 3-Point Percentage Ranking */}
      <Grid item xs={12} md={6}>
        <RankingCard
          title="3-Point Percentage (3P%)"
          rank={rankings.fg3Percentage}
          totalPlayers={totalPlayers}
          description={userStats.fg3Percentage > 0 
            ? `Your ${userStats.fg3Percentage}% from beyond the arc ${userStats.fg3Percentage > 35 ? 'shows excellent range' : 'is developing nicely'}.`
            : 'Add 3-point shooting sessions to see your ranking from downtown.'}
          borderColor="#4caf50"
          textColor="#4caf50"
        />
      </Grid>
      
      {/* 2-Point Percentage Ranking */}
      <Grid item xs={12} md={6}>
        <RankingCard
          title="2-Point Percentage (2P%)"
          rank={rankings.fg2Percentage}
          totalPlayers={totalPlayers}
          description={userStats.fg2Percentage > 0 
            ? `Your ${userStats.fg2Percentage}% on 2-pointers ${userStats.fg2Percentage > 50 ? 'is extremely efficient' : 'shows room for growth'}.`
            : 'Add 2-point shooting sessions to see your mid-range and inside scoring rank.'}
          borderColor="#ff9800"
          textColor="#ff9800"
        />
      </Grid>
      
      {/* Career Points Ranking */}
      <Grid item xs={12}>
        <RankingCard
          title="Career Points"
          rank={rankings.careerPoints}
          totalPlayers={totalPlayers}
          description={`With ${userStats.careerPoints} career points ${userStats.gamesPlayed > 0 ? `and ${(userStats.careerPoints / userStats.gamesPlayed).toFixed(1)} points per game` : ''}, 
            ${userStats.careerPoints > 1000 
              ? " you're on your way to the record books!" 
              : userStats.careerPoints > 100 
                ? " you're building a solid career." 
                : " you're just getting started on your scoring journey."}`}
          borderColor="#9c27b0"
          textColor="#9c27b0"
        />
      </Grid>
    </Grid>
  );
}

export default StatRankings;