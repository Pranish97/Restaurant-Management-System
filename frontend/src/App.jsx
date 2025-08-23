import { Route, Routes } from "react-router";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminMenuPage from "./pages/admin/menu";
import AdminTablePage from "./pages/admin/table";
import AdminStaffPage from "./pages/admin/staff";
import PageNotFound from "./pages/not-found";
import AdminDashboard from "./pages/admin/dashboard";
import UserPage from "./pages/admin/user";
import CheckAuth from "./components/common/checkAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import ResetPassword from "./pages/auth/reset-password";
import AdminTableDetails from "./pages/admin/tableDetails";

function App() {
  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user" element={<UserPage />} />
          <Route path="menu/all" element={<AdminMenuPage />} />
          <Route path="table" element={<AdminTablePage />} />
          <Route path="table/:id" element={<AdminTableDetails />} />
          <Route path="staff" element={<AdminStaffPage />} />
        </Route>
        <Route path="reset-password/:id" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
