import { configureStore } from '@reduxjs/toolkit'
import cv from './slices/cv';

export default (preloadedState={}) => configureStore({
	reducer: {
		cv: cv.reducer,
	},
	preloadedState,
});
