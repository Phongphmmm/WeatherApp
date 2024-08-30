import { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import Loading from "../Components/Loading";
import * as Location from "expo-location";

import ForecastItemDaily from "../Components/ForecastItemDaily";
import ForecastItemHourly from "../Components/ForecastItemHourly";
import LocationDisplay from "../Components/LocationDisplay";

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
      const lat = 21.0285;
      const lng = 105.8542;
      const weatherBaseUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherBaseUrl);
      const data = await response.json();
      setWeatherData(data);
      setIsLoading(false);
    };

    const fetchDailyForecast = async () => {
      // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
      if (!location) {
        return;
      }
      const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;
      const lat = 21.0285;
      const lng = 105.8542;
      const response = await fetch(
        `${BASE_URL}forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();
      const sortedDailyForecast = data.list.sort((a, b) => a.dt - b.dt);
      setDailyForecast(sortedDailyForecast.slice(0, 7));
      setIsLoading(false);
    };

    const fetchHourlyForecast = async () => {
      if (!location) return;
      const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;
      const lat = 21.0285;
      const lng = 105.8542;
      const hourlyForecastUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(hourlyForecastUrl);
      const data = await response.json();
      setHourlyForecast(data.list);
    };

    fetchWeather();
    fetchHourlyForecast();
    fetchDailyForecast();
  }, [location]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <LocationDisplay weatherData={weatherData} />
      <FlatList
        data={hourlyForecast}
        horizontal
        style={styles.hourlyList}
        renderItem={({ item }) => <ForecastItemHourly item={item} />}
        keyExtractor={(item) => item.dt.toString()}
      />

      <FlatList
        data={dailyForecast}
        showsHorizontalScrollIndicator={true}
        style={styles.dailyList}
        renderItem={({ item }) => <ForecastItemDaily item={item} />}
        keyExtractor={(item) => item.dt.toString()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    textTransform: "capitalize",
  },
  hourlyList: {
    flex: 1,
  },
  dailyList: {
    flex: 1,
    width: "90%",
    marginLeft: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 30,
  },
});
