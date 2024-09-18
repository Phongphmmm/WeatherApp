import { Alert } from "react-native";

const MapInfor = ({ weatherData }) => {
  if (!weatherData) return null;

  Alert.alert(
    `Weather Information`,
    `Location: ${weatherData.name}\nTemperature: ${weatherData.main.temp}°C\nDescription: ${weatherData.weather[0].description}`
  );

  return null;
};

export default MapInfor;
