import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Linear from "../Components/LinearGradient";
import ReactNativeModal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import CityModal from "../Components/CityModal";

function LocationScreen() {
  const [cities, setCities] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [city, setCity] = useState("");
  const navigation = useNavigation();

  const handleAddCity = async () => {
    const weather = await fetchWeatherData(city);
    setCities((prevCities) => [...prevCities, city]);
    setIsModalVisible(false);
  };

  const handleCityPress = (city) => {
    navigation.navigate("HomeScreen", { city });
  };

  const handleAddLocation = () => {
    setIsModalVisible(true);
  };

  const fetchWeatherData = async (cityName) => {
    const WEATHER_API_KEY = "your_api_key";
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}`;

    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCityPress(item)}>
            <View style={styles.cityItem}>
              <Text style={styles.cityText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noCitiesText}>No cities added yet.</Text>
        }
      />
      <TouchableOpacity onPress={handleAddLocation} style={styles.addButton}>
        <Ionicons name="add-circle" size={75} color="#21005D" />
      </TouchableOpacity>
      <CityModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddCity={handleAddCity}
      />
    </View>
  );
}

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    marginBottom: 20,
    marginLeft: 260,
  },
  cityItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#87ceeb",
    borderRadius: 8,
  },
  cityText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  noCitiesText: {
    marginTop: 20,
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
