import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import GridActionsCellItem from "@atomics/GridActionsCellItem";

export const AdminColumnsData: GridColumns = [
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    minWidth: 190,
    editable: true,
  },
  {
    field: "email",
    headerName: "First name",
    sortable: true,
    minWidth: 240,
    editable: true,
  },

  { field: "role", headerName: "Last name", sortable: true, minWidth: 190 },

  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    align: "center",
    minWidth: 190,
    getActions: (params) => {
      return [
        <GridActionsCellItem iconType="delete" label="Delete" />,
        <GridActionsCellItem iconType="edit" label="Edit" />,
      ];
    },
  },
];
