import { FlatList, Text, StyleSheet, View } from "react-native";
import CityItem from "./CityItem";
import { LinearGradient } from "expo-linear-gradient";

const CityList = ({ cities, onCityPress, onCityLongPress }) => {
  return (
    <View style={styles.flatListContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  noCitiesText: {
    marginTop: 50,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  flatListContainer: {
    maxHeight: 650,
    flexGrow: 0,
  },
});

export default CityList;
