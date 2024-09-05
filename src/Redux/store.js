import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./weather";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
