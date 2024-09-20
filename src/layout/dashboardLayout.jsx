/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Sidebar2 from "../components/sidebar2";
import { useState } from "react";

function Layout() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  return (
    <div className="relative min-h-screen md:flex z-10 bg-white">
      {/* Sidebar */}
      <Sidebar2 setExpand={setSideMenuIsExpand} />

      {/* Page content */}
      <div
        className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
          sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
        }`}
      >
        <div className=" mx-10 border h-full p-10 my-10 -z-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
