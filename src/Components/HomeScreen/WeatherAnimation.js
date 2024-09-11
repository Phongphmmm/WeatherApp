import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function WeatherAnimation({ weatherCondition }) {
  let animationSource;

  switch (weatherCondition) {
    case "Rain":
      animationSource = require("../../../assets/Animation/rain.json");
      break;
    case "Clear":
      animationSource = require("../../../assets/Animation/sunny.json");
      break;
    case "Clouds":
      animationSource = require("../../../assets/Animation/cloudy.json");
      break;
    default:
      animationSource = require("../../../assets/Animation/cloudy.json");
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
    width: 300,
    height: 300,
  },
});

export default WeatherAnimation;
