import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import status from "../../constants/requestStatus";
import { generateProductByIdObj, getStatus } from "../../utils/common";

const initialState = {
  requestStatus: status.idle,
  loading: false,
  orderData: {},
  originalProductDataById: {},
  error: "",
};


export const fetchOrder = createAsyncThunk("orders/fetchOrder", async () => {
  try {
    const response = await fetch("/order.json");
    const result = await response.json();

    return result;
  } catch (err) {
    return err;
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      const { productId, total, price, quantity } = action.payload;
      // Updating product price
      const productToUpdateInd = state.orderData.products.findIndex(
        (item) => item.id === productId
      );

      const updatedProduct = {
        ...state.orderData.products[productToUpdateInd],
        total,
        price,
        quantity,
      }
      
      const status = getStatus(updatedProduct, state.originalProductDataById);
      
      state.orderData.products[productToUpdateInd] = {...updatedProduct, status};
      
      // Updating Order price
      const orderPrice = state.orderData.products.reduce(
        (accumulator, product) => accumulator + (+product.total),
        0
      );
      state.orderData.total = orderPrice;
    },
    updateStatus: (state, action) => {
      const { productId, status } = action.payload;
      const ind = state.orderData.products.findIndex(
        (product) => product.id === productId
      );
      state.orderData.products[ind].status = status;
    },
    approveOrder: (state) => {
      state.orderData.approved = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state, action) => {
      state.loading = true;
      state.requestStatus = status.pending;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.loading = false;
      state.requestStatus = status.error;
      state.error = action.payload;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.requestStatus = status.fulfilled;
      state.orderData = action.payload;
      const productsById = generateProductByIdObj(action.payload.products);
      state.originalProductDataById = productsById;
    });
  },
});

export const { updateProduct, updateStatus, approveOrder } = orderSlice.actions;

export default orderSlice.reducer;
