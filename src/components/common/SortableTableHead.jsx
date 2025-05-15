// src/components/common/SortableTableHead.jsx
import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

/**
 * A reusable sortable table header component
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
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell 
            key={column.id}
            align={column.numeric ? 'right' : 'left'} 
            sortDirection={orderBy === column.id ? order : false}
            style={column.width ? {width: column.width} : {}}
          >
            {column.sortable !== false ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
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