import React, { useState } from "react";

import Header from "../components/Header";
import Container from "../components/Container";

import dashboard from "./Dashboard.module.scss";

const Admin = () => {
  const [searchString, setSearchString] = useState("");
  return (
    <div className={dashboard.container}>
      <Header setSearchString={setSearchString} />
      <Container searchString={searchString} />
    </div>
  );
};

export default Admin;
