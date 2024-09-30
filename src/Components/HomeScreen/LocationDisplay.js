import { View, Text, StyleSheet } from "react-native";

export default function LocationDisplay({ weatherData }) {
  if (!weatherData) {
    return <Text style={styles.text}>No weather data available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}> {weatherData.name}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.temp}>{Math.floor(weatherData.main.temp)}°</Text>
        <Text style={styles.description}>
          {weatherData.weather[0].description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  location: {
    fontSize: 30,
    color: "white",
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
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
});
