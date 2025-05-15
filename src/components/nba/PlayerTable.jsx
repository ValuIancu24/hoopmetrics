// src/components/nba/PlayerTable.jsx - With fixed scrollbars
import React, { useRef, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow,
  Typography,
  Box,
  Paper,
  Button
} from '@mui/material';
import SortableTableHead from '../common/SortableTableHead';
import PersonPinIcon from '@mui/icons-material/PersonPin';

// Define table columns with specific widths - reduced for better fit
const columns = [
  { id: 'rank', label: 'Rank', numeric: true, sortable: false, width: '55px' },
  { id: 'name', label: 'Player', numeric: false, width: '200px' }, // Slightly smaller
  { id: 'team', label: 'Team', numeric: false, width: '180px' }, // Slightly smaller
  { id: 'percentage', label: 'FG%', numeric: true, width: '70px' },
  { id: 'fgm', label: 'FGM', numeric: true, width: '70px' },
  { id: 'fga', label: 'FGA', numeric: true, width: '70px' },
  { id: 'ftPercentage', label: 'FT%', numeric: true, width: '70px' },
  { id: 'ftm', label: 'FTM', numeric: true, width: '70px' },
  { id: 'fta', label: 'FTA', numeric: true, width: '70px' },
  { id: 'fg3Percentage', label: '3P%', numeric: true, width: '70px' },
  { id: 'fg3m', label: '3PM', numeric: true, width: '70px' },
  { id: 'fg3a', label: '3PA', numeric: true, width: '70px' },
  { id: 'fg2Percentage', label: '2P%', numeric: true, width: '70px' },
  { id: 'fg2m', label: '2PM', numeric: true, width: '70px' },
  { id: 'fg2a', label: '2PA', numeric: true, width: '70px' },
  { id: 'careerPoints', label: 'Career Points', numeric: true, width: '110px' },
  { id: 'gamesPlayed', label: 'Games', numeric: true, width: '75px' }
];

/**
 * Component to display sortable player stats table with fixed scrollbars
 */
