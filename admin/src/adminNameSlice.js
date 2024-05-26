// src/store/adminNameSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminName: '',
};

export const adminNameSlice = createSlice({
  name: 'adminName',
  initialState,
  reducers: {
    setAdminName: (state, action) => {
      state.adminName = action.payload;
    },
  },
});

export const { setAdminName } = adminNameSlice.actions;

export const selectAdminName = (state) => state.adminName.adminName;

export default adminNameSlice.reducer;
