
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import appReducer from "./appSlice";


const store = configureStore({
  reducer: {
    app: appReducer,
    user:userReducer
  },
  devTools: false
});

export default store;
