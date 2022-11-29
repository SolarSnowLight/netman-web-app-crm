import React, {FC} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainRoutes from "../constants/routes/main.routes";

import AuthPage from "../containers/AuthPage";
import HomePage from "../containers/HomePage";
import IModules from "../models/users/IModules";

import WithToastify from "src/hoc-helpers/WithToastify";

const useRoutes = (isAuthenticated: boolean = false, modules: IModules | null = null) => {
  if (isAuthenticated && modules) {
    return (
      <Routes>
        {/* Маршрутизация для создателя */}

        <Route path={MainRoutes.MAIN} element={<HomePage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={MainRoutes.LOGIN} element={<AuthPage />} />
      <Route
        path="*"
        element={<Navigate to={MainRoutes.LOGIN} />} />
    </Routes>
  );
};

export default WithToastify(useRoutes);