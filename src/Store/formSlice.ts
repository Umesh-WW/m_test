// formSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface FormState {
  step: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
}

const initialState: FormState = {
  step: 0,
  data: [{}],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setData: (state, action) => {
      state.data = [ ...state.data, action.payload ];
    },
  },
});

export const { setStep, setData } = formSlice.actions;
export default formSlice.reducer;
