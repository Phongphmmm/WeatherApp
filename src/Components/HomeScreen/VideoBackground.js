import { StyleSheet, View, Dimensions } from "react-native";
import { Video } from "expo-av";

function VideoBackground({ weatherCondition, isDayTime, children }) {
  const getVideoSource = () => {
    if (isDayTime) {
      switch (weatherCondition) {
        case "Rain":
          return require("../../../assets/Videos/rain.mp4");
        case "Clear":
          return require("../../../assets/Videos/clear_sky.mp4");
        case "Clouds":
          return require("../../../assets/Videos/cloud.mp4");
        default:
          return require("../../../assets/Videos/cloud.mp4");
      }
    } else {
      switch (weatherCondition) {
        case "Rain":
          return require("../../../assets/Videos/rain.mp4");
        case "Clear":
          return require("../../../assets/Videos/night.mp4");
        case "Clouds":
          return require("../../../assets/Videos/cloud_night.mp4");
        default:
          return require("../../../assets/Videos/cloud_night.mp4");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={getVideoSource()}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <View style={styles.overlay}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoBackground;
