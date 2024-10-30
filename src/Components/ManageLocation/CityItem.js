import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFavouriteCity, removeFavouriteCity } from "../../Redux/weather";

const CityItem = ({
  city,
  isSelected,
  isSelecting,
  onPress,
  onLongPress,
  onToggleSelect,
}) => {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state) =>
    state.weather.favouriteCities.some((favCity) => favCity.name === city.name)
  );

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavouriteCity(city));
    } else {
      dispatch(addFavouriteCity(city));
    }
  };

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.cityItem}>
        {isSelecting && (
          <TouchableOpacity onPress={onToggleSelect} style={styles.checkbox}>
            <Ionicons
              name={isSelected ? "checkbox" : "square-outline"}
              size={24}
              color={isSelected ? "#4CAF50" : "#ddd"}
            />
          </TouchableOpacity>
        )}

        <View style={styles.cityInfo}>
          <Text style={styles.cityText}>{city.name}</Text>
          <Text style={styles.cityTemp}>{city.temp}°C</Text>
          <Text style={styles.description}>{city.description}</Text>
        </View>

        <TouchableOpacity onPress={handleFavoriteToggle}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cityItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor: "#3E2D8F",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  cityInfo: {
    flex: 1,
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

export default CityItem;
