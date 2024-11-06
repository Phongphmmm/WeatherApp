import { sendWeatherNotification } from "./NotificationService";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "c434d1b03112519305e8d850d4b66a07";

export async function checkWeatherCondition(city) {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}?q=${city}&appid=${API_KEY}`
    );
    const weatherData = await response.json();

    if (weatherData.weather[0].main === "Rain") {
      await sendWeatherNotification(
        `Heavy rain expected in ${city}. Stay safe!`
      );
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
