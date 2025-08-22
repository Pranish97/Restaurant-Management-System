import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  tableList: [],
};

export const addTable = createAsyncThunk(
  "/admin/addTable",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/table/add",
      formData
    );

    return response.data;
  }
);

export const updateTable = createAsyncThunk(
  "/admin/updateTable",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/table/update/${id}`,
      formData
    );

    return response.data;
  }
);

export const getTableList = createAsyncThunk(
  "/admin/getTableList",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/table/get"
    );

    return response.data;
  }
);

export const deleteTable = createAsyncThunk(
  "/admin/deleteTable",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/table/delete/${id}`
    );
    return response.data;
  }
);

const tableSlice = createSlice({
  name: "adminTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTableList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTableList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tableList = action.payload.data;
      })
      .addCase(getTableList.rejected, (state) => {
        state.isLoading = false;
        state.tableList = [];
      });
  },
});

export default tableSlice.reducer;
