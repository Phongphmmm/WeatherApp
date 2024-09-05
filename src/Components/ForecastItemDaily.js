import dayjs from "dayjs";
import { View, Text, StyleSheet, Image } from "react-native";

const ForecastItemDaily = ({ item }) => {
  const cloud = require("../../assets/cloud.png");
  const rain = require("../../assets/rain.png");
  const storm = require("../../assets/storm.png");
  const mist = require("../../assets/mist.png");

  const weatherCondition = item.weather[0].description;

  let weatherImage;
  switch (weatherCondition) {
    case "clear sky":
    case "few clouds":
    case "scattered clouds":
      weatherImage = cloud;
      break;
    case "light rain":
    case "rain":
    case "moderate rain":
      weatherImage = rain;
      break;
    case "mist":
      weatherImage = mist;
      break;
    case "storm":
      weatherImage = storm;
      break;
    default:
      weatherImage = cloud;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dayjs(item.dt * 1000).format(" dddd ")}</Text>

      <View style={styles.weatherContainer}>
        {weatherImage && (
          <Image source={weatherImage} style={styles.weatherImage} />
        )}
      </View>

      <Text style={styles.description}>{item.weather[0].description}</Text>

      <Text style={styles.temp}>{Math.floor(item.main.temp)}°C</Text>
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
    textTransform: "capitalize",
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
