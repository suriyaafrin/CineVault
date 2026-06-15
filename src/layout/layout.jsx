import React from "react";
import Navbar from "../component/navbar/navbar";

import { Outlet } from "react-router-dom";
import CineVaultFooter from "../component/footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <CineVaultFooter />
    </>
  );
}

export default Layout;
