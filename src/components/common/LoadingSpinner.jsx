// src/components/common/LoadingSpinner.jsx - Updated with enhanced styling
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
      sx={{
        flexDirection: 'column',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25,118,210,0.05) 0%, rgba(25,118,210,0) 70%)',
          opacity: 0.8,
          zIndex: 0
        }
      }}
    >
      <div className="loading-spinner" 
        style={{ 
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 1 
        }}
      />
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary',
          fontWeight: 500,
          position: 'relative',
          zIndex: 1 
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}

export default LoadingSpinner;