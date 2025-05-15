// src/components/common/StatCard.jsx - Updated with data attributes for styling
import React from 'react';
import { Paper, Typography } from '@mui/material';

/**
 * A reusable card component for displaying a statistic
 * 
 * @param {string} title - The title of the stat card
 * @param {string|number} value - The main value to display
 * @param {string} subtitle - Optional subtitle text
 * @param {string} type - Optional stat type for styling (fg2, fg3, ft, points)
 * @param {Object} sx - Optional styles to apply to the Paper component
 */
function StatCard({ title, value, subtitle, type, sx = {} }) {
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
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
}

export default StatCard;