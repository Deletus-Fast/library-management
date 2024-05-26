import { configureStore } from '@reduxjs/toolkit';
import adminNameReducer from './adminNameSlice';

export default configureStore({
  reducer: {
    adminName: adminNameReducer,
  },
});
