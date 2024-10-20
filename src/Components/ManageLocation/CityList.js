import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import CityItem from "./CityItem";
import CheckBox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

const CityList = ({
  cities,
  selectedCities,
  onCityPress,
  onCityLongPress,
  onDeleteCity,
}) => {
  const renderItem = ({ item }) => {
    const isSelected = selectedCities.includes(item.name);

    return (
      <View style={styles.cityItemContainer}>
        {selectedCities.length > 0 && (
          <CheckBox
            value={isSelected}
            onValueChange={() => onCityLongPress(item.name)}
            style={styles.checkbox}
          />
        )}

        <CityItem
          city={item}
          onPress={() => onCityPress(item)}
          onLongPress={() => onCityLongPress(item.name)}
        />
      </View>
    );
  };

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.noCitiesText}>No cities added yet.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cityItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  checkbox: {
    marginRight: 10,
  },
  cancelButton: {
    marginLeft: 10,
  },
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
