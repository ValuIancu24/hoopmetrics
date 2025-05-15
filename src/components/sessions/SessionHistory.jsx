// src/components/sessions/SessionHistory.jsx - Updated with enhanced styling (continued)
import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  TablePagination,
  Chip,
  Box,
  InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

function SessionHistory({ sessions, onRemoveSession }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteClick = (index) => {
    setSessionToDelete(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (sessionToDelete !== null) {
      onRemoveSession(sessionToDelete);
    }
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter sessions based on search term
  const filteredSessions = sessions
    .filter(session => 
      session.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.shotType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

  // Calculate the sessions to display on the current page
  const displayedSessions = filteredSessions
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Helper function to get shot type color
  const getShotTypeColor = (shotType) => {
    switch(shotType) {
      case '2pt': return 'primary';
      case '3pt': return 'secondary';
      case 'ft': return 'default';
      default: return 'default';
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Session History
      </Typography>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: -30,
            left: -30,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(245,245,245,1) 0%, rgba(245,245,245,0) 70%)`,
            zIndex: 0
          }}
        />
        
        <TextField
          fullWidth
          placeholder="Search sessions by date, location, or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" disabled>
                  <FilterListIcon color="action" />
                </IconButton>
              </InputAdornment>
            ),
            sx: { 
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              bgcolor: 'white',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              }
            }
          }}
          variant="outlined"
          size="small"
          sx={{ 
            mb: 2,
            position: 'relative',
            zIndex: 1
          }}
        />
        
        <TableContainer 
          sx={{ 
            borderRadius: '8px',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            '.MuiTableCell-root': {
              borderBottomColor: 'rgba(224, 224, 224, 0.5)'
            }
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)' }}>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Shot Type</TableCell>
                <TableCell align="right">Made</TableCell>
                <TableCell align="right">Attempted</TableCell>
                <TableCell align="right">Percentage</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedSessions.length > 0 ? (
                displayedSessions.map((session, index) => {
                  const realIndex = sessions.findIndex(s => s.id === session.id);
                  // Calculate percentage as a number for conditional styling
                  const percentageNum = parseFloat(session.percentage);
                  let percentageColor = '#666';
                  if (percentageNum >= 70) percentageColor = '#4caf50';
                  else if (percentageNum >= 50) percentageColor = '#ff9800';
                  else if (percentageNum < 30) percentageColor = '#f44336';
                  
                  return (
                    <TableRow 
                      key={session.id}
                      sx={{ 
                        transition: 'background-color 0.2s ease',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.03)'
                        }
                      }}
                    >
                      <TableCell>{formatDate(session.date)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={
                            session.shotType === '2pt' ? '2-Point' : 
                            session.shotType === '3pt' ? '3-Point' : 'Free Throw'
                          }
                          size="small"
                          color={getShotTypeColor(session.shotType)}
                          sx={{ 
                            fontWeight: 500,
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{session.shotsMade}</TableCell>
                      <TableCell align="right">{session.shotsAttempted}</TableCell>
                      <TableCell 
                        align="right" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: percentageColor
                        }}
                      >
                        {session.percentage}%
                      </TableCell>
                      <TableCell>{session.location || '-'}</TableCell>
                      <TableCell 
                        sx={{ 
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {session.notes || '-'}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="error" 
                          size="small"
                          onClick={() => handleDeleteClick(realIndex)}
                          sx={{
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: 'rgba(244, 67, 54, 0.08)',
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    {sessions.length === 0 
                      ? (
                        <Box sx={{ p: 2, color: 'text.secondary' }}>
                          <Typography variant="body1" gutterBottom>
                            No sessions added yet
                          </Typography>
                          <Typography variant="body2">
                            Go to 'Add Session' to get started!
                          </Typography>
                        </Box>
                      ) 
                      : (
                        <Box sx={{ p: 2, color: 'text.secondary' }}>
                          <Typography variant="body1">
                            No matching sessions found
                          </Typography>
                        </Box>
                      )
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSessions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ 
            borderTop: '1px solid rgba(224, 224, 224, 0.5)',
            '.MuiTablePagination-selectIcon': {
              color: 'primary.main'
            },
            '.MuiTablePagination-actions button:hover': {
              bgcolor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
        />
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this session? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={handleDeleteCancel}
            sx={{ 
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            autoFocus
            sx={{ 
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(244, 67, 54, 0.2)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)'
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SessionHistory;