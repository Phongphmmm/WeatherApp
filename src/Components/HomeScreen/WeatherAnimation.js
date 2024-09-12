import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function WeatherAnimation({ weatherCondition, sunrise, sunset }) {
  let animationSource;
  const currentTime = Math.floor(new Date().getTime() / 1000);

  const isDayTime = currentTime >= sunrise && currentTime < sunset;

  switch (weatherCondition) {
    case "Rain":
      animationSource = isDayTime
        ? require("../../../assets/Animation/rain.json")
        : require("../../../assets/Animation/rain_night.json");
      break;
    case "Clear":
      animationSource = isDayTime
        ? require("../../../assets/Animation/sunny.json")
        : require("../../../assets/Animation/clear_night.json");
      break;
    case "Clouds":
      animationSource = isDayTime
        ? require("../../../assets/Animation/cloudy.json")
        : require("../../../assets/Animation/clouds_night.json");
      break;
    default:
      animationSource = isDayTime
        ? require("../../../assets/Animation/cloudy.json")
        : require("../../../assets/Animation/clouds_night.json");
      break;
  }

  return (
    <View style={styles.animationContainer}>
      <LottieView
        source={animationSource}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 250,
    height: 250,
  },
});

export default WeatherAnimation;
