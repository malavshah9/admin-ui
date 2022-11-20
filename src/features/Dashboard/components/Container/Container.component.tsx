import React, { useState, useEffect } from "react";

import { GridCellEditStopParams } from "@mui/x-data-grid";

import DataGrid from "@atomics/DataGrid";
import PaginationGrid from "@atomics/PaginationGrid";
import useFetch from "@hooks/useFetch.hooks";
import API_ENDPOINTS from "@util/endpoints";
import { searchInAdminItem } from "@util/helper";
import COPY_TEXT from "@util/copyText";

import { AdminColumnsData } from "./Dashboard.static";
import container from "./Container.module.scss";

export type AdminItem = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
};

type ContainerProps = {
  searchString: string;
};

const Container = ({ searchString }: ContainerProps) => {
  const { data, error } = useFetch<AdminItem[]>(API_ENDPOINTS.members);
  const [pageSize, setPageSize] = useState(10);

  const [selectedPage, setSelectedPage] = useState(0);
  const actualData =
    searchString && data
      ? data.filter((item) => searchInAdminItem(searchString, item))
      : data || [];

  useEffect(() => {
    if (selectedPage !== 0) {
      setSelectedPage(0);
    }
  }, [searchString]);

  const onChangePageSize = (pgSize: number) => setPageSize(pgSize);

  const onChangePage = (pg: number) => setSelectedPage(pg);

  const onCellEditStop = (params: GridCellEditStopParams<AdminItem>) => {
    // TODO: Call PUT API and update object on server side
    console.log(params);
  };

  if (error) {
    return <div>{COPY_TEXT.ERRORS.callingAPI}</div>;
  }

  return (
    <div className={container.container}>
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
        components={{
          Pagination: PaginationGrid,
        }}
      />
    </div>
  );
};

export default Container;
