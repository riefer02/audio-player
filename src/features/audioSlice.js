import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audioPlayList: [new Audio('src/assets/audio/guitar-sample-1.wav')],
  isPlaying: false,
};

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addToPlayList: (state, action) => {
      const files = action.payload;
      files.forEach((file) => state.audioPlayList.push(file));
    },
    removeFromPlayList: (state, action) => {
      state.audioPlayList.filter((audio) => audio.name !== action.payload);
    },
    setPlayState: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPlayList, removeFromPlayList, setPlayState } =
  audioSlice.actions;

export default audioSlice.reducer;
