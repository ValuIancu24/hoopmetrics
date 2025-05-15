// src/components/nba/PlayerTable.jsx
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow,
  Typography,
  Box
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
    <TableContainer style={{ overflowX: 'auto' }}>
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
                bgcolor: player.name === "YOU" ? 'rgba(33, 150, 243, 0.1)' : 'inherit',
                '&:nth-of-type(odd)': {
                  bgcolor: player.name === "YOU" 
                    ? 'rgba(33, 150, 243, 0.1)' 
                    : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                <Typography fontWeight={player.name === "YOU" ? 'bold' : 'normal'}>
                  {player.name} {player.name === "YOU" ? "(You)" : ""}
                </Typography>
              </TableCell>
              <TableCell>{player.team}</TableCell>
              <TableCell align="right">{player.percentage}%</TableCell>
              <TableCell align="right">{player.fgm.toLocaleString()}</TableCell>
              <TableCell align="right">{player.fga.toLocaleString()}</TableCell>
              <TableCell align="right">{player.ftPercentage}%</TableCell>
              <TableCell align="right">{player.ftm.toLocaleString()}</TableCell>
              <TableCell align="right">{player.fta.toLocaleString()}</TableCell>
              <TableCell align="right">{player.fg3Percentage}%</TableCell>
              <TableCell align="right">{player.fg3m.toLocaleString()}</TableCell>
              <TableCell align="right">{player.fg3a.toLocaleString()}</TableCell>
              <TableCell align="right">{player.fg2Percentage}%</TableCell>
              <TableCell align="right">{player.fg2m.toLocaleString()}</TableCell>
              <TableCell align="right">{player.fg2a.toLocaleString()}</TableCell>
              <TableCell align="right">{player.careerPoints.toLocaleString()}</TableCell>
              <TableCell align="right">{player.gamesPlayed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PlayerTable;