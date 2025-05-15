import React, { useState, useEffect } from 'react';
import './App.css';
import SessionForm from './components/SessionForm';
import StatsDashboard from './components/StatsDashboard';
import NbaComparison from './components/NbaComparison';
import SessionHistory from './components/SessionHistory';
import { Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';

function App() {
  // Initialize state from localStorage or with default values
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem('basketballSessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  
  const [activeTab, setActiveTab] = useState(0);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('basketballSessions', JSON.stringify(sessions));
  }, [sessions]);

  // Add a new shooting session
  const addSession = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  // Remove a session by index
  const removeSession = (index) => {
    const updatedSessions = [...sessions];
    updatedSessions.splice(index, 1);
    setSessions(updatedSessions);
  };

  // Calculate overall stats
  const calculateStats = () => {
    if (sessions.length === 0) {
      return { 
        shotsMade: 0, 
        shotsAttempted: 0, 
        percentage: 0, 
        totalPoints: 0,
        fgm: 0,  // Total field goals made (2PT + 3PT)
        fga: 0,  // Total field goals attempted (2PT + 3PT)
        fg2m: 0, // 2-point field goals made
        fg2a: 0, // 2-point field goals attempted
        fg3m: 0, // 3-point field goals made
        fg3a: 0, // 3-point field goals attempted
        ftm: 0,  // Free throws made
        fta: 0   // Free throws attempted
      };
    }
    
    const stats = sessions.reduce((acc, session) => {
      // Identify shot type
      const isFreeThrow = session.shotType === 'ft';
      const is2PointShot = session.shotType === '2pt';
      const is3PointShot = session.shotType === '3pt';
      
      // Calculate points based on shot type
      const pointsPerShot = is3PointShot ? 3 : (is2PointShot ? 2 : 1);
      const pointsScored = session.shotsMade * pointsPerShot;
      
      // Update field goal stats (everything except free throws)
      const fgMade = !isFreeThrow ? session.shotsMade : 0;
      const fgAttempted = !isFreeThrow ? session.shotsAttempted : 0;
      
      // Track detailed stats by shot type
      const fg2Made = is2PointShot ? session.shotsMade : 0;
      const fg2Attempted = is2PointShot ? session.shotsAttempted : 0;
      const fg3Made = is3PointShot ? session.shotsMade : 0;
      const fg3Attempted = is3PointShot ? session.shotsAttempted : 0;
      const ftMade = isFreeThrow ? session.shotsMade : 0;
      const ftAttempted = isFreeThrow ? session.shotsAttempted : 0;
      
      return {
        shotsMade: acc.shotsMade + session.shotsMade,
        shotsAttempted: acc.shotsAttempted + session.shotsAttempted,
        totalPoints: acc.totalPoints + pointsScored,
        fgm: acc.fgm + fgMade,
        fga: acc.fga + fgAttempted,
        fg2m: acc.fg2m + fg2Made,
        fg2a: acc.fg2a + fg2Attempted,
        fg3m: acc.fg3m + fg3Made,
        fg3a: acc.fg3a + fg3Attempted,
        ftm: acc.ftm + ftMade,
        fta: acc.fta + ftAttempted
      };
    }, { 
      shotsMade: 0, 
      shotsAttempted: 0, 
      totalPoints: 0,
      fgm: 0,
      fga: 0,
      fg2m: 0,
      fg2a: 0,
      fg3m: 0,
      fg3a: 0,
      ftm: 0,
      fta: 0
    });
    
    // Calculate percentages
    stats.percentage = stats.fga > 0 
      ? ((stats.fgm / stats.fga) * 100).toFixed(1) 
      : 0;
    
    stats.fg2Percentage = stats.fg2a > 0
      ? ((stats.fg2m / stats.fg2a) * 100).toFixed(1)
      : 0;
      
    stats.fg3Percentage = stats.fg3a > 0
      ? ((stats.fg3m / stats.fg3a) * 100).toFixed(1)
      : 0;
      
    stats.ftPercentage = stats.fta > 0
      ? ((stats.ftm / stats.fta) * 100).toFixed(1)
      : 0;
      
    return stats;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const stats = calculateStats();

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

export default App;