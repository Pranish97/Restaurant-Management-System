import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminMenuSlice from "./admin/menu-slice";
import adminUserSlce from "./admin/user-slice";
import adminStaffSlice from "./admin/staff-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminMenu: adminMenuSlice,
    adminUser: adminUserSlce,
    adminStaff: adminStaffSlice,
  },
});

export default store;
