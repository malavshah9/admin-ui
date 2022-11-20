import React from "react";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

function DataTable(props: DataGridProps) {
  return <DataGrid {...props} />;
}

export default DataTable;
