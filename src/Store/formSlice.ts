import { createSlice } from '@reduxjs/toolkit';

interface FormState {
  step: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fistFormData: Record<string, any>
}

const initialState: FormState = {
  step: 0,
  data: [],
fistFormData:{}
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setFormData: (state, action) => {
      if(action.payload.page == 1){
        state.fistFormData =  action.payload.data ; 
        state.step = 2                                        
      }else if(action.payload.page == 2){
        state.data[state.data.length] = { ...state.fistFormData ,...action.payload.data }
        state.fistFormData = {}
        state.step = 0         
      }
    },
  },
});

export const { setStep, setFormData } = formSlice.actions;
export default formSlice.reducer;