function PlayerTable({ players, orderBy, order, onRequestSort }) {
  // Refs for scrolling
  const tableContainerRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const userRowRef = useRef(null);
  const tableContainerWrapperRef = useRef(null);

  // Sync horizontal scroll
  useEffect(() => {
    const handleHorizontalScroll = () => {
      if (tableContainerRef.current && horizontalScrollRef.current) {
        tableContainerRef.current.scrollLeft = horizontalScrollRef.current.scrollLeft;
      }
    };

    const horizontalScrollbar = horizontalScrollRef.current;
    if (horizontalScrollbar) {
      horizontalScrollbar.addEventListener('scroll', handleHorizontalScroll);
      return () => {
        horizontalScrollbar.removeEventListener('scroll', handleHorizontalScroll);
      };
    }
  }, []);

  // Function to scroll to the user's row
  const scrollToUserRow = () => {
    if (userRowRef.current && tableContainerWrapperRef.current) {
      // Get the position of the user row
      const userRowOffsetTop = userRowRef.current.offsetTop;
      
      // Scroll to the user row with smooth behavior
      tableContainerWrapperRef.current.scrollTo({
        top: userRowOffsetTop - 80, // Position row with some space above it
        behavior: 'smooth'
      });
    }
  };

  if (!players || players.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>No player data available</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Find Me Button and Information */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="body2" color="textSecondary">
          Showing {players.length} players • Scroll to view all stats
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonPinIcon />}
          onClick={scrollToUserRow}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 10px rgba(25, 118, 210, 0.25)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 15px rgba(25, 118, 210, 0.35)',
            }
          }}
        >
          Find Me
        </Button>
      </Box>
      
      {/* Main Table Container */}
      <Paper 
        elevation={3}
        sx={{ 
          borderRadius: '12px', 
          mb: 3,
          border: '1px solid rgba(224, 224, 224, 0.5)',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', height: '400px' }}>
          {/* Vertical scrollable container */}
          <div 
            ref={tableContainerWrapperRef}
            style={{ 
              height: '100%', 
              width: '100%', 
              overflowY: 'scroll',
              overflowX: 'hidden',
              position: 'relative',
              paddingBottom: '16px' // Add padding for the horizontal scrollbar
            }}
          >
            {/* Horizontal scrollable container */}
            <div
              ref={tableContainerRef}
              style={{
                overflowX: 'hidden',
                width: '100%',
                position: 'relative'
              }}
            >
              <Table 
                stickyHeader 
                style={{
                  width: '1700px', // Reduced width to match new column sizes
                  tableLayout: 'fixed'
                }}
              >
                <SortableTableHead 
                  columns={columns} 
                  orderBy={orderBy} 
                  order={order} 
                  onRequestSort={onRequestSort} 
                />
                <TableBody>
                  {players.map((player, index) => {
                    const isUserRow = player.name === "YOU";
                    return (
                      <TableRow 
                        key={player.name}
                        ref={isUserRow ? userRowRef : null}
                        sx={{ 
                          bgcolor: isUserRow ? 'rgba(33, 150, 243, 0.08)' : 'inherit',
                          '&:nth-of-type(odd)': {
                            bgcolor: isUserRow 
                              ? 'rgba(33, 150, 243, 0.08)' 
                              : 'rgba(0, 0, 0, 0.02)',
                          },
                          height: '60px',
                          '&:hover': {
                            bgcolor: isUserRow 
                              ? 'rgba(33, 150, 243, 0.12)' 
                              : 'rgba(0, 0, 0, 0.04)',
                          }
                        }}
                      >
                        <TableCell align="center" sx={{ fontWeight: isUserRow ? 'bold' : 'normal', p: '8px 16px', whiteSpace: 'nowrap' }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ 
                          p: '8px 16px', 
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '220px'
                        }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            width: '100%'
                          }}>
                            {isUserRow && (
                              <Box 
                                component="span" 
                                sx={{ 
                                  flexShrink: 0,
                                  width: 10,
                                  height: 10,
                                  bgcolor: '#1976d2',
                                  borderRadius: '50%',
                                  mr: 1
                                }}
                              />
                            )}
                            <Typography 
                              fontWeight={isUserRow ? 'bold' : 'normal'}
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {player.name} {isUserRow ? "(You)" : ""}
                            </Typography>
                          </Box>
                        </TableCell>
                <TableCell sx={{ 
                          p: '8px 16px', 
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '200px'
                        }}>{player.team}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: orderBy === 'percentage' ? 'bold' : 'normal', p: '8px 16px', whiteSpace: 'nowrap' }}>
                          {player.percentage}%
                        </TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.fgm.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.fga.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: orderBy === 'ftPercentage' ? 'bold' : 'normal', p: '8px 16px', whiteSpace: 'nowrap' }}>
                          {player.ftPercentage}%
                        </TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.ftm.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.fta.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: orderBy === 'fg3Percentage' ? 'bold' : 'normal', p: '8px 16px', whiteSpace: 'nowrap' }}>
                          {player.fg3Percentage}%
                        </TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.fg3m.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.fg3a.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: orderBy === 'fg2Percentage' ? 'bold' : 'normal', p: '8px 16px', whiteSpace: 'nowrap' }}>
                          {player.fg2Percentage}%
                        </TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.fg2m.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.fg2a.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: orderBy === 'careerPoints' ? 'bold' : 'normal', p: '8px 16px', whiteSpace: 'nowrap' }}>
                          {player.careerPoints.toLocaleString()}
                        </TableCell>
                        <TableCell align="right" sx={{ p: '8px 16px', whiteSpace: 'nowrap' }}>{player.gamesPlayed}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Always visible horizontal scrollbar at the bottom */}
          <div 
            style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: '16px', 
              overflowX: 'scroll',
              overflowY: 'hidden',
              backgroundColor: '#fff',
              borderTop: '1px solid rgba(224, 224, 224, 0.4)'
            }}
            ref={horizontalScrollRef}
            onScroll={(e) => {
              // Sync horizontal scroll with content
              if (tableContainerRef.current) {
                tableContainerRef.current.style.transform = `translateX(-${e.target.scrollLeft}px)`;
              }
            }}
          >
            <div style={{ width: '1700px', height: '1px' }}></div>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default PlayerTable;