import React from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  LinearProgress,
  Box
} from '@mui/material';

function NbaComparison({ userPercentage }) {
  // NBA player data with shooting percentages
  // These are example field goal percentages from recent seasons
  const nbaPlayers = [
    { name: "Stephen Curry", team: "Golden State Warriors", percentage: 49.3 },
    { name: "Kevin Durant", team: "Phoenix Suns", percentage: 52.0 },
    { name: "LeBron James", team: "Los Angeles Lakers", percentage: 50.6 },
    { name: "Nikola Jokić", team: "Denver Nuggets", percentage: 58.3 },
    { name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", percentage: 57.7 },
    { name: "Kyrie Irving", team: "Dallas Mavericks", percentage: 49.4 },
    { name: "Jayson Tatum", team: "Boston Celtics", percentage: 47.1 },
    { name: "Joel Embiid", team: "Philadelphia 76ers", percentage: 51.4 },
    { name: "Devin Booker", team: "Phoenix Suns", percentage: 47.7 },
    { name: "Luka Dončić", team: "Dallas Mavericks", percentage: 48.2 },
    { name: "Damian Lillard", team: "Milwaukee Bucks", percentage: 44.2 },
    { name: "Ja Morant", team: "Memphis Grizzlies", percentage: 46.3 },
    { name: "Anthony Edwards", team: "Minnesota Timberwolves", percentage: 45.9 },
    { name: "Trae Young", team: "Atlanta Hawks", percentage: 43.0 },
    { name: "Zion Williamson", team: "New Orleans Pelicans", percentage: 54.8 },
  ];

  // Add user to the list
  const allPlayers = [
    { name: "YOU", team: "HoopMetrics All-Stars", percentage: userPercentage || 0 },
    ...nbaPlayers
  ];

  // Sort by percentage (highest first)
  const sortedPlayers = [...allPlayers].sort((a, b) => b.percentage - a.percentage);
  
  // Find user's rank
  const userRank = sortedPlayers.findIndex(player => player.name === "YOU") + 1;
  
  // Calculate percentile (if user is #1, they're in the 100th percentile)
  const percentile = userPercentage > 0 
    ? (((sortedPlayers.length - userRank + 1) / sortedPlayers.length) * 100).toFixed(1)
    : 0;

  return (
    <Paper elevation={3} className="comparison-paper">
      <Typography variant="h5" component="h2" gutterBottom>
        NBA Comparison
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Your NBA Ranking
        </Typography>
        
        {userPercentage > 0 ? (
          <>
            <Typography variant="h4" color="primary" gutterBottom>
              #{userRank} of {sortedPlayers.length}
            </Typography>
            
            <Typography variant="body1" paragraph>
              Your {userPercentage}% shooting places you in the {percentile}th percentile among these NBA stars.
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ mr: 1, minWidth: 40 }}>
                0%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={parseFloat(percentile)} 
                sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ ml: 1, minWidth: 40 }}>
                100%
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Add shooting sessions to see your NBA ranking
          </Typography>
        )}
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Shooting Percentage Leaderboard
      </Typography>
      
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {sortedPlayers.map((player, index) => (
          <React.Fragment key={player.name}>
            <ListItem 
              sx={{ 
                bgcolor: player.name === "YOU" ? 'rgba(33, 150, 243, 0.1)' : 'inherit',
                fontWeight: player.name === "YOU" ? 'bold' : 'normal'
              }}
            >
              <Typography variant="body2" sx={{ mr: 2, minWidth: 24 }}>
                #{index + 1}
              </Typography>
              <ListItemText 
                primary={
                  <Typography variant={player.name === "YOU" ? "subtitle1" : "body1"}>
                    {player.name} {player.name === "YOU" ? "(You)" : ""}
                  </Typography>
                } 
                secondary={player.team} 
              />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {player.percentage.toFixed(1)}%
              </Typography>
            </ListItem>
            {index < sortedPlayers.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default NbaComparison;