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

  switch (weatherCondition) {
    case "Clear":
    case "Few Clouds":
    case "Scattered Clouds":
    case "Broken Clouds":
    case "Clouds":
      weatherImage = cloud;
      break;
    case "shower Rain":
    case "Rain":
      weatherImage = rain;
      break;
    case "Thunderstorm":
      weatherImage = storm;
      break;
    case "Mist":
    case "Fog":
      weatherImage = mist;
      break;
    default:
      weatherImage = cloud;
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.hour}>
          {new Date(item.dt * 1000).getHours()}:00
        </Text>
        <View style={styles.weatherContainer}>
          {weatherImage && (
            <Image source={weatherImage} style={styles.weatherImage} />
          )}
        </View>
        <Text style={styles.temp}>{tempCelsius}°C</Text>
      </View>
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
    textAlign: "center",
  },
  description: {
    color: "white",
    fontSize: 16,
  },
  hour: {
    color: "white",
    textAlign: "center",
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherImage: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 10,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
