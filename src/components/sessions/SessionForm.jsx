// src/components/sessions/SessionForm.jsx - Updated with enhanced styling
import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid,
  Snackbar,
  Alert,
  Box
} from '@mui/material';

function SessionForm({ onAddSession }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [shotsMade, setShotsMade] = useState('');
  const [shotsAttempted, setShotsAttempted] = useState('');
  const [shotType, setShotType] = useState('2pt');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!shotsMade || !shotsAttempted) {
      setSnackbar({
        open: true,
        message: 'Please enter both shots made and attempted',
        severity: 'error'
      });
      return;
    }
    
    const madeNum = parseInt(shotsMade);
    const attemptedNum = parseInt(shotsAttempted);
    
    if (isNaN(madeNum) || isNaN(attemptedNum)) {
      setSnackbar({
        open: true,
        message: 'Please enter valid numbers',
        severity: 'error'
      });
      return;
    }
    
    if (madeNum > attemptedNum) {
      setSnackbar({
        open: true,
        message: 'Shots made cannot be greater than shots attempted',
        severity: 'error'
      });
      return;
    }
    
    // Create new session object
    const newSession = {
      id: Date.now(),
      date,
      shotsMade: madeNum,
      shotsAttempted: attemptedNum,
      shotType,
      location,
      notes,
      percentage: ((madeNum / attemptedNum) * 100).toFixed(1)
    };
    
    // Add to parent component state
    onAddSession(newSession);
    
    // Reset form
    setShotsMade('');
    setShotsAttempted('');
    setLocation('');
    setNotes('');
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Session added successfully!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };

  // Helper function to get shot type color
  const getShotTypeColor = () => {
    switch(shotType) {
      case '2pt': return 'primary';
      case '3pt': return 'secondary';
      case 'ft': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <Paper 
      elevation={3} 
      className="form-paper"
      sx={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)`,
          zIndex: 0
        }}
      />
      
      <Typography variant="h5" component="h2" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
        Add Shooting Session
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Shot Type</InputLabel>
              <Select
                value={shotType}
                onChange={(e) => setShotType(e.target.value)}
                label="Shot Type"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              >
                <MenuItem value="2pt">2-Point Shots</MenuItem>
                <MenuItem value="3pt">3-Point Shots</MenuItem>
                <MenuItem value="ft">Free Throws</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Shots Made"
              type="number"
              value={shotsMade}
              onChange={(e) => setShotsMade(e.target.value)}
              inputProps={{ min: 0 }}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Shots Attempted"
              type="number"
              value={shotsAttempted}
              onChange={(e) => setShotsAttempted(e.target.value)}
              inputProps={{ min: 1 }}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Backyard, Local Park, Gym"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={2}
              placeholder="Any additional notes about this session"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color={getShotTypeColor()} 
              fullWidth 
              size="large"
              sx={{
                mt: 1,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              Add Session
            </Button>
          </Grid>
        </Grid>
      </form>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 2,
            fontWeight: 500
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default SessionForm;