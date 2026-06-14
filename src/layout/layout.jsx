import React from "react";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
