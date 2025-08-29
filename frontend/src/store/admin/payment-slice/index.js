import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  transactionList: [],
};

export const esewaInitiatePayment = createAsyncThunk(
  "/admin/esewaInitiatePayment",
  async ({
    amount,
    tableId,
    customerName,
    customerNumber,
    customerAddress,
  }) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/payment/initiate-payment",
      { amount, tableId, customerName, customerNumber, customerAddress }
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

export const getAllTransaction = createAsyncThunk(
  "/admin/getAllTransaction",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/payment/get"
    );
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: "adminPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionList = action.payload.data;
      })
      .addCase(getAllTransaction.rejected, (state) => {
        state.isLoading = false;
        state.transactionList = [];
      });
  },
});

export default paymentSlice.reducer;
