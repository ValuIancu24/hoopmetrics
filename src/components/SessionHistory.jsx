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
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

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

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Session History
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search sessions by date, location, or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
        
        <TableContainer>
          <Table>
            <TableHead>
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
                  return (
                    <TableRow key={session.id}>
                      <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={
                            session.shotType === '2pt' ? '2-Point' : 
                            session.shotType === '3pt' ? '3-Point' : 'Free Throw'
                          }
                          size="small"
                          color={
                            session.shotType === '2pt' ? 'primary' : 
                            session.shotType === '3pt' ? 'secondary' : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell align="right">{session.shotsMade}</TableCell>
                      <TableCell align="right">{session.shotsAttempted}</TableCell>
                      <TableCell align="right">{session.percentage}%</TableCell>
                      <TableCell>{session.location || '-'}</TableCell>
                      <TableCell>{session.notes || '-'}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="error" 
                          size="small"
                          onClick={() => handleDeleteClick(realIndex)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    {sessions.length === 0 
                      ? "No sessions added yet. Go to 'Add Session' to get started!" 
                      : "No matching sessions found"}
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
        />
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this session? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SessionHistory;