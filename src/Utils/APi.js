import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Loading from "../Components/Loading";

export default function APi() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchWeather = async () => {
    const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;
    const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${WEATHER_API_KEY}`;
    const lat = `21.028511`;
    const lng = `105.804817`;

    try {
      const response = await fetch(weatherBaseUrl);
      const data = await response.json();
      setWeatherData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {weatherData ? (
        <View>
          <Text style={styles.text}>Location: {weatherData.name}</Text>
          <Text style={styles.text}>
            Temperature: {weatherData.main.temp}°C
          </Text>
          <Text style={styles.text}>
            Weather: {weatherData.weather[0].description}
          </Text>
        </View>
      ) : (
        <Text style={styles.text}>No weather data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginVertical: 5,
  },
});
