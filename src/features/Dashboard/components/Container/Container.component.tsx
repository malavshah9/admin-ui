import React, { useState, useEffect } from "react";

import { GridCellEditStopParams, GridSelectionModel } from "@mui/x-data-grid";

import DataGrid from "@atomics/DataGrid";
import PaginationGrid from "@atomics/PaginationGrid";
import Button from "@atomics/Button";

import COPY_TEXT from "@util/copyText";

import { getAdminData, AdminItem } from "@APIs/Users.api";
import useAsync from "@hooks/useAsync.hooks";

import { ROWS_PER_PAGE } from "@util/constants";

import useUsers from "./useUsers.hooks";

import { AdminColumnsData } from "./Dashboard.static";
import container from "./Container.module.scss";

type ContainerProps = {
  searchString: string;
};

const Container = ({ searchString }: ContainerProps) => {
  const { data, error, isLoading, isError, run } = useAsync<
    Array<AdminItem>
  >({ data: [], error: null, status: "idle" });

  const { users, totalCount, onSearch, setInitialData, onChangePageNumber, pageNumber, pageSize, onChangePageSize, onDeleteSelected} = useUsers();

  const [selection, setSelection] = useState<Array<AdminItem["id"]>>([]);


  useEffect(() => {
    run(getAdminData());
  }, []);

  useEffect(()=>{
      if(data){
        setInitialData(data, pageSize)
      }
  },[data])

  useEffect(() => {
      onSearch(searchString)
  }, [searchString]);

  const onSelectionModeChange = (selectionParam: GridSelectionModel) => {
    setSelection(selectionParam as Array<string>);
  };

  const onDeleteSelectedLocal = () => {
    onDeleteSelected(selection)
  };

  const onCellEditStop = (params: GridCellEditStopParams<AdminItem>) => {
    // TODO: Call PUT API and update object on server side
  };

  if (isError) {
    return <div>{error?.message || COPY_TEXT.ERRORS.callingAPI}</div>;
  }
  
  return (
    <div className={container.container}>
      {selection.length ? (
        <Button variant="text" onClick={onDeleteSelectedLocal}>
          {COPY_TEXT.BUTTONS.deleteSelected}
        </Button>
      ) : null}

      <DataGrid
        columns={AdminColumnsData}
        autoHeight
        checkboxSelection
        paginationMode="server"
        rowCount={totalCount}
        rowsPerPageOptions={ROWS_PER_PAGE}
        page={pageNumber}
        pageSize={pageSize}
        editMode={"cell"}
        onPageSizeChange={onChangePageSize}
        onPageChange={onChangePageNumber}
        pagination={true}
        rows={users}
        onCellEditStop={onCellEditStop}
        disableSelectionOnClick
        onSelectionModelChange={onSelectionModeChange}
        loading={isLoading}
        components={{
          Pagination: PaginationGrid,
        }}
      />
    </div>
  );
};

export default Container;
