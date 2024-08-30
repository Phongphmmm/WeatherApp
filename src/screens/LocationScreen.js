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
  const navigation = useNavigation();

  const handleAddCity = async (cityName) => {
    const weather = await fetchWeatherData(cityName.trim());
    if (weather) {
      const cityData = {
        name: cityName,
        temp: Math.round(weather.temp),
        description: weather.weather[0].description,
      };
      setCities((prevCities) => [...prevCities, cityData]);
    }
    setIsModalVisible(false);
  };

  const handleCityPress = (city) => {
    navigation.navigate("Home", { city });
  };

  const fetchWeatherData = async (cityName) => {
    try {
      const WEATHER_API_KEY = "c434d1b03112519305e8d850d4b66a07";
      const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;

      const response = await fetch(BASE_URL);
      const data = await response.json();

      if (response.ok) {
        return {
          name: data.name,
          temp: data.main.temp,
          weather: data.weather[0].description,
        };
      } else {
        console.error("City not found:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCityPress(item)}>
            <View style={styles.cityItem}>
              <Text style={styles.cityText}>{item.name}</Text>
              <Text style={styles.cityTemp}>{item.temp}°C</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noCitiesText}>No cities added yet.</Text>
        }
      />
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.addButton}
      >
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
    backgroundColor: "#21005D",
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
  cityTemp: {
    fontSize: 16,
    color: "#fff",
  },
  description: {
    color: "white",
  },
});
