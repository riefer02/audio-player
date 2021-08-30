import { configureStore } from '@reduxjs/toolkit';
import audioReducer from '../features/audioSlice';

export const store = configureStore({
  reducer: {
    audio: audioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
