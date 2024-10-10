import { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import Loading from "../Components/Loading";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";

import ForecastItemDaily from "../Components/HomeScreen/ForecastItemDaily";
import ForecastItemHourly from "../Components/HomeScreen/ForecastItemHourly";
import LocationDisplay from "../Components/HomeScreen/LocationDisplay";
import { setCurrentWeather, setDaily, setHourly } from "../Redux/weather";
import WeatherInfo from "../Components/WeatherInfo";
import { fetchWeatherData } from "./fetchWeatherData"; // Import hàm fetchWeatherData

export default function APi({ cityWeather, onWeatherData }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const dispatch = useDispatch();

  const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
  const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (weatherData && onWeatherData) {
      onWeatherData(weatherData);
    }
  }, [weatherData, onWeatherData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchWeatherData(
        cityWeather,
        location,
        BASE_URL,
        WEATHER_API_KEY
      );

      if (data) {
        setWeatherData(data.weatherData);
        setDailyForecast(data.dailyForecast);
        setHourlyForecast(data.hourlyForecast);

        dispatch(setCurrentWeather(data.weatherData));
        dispatch(setDaily(data.dailyForecast));
        dispatch(setHourly(data.hourlyForecast));
      } else {
        setWeatherData(null);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [cityWeather, location]);

  if (isLoading) {
    return <Loading />;
  }
  const feelsLike = weatherData ? weatherData.main.feels_like : "N/A";
  const humidity = weatherData ? weatherData.main.humidity : "N/A";

  return (
    <ScrollView style={styles.container}>
      <LocationDisplay weatherData={weatherData} />
      <WeatherInfo feelsLike={feelsLike} humidity={humidity} />
      <FlatList
        data={hourlyForecast}
        horizontal
        style={styles.hourlyList}
        renderItem={({ item }) => <ForecastItemHourly item={item} />}
        keyExtractor={(item) => item.dt.toString()}
        scrollEnabled={true}
      />

      <FlatList
        data={dailyForecast}
        style={styles.dailyList}
        renderItem={({ item }) => <ForecastItemDaily item={item} />}
        keyExtractor={(item) => item.dt.toString()}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 7,
  },
  dailyList: {
    flex: 1,
    width: "90%",
    marginHorizontal: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 30,
  },
});
