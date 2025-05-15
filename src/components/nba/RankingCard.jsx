// src/components/nba/RankingCard.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';

/**
 * Card component for displaying player rankings compared to NBA players
 * 
 * @param {string} title - The category title (e.g., "Field Goal Percentage")
 * @param {number} rank - Player's numerical rank
 * @param {number} totalPlayers - Total number of players in comparison
 * @param {string} description - Descriptive text
 * @param {string} borderColor - Color for the left border of the card
 * @param {string} textColor - Color for the title and rank text
 */
function RankingCard({ 
  title, 
  rank, 
  totalPlayers, 
  description, 
  borderColor, 
  textColor 
}) {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        borderLeft: `4px solid ${borderColor}`,
        height: '100%'
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" color={textColor}>
        {title}
      </Typography>
      <Typography variant="h4" color={textColor} gutterBottom>
        #{rank} of {totalPlayers}
      </Typography>
      <Typography variant="body2">
        {description}
      </Typography>
    </Paper>
  );
}

export default RankingCard;