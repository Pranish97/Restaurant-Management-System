import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  userList: [],
};

export const getAllUser = createAsyncThunk("/admin/getAllUser", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/admin/user/allUsers"
  );
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "/admin/addNewUser",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/user/add",
      formData
    );
    return response.data;
  }
);

export const editUser = createAsyncThunk(
  "/admin/editUserRole",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/user/update/${id}`,
      formData
    );

    return response.data;
  }
);

export const deleteUser = createAsyncThunk("/admin/deleteUser", async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/admin/user/delete/${id}`
  );
  return response.data;
});

const userSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload.data;
      })
      .addCase(getAllUser.rejected, (state) => {
        state.isLoading = false;
        state.userList = [];
      });
  },
});

export default userSlice.reducer;
