import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ReactNativeModal from "react-native-modal";

const CityModal = ({ isVisible, onClose, onAddCity }) => {
  const [cityName, setCityName] = useState("");
  const handleAddCity = () => {
    if (cityName.trim()) {
      onAddCity(cityName);
      setCityName("");
    }
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={cityName}
          onChangeText={setCityName}
        />
        <TouchableOpacity onPress={handleAddCity} style={styles.addButton}>
          <Text style={styles.buttonText}>Add City</Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
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
  addButton: {
    backgroundColor: "#21005D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default CityModal;
