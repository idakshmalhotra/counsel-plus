import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (formData) => {
  const response = await axios.post("http://localhost:3000/signin", formData);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isFetching = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer; // ✅ default export
