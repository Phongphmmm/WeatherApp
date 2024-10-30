import { FlatList, Text, StyleSheet, View } from "react-native";
import CityItem from "./CityItem";

const CityList = ({
  cities,
  onCityPress,
  onCityLongPress,
  selectedCities,
  isSelecting,
  onSelectCity,
}) => {
  const renderItem = ({ item }) => (
    <CityItem
      city={item}
      isSelected={selectedCities.includes(item.name)}
      isSelecting={isSelecting}
      onPress={() => onCityPress(item)}
      onLongPress={() => onCityLongPress(item.name)}
      onToggleSelect={() => onSelectCity(item.name)}
    />
  );

  return (
    <FlatList
      data={cities}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <Text style={styles.noCitiesText}>No cites added yet.</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noCitiesText: {
    marginTop: 50,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default CityList;
