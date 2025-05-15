import React from 'react';
import { Grid, Paper, Typography, Box, Divider } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StatsDashboard({ stats, sessions }) {
  // Prepare chart data
  const chartData = sessions.map(session => ({
    date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    percentage: parseFloat(session.percentage),
    shotsMade: session.shotsMade,
    shotsAttempted: session.shotsAttempted,
    shotType: session.shotType
  }));

  // Get the last 10 sessions for the chart
  const recentSessions = [...chartData].reverse().slice(0, 10).reverse();
  
  const StatCard = ({ title, value, subtitle }) => (
    <Paper elevation={2} className="stat-card">
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

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Basketball Stats Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Shooting %" 
            value={`${stats.percentage}%`} 
            subtitle={`${stats.shotsMade}/${stats.shotsAttempted}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Shots Made" 
            value={stats.shotsMade} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Attempts" 
            value={stats.shotsAttempted} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Points" 
            value={stats.totalPoints} 
          />
        </Grid>
        
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shooting Percentage Trend
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Your last {recentSessions.length} sessions
            </Typography>
            
            {recentSessions.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={recentSessions}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Shooting %']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    name="Shooting %" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                <Typography variant="body1" color="textSecondary">
                  Add shooting sessions to see your trend graph
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shot Distribution
            </Typography>
            
            {recentSessions.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={recentSessions}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="shotsMade" name="Shots Made" fill="#4caf50" />
                  <Bar dataKey="shotsAttempted" name="Shots Attempted" fill="#ff9800" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                <Typography variant="body1" color="textSecondary">
                  Add shooting sessions to see your shot distribution
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default StatsDashboard;