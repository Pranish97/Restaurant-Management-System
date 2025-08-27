import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  transaction: null,
};

export const esewaInitiatePayment = createAsyncThunk(
  "/admin/esewaInitiatePayment",
  async ({ amount, tableId }) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/payment/initiate-payment",
      { amount, tableId }
    );
    return response.data;
  }
);

export const paymentStatus = createAsyncThunk(
  "/admin/paymentStatus",
  async ({ transaction_uuid }) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/payment/payment-status",
      { transaction_uuid }
    );
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: "adminPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default paymentSlice.reducer;
