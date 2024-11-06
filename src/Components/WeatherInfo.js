import { View, Text, StyleSheet } from "react-native";

const WeatherInfo = ({ feelsLike, humidity }) => (
  <View style={styles.container}>
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
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 5,
  },
  feelsLike: {
    flex: 1,
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    alignItems: "center",
    marginRight: 10,
  },
  humidity: {
    flex: 1,
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 10,
  },
  infoText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
