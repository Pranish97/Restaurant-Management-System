import { Fragment } from "react";
import logoImg from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router";
import {
  ClipboardPenLine,
  GalleryHorizontal,
  LayoutDashboard,
  UserCog,
  UserRound,
} from "lucide-react";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "../ui/sheet"

const adminSideBarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "menu",
    label: "Menu",
    path: "/admin/menu",
    icon: <ClipboardPenLine />,
  },
  {
    id: "table",
    label: "Table",
    path: "/admin/table",
    icon: <GalleryHorizontal />,
  },
  {
    id: "staff",
    label: "Staff",
    path: "/admin/staff",
    icon: <UserCog />,
  },
  {
    id: "user",
    label: "User",
    path: "/admin/user",
    icon: <UserRound />,
  },
];

function MenuItems({setOpen}) {

    console.log(setOpen ,'setopen')
  return (
    <nav className="mt-8 flex-col flex gap-4 cursor-pointer">
      {adminSideBarMenu.map((menuItem) => (
        <NavLink
          key={menuItem.id}
          to={menuItem.path}
          onClick={ () => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-lg hover:bg-amber-700 hover:text-white ${
              isActive ? "bg-amber-700 text-white" : ""
            }`
          }
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function AdminSideBar({open, setOpen}) {
  const navigate = useNavigate();
  return (
    <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-64 px-5 ">
                <div className="flex flex-col h-full">
                    <SheetHeader className="border-b">
                        <SheetTitle onClick={() => navigate("/admin/dashboard")}>
                            <img src={logoImg} className="h-[75px]" />
                        </SheetTitle>
                    </SheetHeader>
                    <MenuItems/>
                </div>
            </SheetContent>
        </Sheet>
      <aside className="hidden w-64 flex-col border-r  border-gray-300 bg-background p-6 lg:flex ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <img src={logoImg} className="h-[75px]" />
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
