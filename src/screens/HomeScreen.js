import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

// const openWeatherApp = `c434d1b03112519305e8d850d4b66a07`;

// let url = `// https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherApp}`;

function HomeScreen() {
  return (
    <SafeAreaView style={styles.linearContainer}>
      <LinearGradient colors={["#21005D", "#6750A4"]} style={styles.linear}>
        <StatusBar barStyle="light-content" backgroundColor="#21005D" />
      </LinearGradient>
      <Text>HomeScreen</Text>
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
});
