import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PlaceholderScreen = ({ message, onComplete }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="alert-circle-outline"
        size={80}
        color="#6E53BE"
        style={styles.icon}
      />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onComplete}>
        <Text style={styles.buttonText}>Complete Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  icon: {
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#6E53BE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlaceholderScreen;
