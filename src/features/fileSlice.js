import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileList: [],
  selectedFile: '',
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addFiles: (state, action) => {
      const files = action.payload;
      console.log(files);
      //   files.forEach((file) => state.fileList.push(file));
    },
  },
});

export const { addFiles } = fileSlice.actions;

export default fileSlice.reducer;
