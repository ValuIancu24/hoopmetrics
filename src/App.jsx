// src/App.jsx - Updated to use StatsContext
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
        <Typography variant="h3" component="h1" gutterBottom>
          HoopMetrics
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Track Your Basketball Stats Like a Pro
        </Typography>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Dashboard" />
          <Tab label="Add Session" />
          <Tab label="History" />
          <Tab label="NBA Comparison" />
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