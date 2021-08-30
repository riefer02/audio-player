import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audioPlayList: [new Audio('src/assets/audio/guitar-sample-1.wav')],
};

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addToPlayList: (state, action) => {
      const files = action.payload;
      for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        // file = new Audio(file);
        // console.log(file.name);
        console.log(file);
        state.audioPlayList.push(file);
      }
    },
    removeFromPlayList: (state, action) => {
      state.audioPlayList.filter((audio) => audio.name !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPlayList, removeFromPlayList } = audioSlice.actions;

export default audioSlice.reducer;
