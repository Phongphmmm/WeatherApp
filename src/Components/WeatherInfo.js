import { View, Text, StyleSheet } from "react-native";

const WeatherInfo = ({ feelsLike, humidity }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={styles.feelsLike}>
      <Text style={styles.infoText}>Feels like: {feelsLike}°C</Text>
    </View>
    <View style={styles.humidity}>
      <Text style={styles.infoText}>Humidity: {humidity}%</Text>
    </View>
  </View>
);

export default WeatherInfo;

const styles = StyleSheet.create({
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
});
