import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audioPlayList: ['src/assets/audio/guitar-sample-1.wav'],
  isPlaying: false,
  curAudioIndex: 0,
  curSongName: 'guitar-sample-1',
};

export const playlistSlice = createSlice({
  name: 'playlist',
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
    setCurIndex: (state, action) => {
      state.curAudioIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPlayList, removeFromPlayList, setPlayState, setCurIndex } =
  playlistSlice.actions;

export default playlistSlice.reducer;
