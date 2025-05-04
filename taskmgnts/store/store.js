import { configureStore } from '@reduxjs/toolkit'
 import userReducer from '../features/user/userSlice'
 import popupReducer from '../features/user/popupSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    popup:popupReducer,
  },
})
