import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

import CityModal from "../Components/ManageLocation/CityModal";
import CityList from "../Components/ManageLocation/CityList";

function LocationScreen() {
  const [cities, setCities] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const navigation = useNavigation();
  const [weatherCondition, setWeatherCondition] = useState(null);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission for notifications was not granted!");
      return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (isSelecting) {
      navigation.setOptions({
        title: `Đã chọn: ${selectedCities.length}`,
        headerLeft: () => (
          <TouchableOpacity
            onPress={handleCancelSelection}
            style={{ marginLeft: 20 }}
          >
            <Ionicons name="close" size={24} color="red" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={handleSelectAll}
            style={{ marginRight: 20 }}
          >
            <Ionicons
              name={
                selectedCities.length === cities.length
                  ? "checkmark-circle"
                  : "checkmark-circle-outline"
              }
              size={24}
              color="green"
            />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        title: "Location Manage",
        headerLeft: undefined,
        headerRight: undefined,
      });
    }
  }, [isSelecting, selectedCities, cities]);

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
    console.log("City Pressed:", city);
    navigation.navigate("Home", { cityWeather: city });
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Weather in ${city.name}`,
        body: `Current temp: ${city.temp}°C with ${city.description}`,
      },
      trigger: { seconds: 1 },
    });
  };

  const handleCityLongPress = (cityName) => {
    console.log("City Long Pressed:", cityName);
    setIsSelecting(true);
    setSelectedCities((prevSelected) => {
      if (prevSelected.includes(cityName)) {
        console.log(`Deselecting city: ${cityName}`);
        return prevSelected.filter((name) => name !== cityName);
      } else {
        console.log(`Selecting city: ${cityName}`);
        return [...prevSelected, cityName];
      }
    });
  };

  const handleDeleteSelectedCities = () => {
    console.log("Deleting selected cities:", selectedCities);
    setCities((prevCities) => {
      return prevCities.filter((city) => !selectedCities.includes(city.name));
    });
    setSelectedCities([]);
    setIsSelecting(false);
  };

  const handleCancelSelection = () => {
    console.log("Cancelling selection");
    setSelectedCities([]);
    setIsSelecting(false);
  };

  const handleSelectAll = () => {
    if (selectedCities.length === cities.length) {
      console.log("Deselecting all cities");
      setSelectedCities([]);
    } else {
      console.log("Selecting all cities");
      setSelectedCities(cities.map((city) => city.name));
    }
  };

  const fetchWeatherData = async (cityName) => {
    try {
      const WEATHER_API_KEY = "c434d1b03112519305e8d850d4b66a07";
      const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;

      const response = await fetch(BASE_URL);
      const data = await response.json();

      if (response.ok) {
        console.log("Weather data fetched successfully:", data);
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
      console.error("Error when fetching weather data:", error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <View style={{ marginTop: 40 }}>
        <CityList
          cities={cities}
          onCityPress={handleCityPress}
          onCityLongPress={handleCityLongPress}
          selectedCities={selectedCities}
          isSelecting={selectedCities.length > 0}
          onSelectCity={(cityName) => {
            setSelectedCities((prev) =>
              prev.includes(cityName)
                ? prev.filter((name) => name !== cityName)
                : [...prev, cityName]
            );
            console.log("Selected Cities after toggle:", selectedCities);
          }}
        />
      </View>

      {isSelecting && selectedCities.length > 0 && (
        <TouchableOpacity
          onPress={handleDeleteSelectedCities}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.addButton}
      >
        <Ionicons name="add-circle" size={75} color="#3E2D8F" />
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
    paddingTop: 55,
  },
  deleteButton: {
    position: "absolute",
    bottom: 40,
    left: 35,
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
