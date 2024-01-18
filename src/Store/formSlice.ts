import { createSlice } from '@reduxjs/toolkit';

interface FormState {
  step: number;
  data: Record<string, string>[];
   personDetailData: Record<string, string>
}

const initialState: FormState = {
  step: 0,
  data: [],
  personDetailData:{}
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
        state.personDetailData =  action.payload.data ; 
        state.step = 2                                        
      }else if(action.payload.page == 2){
        state.data[state.data.length] = { ...state.personDetailData ,...action.payload.data }
        state.personDetailData = {}
        state.step = 0         
      }
    },
  },
});

export const { setStep, setFormData } = formSlice.actions;
export default formSlice.reducer;
