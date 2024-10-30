import { useEffect, useState } from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import MapViewComponent from "../Components/Map/MapViewComponent";
import MapInfor from "../Components/Map/MapInfo";
import Loading from "../Components/Loading";

export default function MapScreen({ route }) {
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const { cityWeather } = route.params || {};

  const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
  const WEATHER_API_KEY = `c434d1b03112519305e8d850d4b66a07`;

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    if (!cityWeather) {
      getLocation();
    }
  }, [cityWeather]);

  const fetchWeatherData = async (lat, lon) => {
    const weatherUrl = `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  const handleMarkerPress = async (coordinate) => {
    const weatherData = await fetchWeatherData(
      coordinate.latitude,
      coordinate.longitude
    );
    if (weatherData) {
      setSelectedWeather(weatherData);
      setModalVisible(true);
    }
  };

  const region = {
    latitude: cityWeather
      ? cityWeather.coord.lat
      : location?.coords.latitude || 0,
    longitude: cityWeather
      ? cityWeather.coord.lon
      : location?.coords.longitude || 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (!location && !cityWeather) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapViewComponent region={region} handleMarkerPress={handleMarkerPress} />
      <MapInfor
        weatherData={selectedWeather}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
