// src/components/common/SortableTableHead.jsx - Updated with enhanced styling
import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

/**
 * A reusable sortable table header component with sticky header support
 * 
 * @param {Array} columns - Array of column configuration objects
 * @param {string} orderBy - The current sort column
 * @param {string} order - The current sort direction ('asc' or 'desc')
 * @param {Function} onRequestSort - Function to call when sort header is clicked
 */
function SortableTableHead({ columns, orderBy, order, onRequestSort }) {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (

    <TableHead 
      sx={{ 
        bgcolor: 'rgba(25, 118, 210, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}
    >

    <TableHead sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)' }}>

      <TableRow>
        {columns.map((column) => (
          <TableCell 
            key={column.id}
            align={column.numeric ? 'right' : 'left'} 
            sortDirection={orderBy === column.id ? order : false}
            style={column.width ? {width: column.width} : {}}
            sx={{ 
              fontWeight: 600,
              color: orderBy === column.id ? 'primary.main' : 'inherit',

              transition: 'all 0.2s ease',
              backgroundColor: 'white',
              position: 'sticky',
              top: 0,
              zIndex: 11,
              padding: '10px 16px', // Match the padding in table cells
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderBottom: '2px solid rgba(224, 224, 224, 1)'
              }

              transition: 'all 0.2s ease'

            }}
          >
            {column.sortable !== false ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
                sx={{
                  '&.MuiTableSortLabel-active': {
                    color: 'primary.main',
                    fontWeight: 600
                  },
                  '& .MuiTableSortLabel-icon': {
                    transition: 'all 0.2s ease',
                    opacity: orderBy === column.id ? 1 : 0.3
                  },
                  '&:hover': {
                    color: 'primary.main',
                    '& .MuiTableSortLabel-icon': {
                      opacity: 0.7
                    }
                  }
                }}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SortableTableHead;