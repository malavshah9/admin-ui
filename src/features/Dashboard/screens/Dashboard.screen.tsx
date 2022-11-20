import React, { useState } from "react";
import { GridCellEditStopParams } from "@mui/x-data-grid";

import DataGrid from "@atomics/DataGrid";
import Input from "@atomics/Input";
import useFetch from "@hooks/useFetch.hooks";
import API_ENDPOINTS from "@util/endpoints";

import { AdminColumnsData } from "./Dashboard.static";

export type AdminItem = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
};

const Admin = () => {
  const { data, error } = useFetch<AdminItem[]>(API_ENDPOINTS.members);
  const [pageSize, setPageSize] = useState(10);

  const [selectedPage, setSelectedPage] = useState(0);
  const actualData = data || [];

  const onChangePageSize = (pgSize: number) => setPageSize(pgSize);

  const onChangePage = (pg: number) => setSelectedPage(pg);

  const onCellEditStop = (params: GridCellEditStopParams<AdminItem>) => {
    // TODO: Call PUT API and update object on server side
    console.log(params);
  };

  if (error) {
    return <div>Error Happened while calling an API</div>;
  }

  return (
    <>
      <Input fullWidth placeholder="Search by name, email, role" />
      <DataGrid
        columns={AdminColumnsData}
        autoHeight
        checkboxSelection
        paginationMode="client"
        rowsPerPageOptions={[10, 15, 20]}
        page={selectedPage}
        pageSize={pageSize}
        editMode={"cell"}
        onPageSizeChange={onChangePageSize}
        onPageChange={onChangePage}
        pagination={true}
        rows={actualData}
        onCellEditStop={onCellEditStop}
      />
    </>
  );
};

export default Admin;
