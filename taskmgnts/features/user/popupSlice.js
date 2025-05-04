import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isPopupOpen: false,
  isLogout:false
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state) => {
      state.isPopupOpen = true;
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
    },
    togglePopup: (state) => {
      state.isPopupOpen = !state.isPopupOpen;
    },
    openLogout:(state)=>{
        state.isLogout=true
    },
    closeLogout:(state)=>{
        state.isLogout=false
    },
  },
});
export const {openPopup,closePopup,togglePopup,closeLogout,openLogout}=popupSlice.actions
export default popupSlice.reducer;

