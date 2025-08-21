import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  staffList: [],
};

export const getAllStaff = createAsyncThunk("/admin/getAllUser", async () => {
  const response = await axios.get("http://localhost:5000/api/admin/staff/get");

  return response.data;
});

const staffSlice = createSlice({
  name: "adminStaff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.staffList = action.payload.data;
      })
      .addCase(getAllStaff.rejected, (state) => {
        state.isLoading = false;
        state.staffList = [];
      });
  },
});

export default staffSlice.reducer;
