import React, { useState, useEffect } from "react";

import { GridCellEditStopParams, GridSelectionModel } from "@mui/x-data-grid";

import DataGrid from "@atomics/DataGrid";
import PaginationGrid from "@atomics/PaginationGrid";
import Button from "@atomics/Button";

import { searchInAdminItem } from "@util/helper";
import COPY_TEXT from "@util/copyText";

import { AdminColumnsData } from "./Dashboard.static";
import container from "./Container.module.scss";
import { getAdminData, AdminItem } from "@APIs/Users.api";
import useAsync from "@hooks/useAsync.hooks";
import useUsers from "./useUsers.hooks";

type ContainerProps = {
  searchString: string;
};

const Container = ({ searchString }: ContainerProps) => {
  const { data, error, isLoading, isIdle, isError, run } = useAsync<
    Array<AdminItem>
  >({ data: [], error: null, status: "idle" });
  const { users, onSearch, setInitialData } = useUsers();

  const [pageSize, setPageSize] = useState(10);
  const [selection, setSelection] = useState<Array<AdminItem["id"]>>([]);

  const [selectedPage, setSelectedPage] = useState(0);
  const [actualData, setActualData] = useState<AdminItem[]>([]);
  const [totalCount, setTotalCount] = useState(data ? data.length : 0);

  useEffect(() => {
    run(getAdminData());
  }, []);

  useEffect(() => {
    if (data) {
      setInitialData(data);
    }
  }, [data]);

  useEffect(() => {
    const tempActualData = (
      searchString && data
        ? data.filter((item) => searchInAdminItem(searchString, item))
        : data || []
    ).slice(0, 10);

    setActualData(tempActualData);
  }, [data, searchString]);

  useEffect(() => {
    if (selectedPage !== 0) {
      setSelectedPage(0);
    }
  }, [searchString]);

  useEffect(() => {
    if (data) {
      const startIndex = selectedPage * pageSize;

      const filteredData = searchString
        ? data.filter((item) => searchInAdminItem(searchString, item))
        : data;

      setTotalCount(filteredData.length);

      const paginatedData = filteredData.slice(
        startIndex,
        startIndex + pageSize
      );

      setActualData(paginatedData);
    }
  }, [pageSize, selectedPage, data, searchString]);

  const onChangePageSize = (pgSize: number) => setPageSize(pgSize);

  const onChangePage = (pg: number) => setSelectedPage(pg);

  const onSelectionModeChange = (selectionParam: GridSelectionModel) => {
    setSelection(selectionParam as Array<string>);
  };

  const onDeleteSelected = () => {};

  const onCellEditStop = (params: GridCellEditStopParams<AdminItem>) => {
    // TODO: Call PUT API and update object on server side
    console.log(params);
  };

  if (isError) {
    return <div>{error?.message || COPY_TEXT.ERRORS.callingAPI}</div>;
  }

  return (
    <div className={container.container}>
      {selection.length ? (
        <Button variant="text" onClick={onDeleteSelected}>
          {COPY_TEXT.BUTTONS.deleteSelected}
        </Button>
      ) : null}

      <DataGrid
        columns={AdminColumnsData}
        autoHeight
        checkboxSelection
        paginationMode="server"
        rowCount={totalCount}
        rowsPerPageOptions={[10]}
        page={selectedPage}
        pageSize={pageSize}
        editMode={"cell"}
        onPageSizeChange={onChangePageSize}
        onPageChange={onChangePage}
        pagination={true}
        rows={actualData}
        onCellEditStop={onCellEditStop}
        disableSelectionOnClick
        onSelectionModelChange={onSelectionModeChange}
        components={{
          Pagination: PaginationGrid,
        }}
      />
    </div>
  );
};

export default Container;
