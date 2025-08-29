import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

function Pagination({ items, itemsPerPage, currentPage, onPageChange }) {
  const pageCount = Math.ceil(items.length / itemsPerPage);

  if (pageCount <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <MuiPagination
        count={pageCount}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
      />
    </Box>
  );
}

export default Pagination;