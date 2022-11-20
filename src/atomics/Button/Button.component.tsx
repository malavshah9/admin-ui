import React from "react";

import MaterialButton, { ButtonProps } from "@mui/material/Button";

const Button = (props: ButtonProps) => {
  return <MaterialButton {...props} />;
};

export default Button;
