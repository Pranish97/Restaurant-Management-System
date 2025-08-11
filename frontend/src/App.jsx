import { Route, Routes } from "react-router";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminFoodPage from "./pages/admin/food";
import AdminMenuPage from "./pages/admin/menu";
import AdminOrderPage from "./pages/admin/Order";
import AdminReservationPage from "./pages/admin/reservation";
import AdminTablePage from "./pages/admin/table";
import AdminStaffPage from "./pages/admin/staff";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">

      <h1>Header Component</h1>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="food" element={<AdminFoodPage />} />
          <Route path="menu" element={<AdminMenuPage />} />
          <Route path="order" element={<AdminOrderPage />} />
          <Route path="reservation" element={<AdminReservationPage />} />
          <Route path="table" element={<AdminTablePage />} />
          <Route path="staff" element={<AdminStaffPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
