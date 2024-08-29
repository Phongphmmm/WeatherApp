import dayjs from "dayjs";
import { View, Text, StyleSheet, Image } from "react-native";

const ForecastItemHourly = ({ item }) => {
  const cloud = require("../../assets/cloud.png");
  const rain = require("../../assets/rain.png");
  const storm = require("../../assets/storm.png");
  const mist = require("../../assets/mist.png");

  const tempCelsius = Math.floor(item.main.temp - 273.15);
  const weatherCondition = item.weather[0].main;

  let weatherImage;
  if (weatherCondition === "clear sky" || "few clouds" || "scattered clouds") {
    weatherImage = cloud;
  } else if (weatherCondition === "shower rain" || "rain") {
    weatherImage = rain;
  } else if (weatherCondition === "mist") {
    weatherImage = mist;
  } else if (weatherCondition === "storm") {
    weatherImage = storm;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hour}>{new Date(item.dt * 1000).getHours()}:00</Text>
      <View style={styles.weatherContainer}>
        {weatherImage && (
          <Image source={weatherImage} style={styles.weatherImage} />
        )}
      </View>
      <Text style={styles.temp}>{tempCelsius}°C</Text>
    </View>
  );
};
export default ForecastItemHourly;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "column",
  },
  date: {
    color: "white",
    fontSize: 16,
  },
  temp: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 3,
  },
  description: {
    color: "white",
    fontSize: 16,
  },
  hour: {
    color: "white",
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
