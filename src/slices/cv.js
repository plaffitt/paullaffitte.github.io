import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'

export const fetchProfile = createAsyncThunk(
  'cv/profile/fetch',
  async () => {
    return await api('profile');
  },
);

export default createSlice({
  name: 'cv',
  initialState: {},
  extraReducers: {
    [fetchProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
  },
});
