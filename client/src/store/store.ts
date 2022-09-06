import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { projectSlice } from './projectSlice';

export const store = configureStore({
  reducer: {
    project: projectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
