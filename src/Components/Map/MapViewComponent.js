import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapViewComponent = ({ region, handleMarkerPress }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={(e) => handleMarkerPress(e.nativeEvent.coordinate)} // Khi nhấn vào bản đồ
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Selected Location"
          onPress={() => handleMarkerPress(region)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapViewComponent;
