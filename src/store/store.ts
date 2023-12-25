import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

// Types for RootState and AppDispatch to be used throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
