import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CityItem = ({ city, onPress, onLongPress }) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.cityItem}>
        <Text style={styles.cityText}>{city.name}</Text>
        <Text style={styles.cityTemp}>{city.temp}°C</Text>
        <Text style={styles.description}>{city.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CityItem;
const styles = StyleSheet.create({
  cityItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor: "#3E2D8F",
    marginTop: 15,
  },
  cityText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cityTemp: {
    fontSize: 16,
    color: "#fff",
  },
  description: {
    color: "white",
    textTransform: "capitalize",
  },
});
