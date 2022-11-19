import * as React from "react";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

function CustomPagination() {
  const apiRef = useGridApiContext();
  console.log(apiRef);
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  console.log(
    "apiRef.getRowsCount :",
    apiRef.current.getRowsCount(),
    apiRef.current
  );
  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
export default CustomPagination;
