// src/components/common/DetailedStatCard.jsx - Updated with data attributes
import React from 'react';
import { Paper, Typography } from '@mui/material';

/**
 * A specialized version of StatCard for displaying shooting percentages
 * with made/attempted details
 * 
 * @param {string} title - The title of the stat card
 * @param {number} value - The percentage value
 * @param {number} made - Number of shots made
 * @param {number} attempted - Number of shots attempted
 * @param {string} color - Primary color for the value (default: 'primary')
 * @param {string} type - Optional stat type for styling (fg2, fg3, ft, points)
 * @param {Object} sx - Additional styles to apply
 */
function DetailedStatCard({ 
  title, 
  value, 
  made, 
  attempted, 
  color = 'primary',
  type,
  sx = {} 
}) {
  return (
    <Paper 
      elevation={2} 
      className="stat-card" 
      data-type={type}
      sx={{ 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        ...sx 
      }}
    >
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" color={color}>
        {value}%
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {made}/{attempted}
      </Typography>
    </Paper>
  );
}

export default DetailedStatCard;