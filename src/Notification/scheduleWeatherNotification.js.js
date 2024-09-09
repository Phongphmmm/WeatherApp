import * as Notifications from "expo-notifications";
import fetchWeatherData from "../Utils/APi";

export const scheduleDailyWeatherNotification = async () => {
  const weatherData = await fetchWeatherData();
  const title = "Weather Forecast";
  const body = `Weather today: ${weatherData.main.temp}°C with ${weatherData.weather[0].description}.`;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      hour: 8,
      minute: 0,
      repeats: true,
    },
  });
};
