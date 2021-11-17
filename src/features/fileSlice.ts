import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filesMeta: [],
  selectedFile: '',
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addFiles: (state, action) => {
      const files = action.payload;
      files.forEach((file) => state.filesMeta.push(file));
    },
  },
});

export const { addFiles, addFilesList } = fileSlice.actions;

export default fileSlice.reducer;
