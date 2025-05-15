// src/components/nba/RankingCard.jsx - Updated with enhanced styling
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
  // Calculate rank as a percentage for visual feedback
  const rankPercentage = totalPlayers > 0 ? ((totalPlayers - rank + 1) / totalPlayers) * 100 : 0;
  
  // Determine rank quality
  let rankQuality = "average";
  if (rankPercentage >= 80) rankQuality = "excellent";
  else if (rankPercentage >= 60) rankQuality = "good";
  else if (rankPercentage <= 20) rankQuality = "needs-work";

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        borderLeft: `4px solid ${borderColor}`,
        height: '100%',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
        }
      }}
      data-rank-quality={rankQuality}
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