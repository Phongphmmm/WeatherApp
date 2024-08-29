import dayjs from "dayjs";
import { View, Text, StyleSheet, Image } from "react-native";

const ForecastItemDaily = ({ item }) => {
  const cloud = require("../../assets/cloud.png");
  const rain = require("../../assets/rain.png");
  const storm = require("../../assets/storm.png");
  const mist = require("../../assets/mist.png");

  const tempCelsius = Math.floor(item.main.temp - 273.15);
  const weatherCondition = item.weather[0].main;

  let weatherImage;
  if (weatherCondition === "clear sky" || "few clouds" || "scattered clouds") {
    weatherImage = cloud;
  } else if (weatherCondition === "light rain" || "rain" || "moderate rain") {
    weatherImage = rain;
  } else if (weatherCondition === "mist") {
    weatherImage = mist;
  } else if (weatherCondition === "storm") {
    weatherImage = storm;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dayjs(item.dt * 1000).format(" ddd ")}</Text>

      <View style={styles.weatherContainer}>
        {weatherImage && (
          <Image source={weatherImage} style={styles.weatherImage} />
        )}
      </View>

      <Text style={styles.description}>{item.weather[0].description}</Text>

      <Text style={styles.temp}>{tempCelsius}°C</Text>
    </View>
  );
};
export default ForecastItemDaily;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    color: "white",
    fontSize: 16,
    marginRight: 25,
  },

  temp: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 3,
    marginLeft: 12,
  },
  description: {
    color: "white",
    fontSize: 16,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  weatherImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
