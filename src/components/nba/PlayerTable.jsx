// src/components/nba/PlayerTable.jsx - Updated with enhanced styling
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow,
  Typography,
  Box,
  Paper
} from '@mui/material';
import SortableTableHead from '../common/SortableTableHead';

// Define table columns
const columns = [
  { id: 'rank', label: 'Rank', numeric: true, sortable: false, width: '80px' },
  { id: 'name', label: 'Player', numeric: false },
  { id: 'team', label: 'Team', numeric: false },
  { id: 'percentage', label: 'FG%', numeric: true },
  { id: 'fgm', label: 'FGM', numeric: true },
  { id: 'fga', label: 'FGA', numeric: true },
  { id: 'ftPercentage', label: 'FT%', numeric: true },
  { id: 'ftm', label: 'FTM', numeric: true },
  { id: 'fta', label: 'FTA', numeric: true },
  { id: 'fg3Percentage', label: '3P%', numeric: true },
  { id: 'fg3m', label: '3PM', numeric: true },
  { id: 'fg3a', label: '3PA', numeric: true },
  { id: 'fg2Percentage', label: '2P%', numeric: true },
  { id: 'fg2m', label: '2PM', numeric: true },
  { id: 'fg2a', label: '2PA', numeric: true },
  { id: 'careerPoints', label: 'Career Points', numeric: true },
  { id: 'gamesPlayed', label: 'Games', numeric: true }
];

/**
 * Component to display sortable player stats table
 * 
 * @param {Array} players - Array of player objects with stats
 * @param {string} orderBy - Current sort column
 * @param {string} order - Current sort direction ('asc' or 'desc')
 * @param {Function} onRequestSort - Function to call when sort header is clicked
 */
function PlayerTable({ players, orderBy, order, onRequestSort }) {
  if (!players || players.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>No player data available</Typography>
      </Box>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        mb: 3
      }}
    >
      <TableContainer>
        <Table size="small">
          <SortableTableHead 
            columns={columns} 
            orderBy={orderBy} 
            order={order} 
            onRequestSort={onRequestSort} 
          />
          <TableBody>
            {players.map((player, index) => (
              <TableRow 
                key={player.name}
                sx={{ 
                  bgcolor: player.name === "YOU" ? 'rgba(33, 150, 243, 0.08)' : 'inherit',
                  '&:nth-of-type(odd)': {
                    bgcolor: player.name === "YOU" 
                      ? 'rgba(33, 150, 243, 0.08)' 
                      : 'rgba(0, 0, 0, 0.02)',
                  },
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    bgcolor: player.name === "YOU" 
                      ? 'rgba(33, 150, 243, 0.12)' 
                      : 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <TableCell align="center" sx={{ fontWeight: player.name === "YOU" ? 'bold' : 'normal' }}>
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography 
                    fontWeight={player.name === "YOU" ? 'bold' : 'normal'}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {player.name === "YOU" && (
                      <Box 
                        component="span" 
                        sx={{ 
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          bgcolor: '#1976d2',
                          borderRadius: '50%',
                          mr: 1
                        }}
                      />
                    )}
                    {player.name} {player.name === "YOU" ? "(You)" : ""}
                  </Typography>
                </TableCell>
                <TableCell>{player.team}</TableCell>
                <TableCell align="right" sx={{ fontWeight: orderBy === 'percentage' ? 'bold' : 'normal' }}>
                  {player.percentage}%
                </TableCell>
                <TableCell align="right">{player.fgm.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fga.toLocaleString()}</TableCell>
                <TableCell align="right" sx={{ fontWeight: orderBy === 'ftPercentage' ? 'bold' : 'normal' }}>
                  {player.ftPercentage}%
                </TableCell>
                <TableCell align="right">{player.ftm.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fta.toLocaleString()}</TableCell>
                <TableCell align="right" sx={{ fontWeight: orderBy === 'fg3Percentage' ? 'bold' : 'normal' }}>
                  {player.fg3Percentage}%
                </TableCell>
                <TableCell align="right">{player.fg3m.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fg3a.toLocaleString()}</TableCell>
                <TableCell align="right" sx={{ fontWeight: orderBy === 'fg2Percentage' ? 'bold' : 'normal' }}>
                  {player.fg2Percentage}%
                </TableCell>
                <TableCell align="right">{player.fg2m.toLocaleString()}</TableCell>
                <TableCell align="right">{player.fg2a.toLocaleString()}</TableCell>
                <TableCell align="right" sx={{ fontWeight: orderBy === 'careerPoints' ? 'bold' : 'normal' }}>
                  {player.careerPoints.toLocaleString()}
                </TableCell>
                <TableCell align="right">{player.gamesPlayed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PlayerTable;