import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'

export const fetchProfile = createAsyncThunk(
  'cv/profile/fetch',
  async () => {
    return await api('profile');
  },
);

export const fetchSkills = createAsyncThunk(
  'cv/skills/fetch',
  async () => {
    return await api('skills');
  },
);

export default createSlice({
  name: 'cv',
  initialState: {},
  extraReducers: {
    [fetchProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
    [fetchSkills.fulfilled]: (state, action) => {
      state.skills = action.payload;
    },
  },
});
