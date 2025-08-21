import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTable = createAsyncThunk(
  "/admin/addTable",
  async (formData) => {
    const response = await axios.post();
  }
);
