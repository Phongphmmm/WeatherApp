import { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import Loading from "../Components/Loading";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";

import ForecastItemDaily from "../Components/HomeScreen/ForecastItemDaily";
import ForecastItemHourly from "../Components/HomeScreen/ForecastItemHourly";
import LocationDisplay from "../Components/LocationDisplay";
import { setCurrentWeather, setDaily, setHourly } from "../Redux/weather";

export default function APi({ cityWeather }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const dispatch = useDispatch();

  const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
  const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;

  const fetchWeatherData = async (
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
      }

      setIsLoading(false);
    };

    fetchData();
  }, [cityWeather, location]);

  if (isLoading) {
    return <Loading />;
  }

  const { main } = weatherData || {};
  const feelsLike = main ? main.feels_like : null;
  const humidity = main ? main.humidity : null;
  return (
    <ScrollView style={styles.container}>
      <LocationDisplay weatherData={weatherData} />
      <View style={{ flexDirection: "row" }}>
        <View style={styles.feelsLike}>
          <Text style={styles.infoText}>Feels like: {feelsLike}°C</Text>
        </View>
        <View style={styles.humidity}>
          <Text style={styles.infoText}>Humidity: {humidity}%</Text>
        </View>
      </View>
      <FlatList
        data={hourlyForecast}
        horizontal
        style={styles.hourlyList}
        renderItem={({ item }) => <ForecastItemHourly item={item} />}
        keyExtractor={(item) => item.dt.toString()}
      />
      <FlatList
        data={dailyForecast}
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
  feelsLike: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,

    alignItems: "center",
    width: "40%",
    marginHorizontal: 50,
  },
  humidity: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,

    alignItems: "center",
    width: "40%",
    marginLeft: -50,
  },
  infoText: {
    fontSize: 18,
    color: "white",
  },
  hourlyList: {
    flex: 1,
    marginLeft: 35,
  },
  dailyList: {
    flex: 1,
    width: "80%",
    marginHorizontal: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 30,
  },
});
