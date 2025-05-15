// src/hooks/useSort.js
import { useState } from 'react';

function useSort(defaultOrderBy = 'percentage', defaultOrder = 'desc') {
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [order, setOrder] = useState(defaultOrder);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // This should be a FUNCTION that takes items as a parameter
  const sortedItems = (items) => {
    if (!items || items.length === 0) return [];
    
    return [...items].sort((a, b) => {
      const aValue = a[orderBy] || 0;
      const bValue = b[orderBy] || 0;
      
      if (order === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  };

  return {
    order,
    orderBy,
    handleRequestSort,
    sortedItems  // This is now a function
  };
}

export default useSort;