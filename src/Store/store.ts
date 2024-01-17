// store.ts
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice'; // Create this slice

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
