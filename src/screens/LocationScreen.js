import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import CityModal from "../Components/ManageLocation/CityModal";
import CityList from "../Components/ManageLocation/CityList";

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
        description: weather.weather,
      };
      setCities((prevCities) => [...prevCities, cityData]);
    }
    setIsModalVisible(false);
  };

  const handleCityPress = (city) => {
    navigation.navigate("Home", { cityWeather: city });
  };

  const handleCityLongPress = (cityName) => {
    Alert.alert("Delete city ?", `Are you sure you want to delete this city?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setCities((prevCities) =>
            prevCities.filter((city) => city.name !== cityName)
          );
        },
      },
    ]);
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
      <CityList
        cities={cities}
        onCityPress={handleCityPress}
        onCityLongPress={handleCityLongPress}
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
    marginLeft: 280,
  },
});
