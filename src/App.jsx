// Updated App.jsx with forced color styles
import React, { useState } from 'react';
import './App.css';
import SessionForm from './components/sessions/SessionForm';
import StatsDashboard from './components/dashboard/StatsDashboard';
import NbaComparison from './components/nba/NbaComparison';
import SessionHistory from './components/sessions/SessionHistory';
import { Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { StatsProvider, useStatsContext } from './context/StatsContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState(0);
  const { stats, sessions, removeSession, addSession } = useStatsContext();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Paper elevation={3} className="header-paper">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            letterSpacing: '-0.5px',
            mb: 1,
            color: 'white !important' // Force white color
          }}
        >
          HoopMetrics
        </Typography>
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: 400,
            letterSpacing: '0.2px',
            color: 'white !important', // Force white color
            opacity: 1 // Ensure visibility
          }}
        >
          Track Your Basketball Stats Like a Pro
        </Typography>
      </Paper>

      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider', 
        mb: 3,
        bgcolor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              height: '3px',
              borderRadius: '3px'
            }
          }}
        >
          <Tab 
            label="Dashboard" 
            sx={{ 
              fontWeight: 600,
              textTransform: 'none',
              py: 1.5,
              transition: 'all 0.2s ease'
            }} 
          />
          <Tab 
            label="Add Session" 
            sx={{ 
              fontWeight: 600,
              textTransform: 'none',
              py: 1.5,
              transition: 'all 0.2s ease'
            }} 
          />
          <Tab 
            label="History" 
            sx={{ 
              fontWeight: 600,
              textTransform: 'none',
              py: 1.5,
              transition: 'all 0.2s ease'
            }} 
          />
          <Tab 
            label="NBA Comparison" 
            sx={{ 
              fontWeight: 600,
              textTransform: 'none',
              py: 1.5,
              transition: 'all 0.2s ease'
            }} 
          />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <StatsDashboard stats={stats} sessions={sessions} />
      )}
      
      {activeTab === 1 && (
        <SessionForm onAddSession={addSession} />
      )}
      
      {activeTab === 2 && (
        <SessionHistory sessions={sessions} onRemoveSession={removeSession} />
      )}
      
      {activeTab === 3 && (
        <NbaComparison 
          userPercentage={parseFloat(stats.percentage)} 
          userTotalPoints={stats.totalPoints}
          userFTPercentage={parseFloat(stats.ftPercentage)}
          userGamesPlayed={sessions.length}
          userStats={{
            fg2m: stats.fg2m,
            fg2a: stats.fg2a,
            fg3m: stats.fg3m, 
            fg3a: stats.fg3a,
            ftm: stats.ftm,
            fta: stats.fta
          }}
        />
      )}
    </Container>
  );
}

// Main App component wrapped with StatsProvider
function App() {
  return (
    <StatsProvider>
      <AppContent />
    </StatsProvider>
  );
}

export default App;