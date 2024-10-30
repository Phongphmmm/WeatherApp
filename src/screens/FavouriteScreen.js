import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import FavouriteList from "../Components/FavouriteScreen/FavouriteList";

const FavouriteScreen = () => {
  const favouriteCities = useSelector((state) => state.weather.favouriteCities);
  console.log("Favourite Cities:", favouriteCities);

  return (
    <View style={styles.container}>
      {favouriteCities.length > 0 ? (
        <FavouriteList />
      ) : (
        <Text style={styles.emptyText}>No favourite cities yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 80,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});

export default FavouriteScreen;
