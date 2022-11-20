import { Route, Routes } from "react-router-dom";

import Admin from "@features/Dashboard/screens/Dashboard.screen";

function App() {
  return (
    <Routes>
      <Route path="/*">
        <Route element={<Admin  />} index />
      </Route>
    </Routes>
  );
}

export default App;
