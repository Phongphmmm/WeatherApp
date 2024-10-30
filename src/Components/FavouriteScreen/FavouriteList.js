import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CityItem from "../ManageLocation/CityItem";

const FavouriteList = () => {
  const favouriteCities = useSelector((state) => state.weather.favouriteCities);

  const renderCityItem = ({ item }) => <CityItem city={item} />;
  const keyExtractor = (item) => (item.name ? item.name.toString() : item.name);

  return (
    <View style={styles.container}>
      {favouriteCities.length > 0 ? (
        <FlatList
          data={favouriteCities}
          renderItem={renderCityItem}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorite cities yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noFavorites: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default FavouriteList;
