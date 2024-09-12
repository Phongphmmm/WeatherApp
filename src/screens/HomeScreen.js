import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import APi from "../Utils/APi";
import { registerForPushNotificationsAsync } from "../Notification/Notification";
import WeatherAnimation from "../Components/HomeScreen/WeatherAnimation";
import VideoBackground from "../Components/HomeScreen/VideoBackground";

function HomeScreen({ route }) {
  const { cityWeather } = route.params || {};
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const calculateDayTime = () => {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    return sunrise && sunset
      ? currentTime >= sunrise && currentTime < sunset
      : true;
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleWeatherData = (weatherData) => {
    const condition = weatherData?.weather[0]?.main;
    const sunriseTime = weatherData?.sys?.sunrise;
    const sunsetTime = weatherData?.sys?.sunset;
    setWeatherCondition(condition);
    setSunrise(weatherData.sys.sunrise);
    setSunset(weatherData.sys.sunset);
  };
  const isDayTime = calculateDayTime();
  return (
    <SafeAreaView style={styles.container}>
      <VideoBackground
        weatherCondition={weatherCondition}
        isDayTime={isDayTime}
      >
        <WeatherAnimation
          weatherCondition={weatherCondition}
          sunrise={sunrise}
          sunset={sunset}
        />
        <APi cityWeather={cityWeather} onWeatherData={handleWeatherData} />
      </VideoBackground>
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
});
