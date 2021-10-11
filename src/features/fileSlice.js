import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filesMeta: [],
  selectedFile: '',
  //   files: [],
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addFiles: (state, action) => {
      const files = action.payload;
      files.forEach((file) => state.filesMeta.push(file));
    },
    // addFilesList: (state, action) => {
    //   state.files = action.payload;
    // },
  },
});

export const { addFiles, addFilesList } = fileSlice.actions;

export default fileSlice.reducer;
