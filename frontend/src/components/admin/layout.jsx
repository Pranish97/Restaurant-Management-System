import { Outlet } from "react-router";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AdminSideBar open={openMenu} setOpen={setOpenMenu} />

      <div className="flex flex-1 flex-col">
        <AdminHeader  setOpen={setOpenMenu}/>
        <main className="flex flex-col w-full mt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
