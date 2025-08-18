import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  menuList: [],
};

export const addNewMenu = createAsyncThunk(
  "/admin/addNewMenu",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/menu/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const fetchMenuByCategory = createAsyncThunk(
  "/admin/fetchMenuByCategory",
  async (category) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/menu/getByCategory?category=${category}`
    );
    return response.data;
  }
);

export const editMenu = createAsyncThunk(
  "/admin/editMenu",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/menu/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const deleteMenu = createAsyncThunk("/admin/deleteMenu", async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/admin/menu/delete/${id}`
  );
  return response.data;
});

const menuSlice = createSlice({
  name: "adminMenu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMenuByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuList = action.payload.data;
      })
      .addCase(fetchMenuByCategory.rejected, (state) => {
        state.isLoading = false;
        state.menuList = [];
      });
  },
});

export default menuSlice.reducer;
