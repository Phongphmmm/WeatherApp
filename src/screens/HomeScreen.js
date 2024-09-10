import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import LottieView from "lottie-react-native";
import Linear from "../Components/LinearGradient";
import APi from "../Utils/APi";
import { registerForPushNotificationsAsync } from "../Notification/Notification";
import WeatherAnimation from "../Components/HomeScreen/WeatherAnimation";

function HomeScreen({ route }) {
  const { cityWeather } = route.params || {};
  const [weatherCondition, setWeatherCondition] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleWeatherData = (weatherData) => {
    const condition = weatherData?.weather[0]?.main;
    setWeatherCondition(condition);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Linear>
        <WeatherAnimation weatherCondition={weatherCondition} />
        <APi cityWeather={cityWeather} onWeatherData={handleWeatherData} />
      </Linear>
    </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 500,
    height: 250,
  },
});
