import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CityItem = ({
  city,
  isSelected,
  isSelecting,
  onPress,
  onLongPress,
  onSelect,
}) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.cityItem}>
        {isSelecting && (
          <CheckBox
            value={isSelected}
            onValueChange={onSelect}
            style={styles.checkbox}
          />
        )}
        <View style={styles.cityInfo}>
          <Text style={styles.cityText}>{city.name}</Text>
          <Text style={styles.cityTemp}>{city.temp}°C</Text>
          <Text style={styles.description}>{city.description}</Text>
        </View>
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
    marginTop: 10,
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
