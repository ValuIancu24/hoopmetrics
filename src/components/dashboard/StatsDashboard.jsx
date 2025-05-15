// src/components/dashboard/StatsDashboard.jsx - Updated with new styling
import React from 'react';
import { Grid, Paper, Typography, Box, Divider } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../common/StatCard';
import DetailedStatCard from '../common/DetailedStatCard';
import { formatPercentage, formatNumber } from '../../utils/formatters';
import { prepareChartData, getRecentSessions } from '../../utils/statCalculations';

function StatsDashboard({ stats, sessions }) {
  // Prepare chart data
  const chartData = prepareChartData(sessions);

  // Get the last 10 sessions for the chart
  const recentSessions = getRecentSessions(chartData, 10);
  
  // Calculate field goal percentage correctly (excluding free throws)
  const fieldGoalPercentage = stats.fga > 0 
    ? ((stats.fgm / stats.fga) * 100).toFixed(1) 
    : 0;

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Basketball Stats Dashboard
      </Typography>
      
      {/* Main stats cards - First row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Career Points" 
            value={stats.totalPoints}
            type="points"
            subtitle={`from ${sessions.length} sessions`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailedStatCard 
            title="Field Goal %" 
            value={fieldGoalPercentage} 
            made={stats.fgm}
            attempted={stats.fga}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailedStatCard 
            title="Free Throw %" 
            value={stats.ftPercentage} 
            made={stats.ftm}
            attempted={stats.fta}
            color="#ff9800"
            type="ft"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Games Played" 
            value={sessions.length} 
          />
        </Grid>
      </Grid>

      {/* Detailed Stats - Second row */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Detailed Shooting Stats
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DetailedStatCard 
            title="2-Point %" 
            value={stats.fg2Percentage} 
            made={stats.fg2m}
            attempted={stats.fg2a}
            color="primary"
            type="fg2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailedStatCard 
            title="3-Point %" 
            value={stats.fg3Percentage} 
            made={stats.fg3m}
            attempted={stats.fg3a}
            color="secondary"
            type="fg3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailedStatCard 
            title="Overall %" 
            value={stats.shotsAttempted > 0 ? ((stats.shotsMade / stats.shotsAttempted) * 100).toFixed(1) : 0} 
            made={stats.shotsMade}
            attempted={stats.shotsAttempted}
          />
        </Grid>
      </Grid>
      
      {/* Shooting breakdown table */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Shooting Breakdown
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Grid container spacing={2}>
          {/* Field Goals */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">Field Goals</Typography>
            <Divider sx={{ mb: 1 }} />
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">Field Goal %:</Typography>
            <Typography variant="body1" fontWeight="bold">{fieldGoalPercentage}%</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">FGM:</Typography>
            <Typography variant="body1">{stats.fgm}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">FGA:</Typography>
            <Typography variant="body1">{stats.fga}</Typography>
          </Grid>
          
          {/* Free Throws */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">Free Throws</Typography>
            <Divider sx={{ mb: 1 }} />
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">Free Throw %:</Typography>
            <Typography variant="body1" fontWeight="bold">{stats.ftPercentage}%</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">FTM:</Typography>
            <Typography variant="body1">{stats.ftm}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">FTA:</Typography>
            <Typography variant="body1">{stats.fta}</Typography>
          </Grid>
          
          {/* 3-Pointers */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">3-Point Shots</Typography>
            <Divider sx={{ mb: 1 }} />
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">3-Point %:</Typography>
            <Typography variant="body1" fontWeight="bold">{stats.fg3Percentage}%</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">3PM:</Typography>
            <Typography variant="body1">{stats.fg3m}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">3PA:</Typography>
            <Typography variant="body1">{stats.fg3a}</Typography>
          </Grid>
          
          {/* 2-Pointers */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">2-Point Shots</Typography>
            <Divider sx={{ mb: 1 }} />
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">2-Point %:</Typography>
            <Typography variant="body1" fontWeight="bold">{stats.fg2Percentage}%</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">2PM:</Typography>
            <Typography variant="body1">{stats.fg2m}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">2PA:</Typography>
            <Typography variant="body1">{stats.fg2a}</Typography>
          </Grid>
          
          {/* Career Totals */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">Career Totals</Typography>
            <Divider sx={{ mb: 1 }} />
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">Total Points:</Typography>
            <Typography variant="body1" fontWeight="bold">{stats.totalPoints}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">Games:</Typography>
            <Typography variant="body1">{sessions.length}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">PPG:</Typography>
            <Typography variant="body1" fontWeight="bold">
              {sessions.length > 0 ? (stats.totalPoints / sessions.length).toFixed(1) : 0}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: '12px' }}>
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
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Shooting %']}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    name="Shooting %" 
                    stroke="#1976d2" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
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
          <Paper elevation={3} sx={{ p: 2, borderRadius: '12px' }}>
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
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="shotsMade" name="Shots Made" fill="#4caf50" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shotsAttempted" name="Shots Attempted" fill="#ff9800" radius={[4, 4, 0, 0]} />
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