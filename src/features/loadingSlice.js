import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
