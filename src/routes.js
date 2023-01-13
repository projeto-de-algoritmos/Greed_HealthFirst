import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./components/Home";
import Mochila from "./components/Mochila";
import Laudos from "./components/Laudos";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Mochila />} path="/mochila" />
        <Route element={<Laudos />} path="/laudos" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
