import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: null,
    dailyForecast: [],
    hourlyForecast: [],
    cityWeather: [],
  },
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setDaily: (state, action) => {
      state.dailyForecast = action.payload;
    },
    setHourly: (state, action) => {
      state.hourlyForecast = action.payload;
    },
    setCityWeather: (state, action) => {
      state.cityWeather = action.payload;
    },
  },
});

export const { setCurrentWeather, setDaily, setHourly, setCityWeather } =
  weatherSlice.actions;
export default weatherSlice.reducer;
