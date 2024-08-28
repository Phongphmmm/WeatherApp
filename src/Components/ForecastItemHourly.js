import dayjs from "dayjs";
import { View, Text, StyleSheet } from "react-native";

const ForecastItemHourly = ({ item }) => {
  const tempCelsius = Math.floor(item.main.temp - 273.15);
  return (
    <View style={styles.container}>
      <Text style={styles.hour}>{new Date(item.dt * 1000).getHours()}:00</Text>
      <Text style={styles.temp}>{tempCelsius}°C</Text>
      <Text style={styles.description}>{item.weather[0].description}</Text>
    </View>
  );
};
export default ForecastItemHourly;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "columns",
  },
  date: {
    color: "white",
    fontSize: 16,
  },
  temp: {
    color: "white",
    fontSize: 30,
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
});
