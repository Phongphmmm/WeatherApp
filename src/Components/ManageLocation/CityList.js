import { FlatList, Text, StyleSheet } from "react-native";
import CityItem from "./CityItem";

const CityList = ({ cities, onCityPress, onCityLongPress }) => {
  return (
    <FlatList
      data={cities}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <CityItem
          city={item}
          onPress={() => onCityPress(item)}
          onLongPress={() => onCityLongPress(item.name)}
        />
      )}
      ListEmptyComponent={
        <Text style={styles.noCitiesText}>No cities added yet.</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  noCitiesText: {
    marginTop: 20,
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default CityList;
