import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from '../features/playlistSlice';
import fileReducer from '../features/fileSlice';

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    file: fileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
