import React, { useState } from "react";

import DataGrid from "../components/DataGrid";
import useFetch from "../../../hooks/useFetch.hooks";
import API_ENDPOINTS from "../../../util/endpoints";
import GridPagination from "../components/GridPagination";
import { AdminColumnsData } from "./Admin.static";

export type AdminItem = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
};

const Admin = () => {
  const { data, error } = useFetch<AdminItem[]>(API_ENDPOINTS.members);
  const [pageSize, setPageSize] = useState(5);

  const [selectedPage, setSelectedPage] = useState(0);
  const actualData = data || [];

  const onChangePageSize = (pgSize: number) => setPageSize(pgSize);
  const onChangePage = (pg: number) => setSelectedPage(pg);
  if (error) {
    return <div>Error Happened while calling an API</div>;
  }

  return (
    <DataGrid
      columns={AdminColumnsData}
      autoHeight
      checkboxSelection
      paginationMode="client"
      rowsPerPageOptions={[5, 10, 15, 20]}
      page={selectedPage}
      pageSize={pageSize}
      onPageSizeChange={onChangePageSize}
      onPageChange={onChangePage}
      pagination={true}
      rows={actualData}
      components={{
        Pagination: GridPagination,
      }}
    />
  );
};

export default Admin;
