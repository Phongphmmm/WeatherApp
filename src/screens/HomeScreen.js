import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, StatusBar } from "react-native";

import APi from "../Utils/APi";
import WeatherAnimation from "../Components/HomeScreen/WeatherAnimation";
import VideoBackground from "../Components/HomeScreen/VideoBackground";

function HomeScreen({ route }) {
  const { cityWeather } = route.params || {};
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    if (sunrise && sunset) {
      const currentTime = Math.floor(new Date().getTime() / 1000);
      setIsDayTime(currentTime >= sunrise && currentTime < sunset);
    }
  }, [sunrise, sunset]);

  const handleWeatherData = (weatherData) => {
    const condition = weatherData?.weather[0]?.main;
    setWeatherCondition(condition);
    setSunrise(weatherData.sys.sunrise);
    setSunset(weatherData.sys.sunset);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <VideoBackground
        weatherCondition={weatherCondition}
        isDayTime={isDayTime}
      >
        <APi cityWeather={cityWeather} onWeatherData={handleWeatherData} />
      </VideoBackground>
    </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 42,
  },
});
