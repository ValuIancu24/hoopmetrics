// src/components/common/LoadingSpinner.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * A reusable loading spinner component with optional message
 * 
 * @param {string} message - Text to display next to the spinner
 * @param {number} height - Container height in pixels
 */
function LoadingSpinner({ message = 'Loading...', height = 400 }) {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height={height}
    >
      <div className="loading-spinner"></div>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {message}
      </Typography>
    </Box>
  );
}

export default LoadingSpinner;