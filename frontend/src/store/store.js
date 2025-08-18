import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminMenuSlice from "./admin/menu-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminMenu: adminMenuSlice,
  },
});

export default store;
