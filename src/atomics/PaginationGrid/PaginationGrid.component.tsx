import React from "react";

import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

import MaterialPagination from "@mui/material/Pagination";

const Pagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MaterialPagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(_, value: number) => apiRef.current.setPage(value - 1)}
      showFirstButton
      showLastButton
    />
  );
};

export default Pagination;
