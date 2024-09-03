import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";

import LottieView from "lottie-react-native";
import Linear from "../Components/LinearGradient";
import APi from "../Utils/APi";

function HomeScreen({ route }) {
  const { cityWeather } = route.params || {};
  return (
    <SafeAreaView style={styles.linearContainer}>
      <Linear>
        <View style={styles.animationContainer}>
          <LottieView
            style={styles.animation}
            source={require("../../assets/Animation - 1725023188161.json")}
            autoPlay
            loop
          />
        </View>
        <APi cityWeather={cityWeather} />
      </Linear>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  linearContainer: {
    flex: 1,
  },
  linear: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 500,
    height: 250,
  },
  image: {
    width: 300,
    height: 300,
  },
});
