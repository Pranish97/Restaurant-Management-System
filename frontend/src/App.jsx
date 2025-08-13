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
import PageNotFound from "./pages/not-found";
import AdminDashboard from "./pages/admin/dashboard";
import UserPage from "./pages/admin/user";
import CheckAuth from "./components/common/checkAuth";

function App() {
  const isAuthenticated = false

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user" element={<UserPage />} />
          <Route path="food" element={<AdminFoodPage />} />
          <Route path="menu" element={<AdminMenuPage />} />
          <Route path="order" element={<AdminOrderPage />} />
          <Route path="reservation" element={<AdminReservationPage />} />
          <Route path="table" element={<AdminTablePage />} />
          <Route path="staff" element={<AdminStaffPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
