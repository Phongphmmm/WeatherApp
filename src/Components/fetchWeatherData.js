export const fetchWeatherData = async (
  cityWeather,
  location,
  BASE_URL,
  WEATHER_API_KEY
) => {
  let weatherBaseUrl, forecastUrl;

  if (cityWeather) {
    weatherBaseUrl = `${BASE_URL}weather?q=${cityWeather.name}&appid=${WEATHER_API_KEY}&units=metric`;
    forecastUrl = `${BASE_URL}forecast?q=${cityWeather.name}&appid=${WEATHER_API_KEY}&units=metric`;
  } else if (location) {
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    weatherBaseUrl = `${BASE_URL}weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`;
    forecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`;
  }

  if (!weatherBaseUrl || !forecastUrl) return null;

  try {
    const weatherResponse = await fetch(weatherBaseUrl);
    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    const sortedDailyForecast = forecastData.list.sort((a, b) => a.dt - b.dt);

    return {
      weatherData,
      dailyForecast: sortedDailyForecast.slice(0, 7),
      hourlyForecast: forecastData.list,
    };
  } catch (error) {
    console.error("Error when fetching weather data: ", error);
    return null;
  }
};
