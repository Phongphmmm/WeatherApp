import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

const CityModal = ({ isVisible, onClose, onAddCity }) => {
  const [cityName, setCityName] = useState("");

  const handleAddCity = () => {
    if (cityName.trim()) {
      onAddCity(cityName);
      setCityName("");
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={cityName}
            onChangeText={setCityName}
          />
          <Button title="Add City" onPress={handleAddCity} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    width: "100%",
  },
});

export default CityModal;
