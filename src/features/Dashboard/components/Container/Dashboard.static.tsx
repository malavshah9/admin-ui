import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import GridActionsCellItem from "@atomics/GridActionsCellItem";

export const AdminColumnsData: GridColumns = [
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    editable: true,
    align: "center",
  },
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    editable: true,
    align: "center",
  },

  { field: "role", headerName: "Last name", sortable: true, editable: true },

  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    align: "center",
    getActions: (params) => {
      return [
        <GridActionsCellItem iconType="delete" label="Delete" />,
        <GridActionsCellItem iconType="edit" label="Edit" />,
      ];
    },
  },
];
