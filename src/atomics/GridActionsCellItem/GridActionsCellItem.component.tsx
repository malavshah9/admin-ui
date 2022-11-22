import React, { MouseEventHandler } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export type GridActionsCellItemCustomProps = {
  label: string;
  iconType: "edit" | "delete";
  onClick?: MouseEventHandler
};

const GridActionsCellItemCustom = ({
  iconType,
  label,
  onClick
}: GridActionsCellItemCustomProps) => {
  return (
    <GridActionsCellItem
      icon={iconType === "delete" ? <DeleteIcon /> : <EditIcon />}
      label={label}
      onClick={onClick}
    />
  );
};

export default GridActionsCellItemCustom;
