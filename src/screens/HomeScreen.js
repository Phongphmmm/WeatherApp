import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import LottieView from "lottie-react-native";
import Linear from "../Components/LinearGradient";
import APi from "../Utils/APi";

function HomeScreen({ route }) {
  const { cityWeather } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <Linear>
        <LottieView
          style={styles.animation}
          source={require("../../assets/Animation - 1725023188161.json")}
          autoPlay
          loop
        />
        <APi cityWeather={cityWeather} />
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
