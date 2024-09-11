import { View, Text, StyleSheet } from "react-native";

const WeatherInfo = ({ feelsLike, humidity }) => (
  <View style={{ flexDirection: "row", marginRight: 50 }}>
    <View style={styles.feelsLike}>
      <Text style={styles.infoText}>Feels like: {feelsLike}°</Text>
    </View>
    <View style={styles.humidity}>
      <Text style={styles.infoText}>Humidity: {humidity}%</Text>
    </View>
  </View>
);

export default WeatherInfo;

const styles = StyleSheet.create({
  feelsLike: {
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    alignItems: "center",
    width: "45%",
    marginLeft: 40,
  },
  humidity: {
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    alignItems: "center",
    width: "45%",
    marginLeft: 10,
  },
  infoText: {
    fontSize: 18,
    color: "white",
  },
});
