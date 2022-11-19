import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Admin from "./features/AdminUI/screens/Admin.screen";
import { FEATURE_WISE_ROUTES } from "./util/constants";

function App() {
  return (
    <Routes>
      <Route path="/*">
        <Route element={<Admin />} index />
        <Route path={FEATURE_WISE_ROUTES.ADMIN.LIST} element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
