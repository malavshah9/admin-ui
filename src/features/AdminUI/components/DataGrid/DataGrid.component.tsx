import * as React from "react";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

function DataTable(props: DataGridProps) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid {...props} />
    </div>
  );
}

export default DataTable;
