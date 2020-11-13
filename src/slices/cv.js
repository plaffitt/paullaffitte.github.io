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

export const fetchCategories = createAsyncThunk(
  'cv/categories/fetch',
  async () => {
    return await api('categories');
  },
);

export const fetchActivities = createAsyncThunk(
  'cv/activities/fetch',
  async () => {
    return await api('activities');
  },
);

export default createSlice({
  name: 'cv',
  initialState: {},
  extraReducers: {
    [fetchProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
      console.log(action.payload)
    },
    [fetchSkills.fulfilled]: (state, action) => {
      state.skills = action.payload;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      console.log(action.payload)
    },
    [fetchActivities.fulfilled]: (state, action) => {
      state.activities = action.payload;
    },
  },
});
