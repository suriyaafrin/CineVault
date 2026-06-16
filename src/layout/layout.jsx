import React from "react";
import Navbar from "../component/navbar/navbar";

import { Outlet } from "react-router-dom";
import CineVaultFooter from "../component/footer";
import Tranding from "../component/top-Banner/tranding";

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
