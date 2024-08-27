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
  Image,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";

import Linear from "../Utils/LinearGradient";
import APi from "../Utils/APi";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.linearContainer}>
      <Linear>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/weather.png")}
          />
        </View>
        <APi />
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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
});
