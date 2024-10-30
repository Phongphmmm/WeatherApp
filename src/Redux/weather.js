import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: null,
    dailyForecast: [],
    hourlyForecast: [],
    cityWeather: [],
    favouriteCities: [],
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
    addFavouriteCity: (state, action) => {
      const cityExists = state.favouriteCities.some(
        (city) => city.name === action.payload.name
      );
      if (!cityExists) {
        state.favouriteCities.push(action.payload);
      }
    },
    removeFavouriteCity: (state, action) => {
      state.favouriteCities = state.favouriteCities.filter(
        (city) => city.name !== action.payload.name
      );
    },
  },
});

export const {
  setCurrentWeather,
  setDaily,
  setHourly,
  setCityWeather,
  addFavouriteCity,
  removeFavouriteCity,
} = weatherSlice.actions;
export default weatherSlice.reducer;
