import React from "react";
import {
  GridColumns,
  GridActionsCellItem,
  GridActionsCellItemProps,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export type GridActionsCellItemCustomProps = {
  label: string;
  iconType: "edit" | "delete";
};

const GridActionsCellItemCustom = ({
  iconType,
  label,
}: GridActionsCellItemCustomProps) => {
  return (
    <GridActionsCellItem
      icon={iconType === "delete" ? <DeleteIcon /> : <EditIcon />}
      label={label}
    />
  );
};

export default GridActionsCellItemCustom;
