import { configureStore } from '@reduxjs/toolkit';
import audioReducer from '../features/audioSlice';
import fileReducer from '../features/fileSlice';

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    file: fileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
