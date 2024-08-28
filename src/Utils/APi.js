import { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Loading from "../Components/Loading";
import * as Location from "expo-location";

import ForecastItemDaily from "../Components/ForecastItemDaily";
import ForecastItemHourly from "../Components/ForecastItemHourly";

export default function APi() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [dailyForecast, setDailyForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);

  const BASE_URL = `https://api.openweathermap.org/data/2.5/`;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (!location) {
      return;
    }
    const fetchWeather = async () => {
      const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      const weatherBaseUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`;

      try {
        const response = await fetch(weatherBaseUrl);
        const data = await response.json();
        setWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    const fetchDailyForecast = async () => {
      // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
      if (!location) {
        return;
      }
      const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      const response = await fetch(
        `${BASE_URL}forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();
      setDailyForecast(data.list);
    };

    const fetchHourlyForecast = async () => {
      if (!location) return;
      const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      const hourlyForecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(hourlyForecastUrl);
      const data = await response.json();
      console.log("Hourly Forecast data:", JSON.stringify(data.list, null, 2));
      setHourlyForecast(data.list);
    };

    fetchHourlyForecast;
    fetchDailyForecast();
    fetchWeather();
  }, [location]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {weatherData ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.location}> {weatherData.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.temp}>
              {Math.floor(weatherData.main.temp - 273.15)}°C
            </Text>
            <Text style={styles.description}>
              {weatherData.weather[0].description}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.text}>No weather data available</Text>
      )}

      <FlatList
        data={dailyForecast}
        horizontal
        contentContainerStyle={{
          gap: 10,
          backgroundColor: "#blue",
          height: 150,
        }}
        renderItem={({ item }) => <ForecastItemDaily item={item} />}
        keyExtractor={(item) => item.dt.toString()}
      />

      <FlatList
        data={hourlyForecast}
        contentContainerStyle={{
          gap: 10,
          backgroundColor: "#blue",
          height: 150,
        }}
        renderItem={({ item }) => <ForecastItemHourly item={item} />}
        keyExtractor={(item) => item.dt.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    fontSize: 30,
    color: "white",
  },
  temp: {
    fontSize: 70,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 18,
    marginTop: 50,
  },
});
