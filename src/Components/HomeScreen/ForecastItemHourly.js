import { View, Text, StyleSheet, Image } from "react-native";

const ForecastItemHourly = ({ item }) => {
  const cloud = require("../../../assets/Image/cloud.png");
  const rain = require("../../../assets/Image/rain.png");
  const storm = require("../../../assets/Image/storm.png");
  const mist = require("../../../assets/Image/mist.png");

  const tempCelsius = Math.floor(item.main.temp);
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
    case "Heavy Intensity Rain":
    case "very heavy rain":
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
