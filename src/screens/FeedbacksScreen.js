import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from "react-native";
import { setFeedbackStatus } from "../Utils/usageStatus";

const FeedbacksScreen = ({ navigation }) => {
  const [accuracy, setAccuracy] = useState("");
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = async () => {
    if (!accuracy) {
      alert("Please select the accuracy of the weather information.");
      return;
    }
    setIsModalVisible(false);
    try {
      const response = await fetch("http://192.168.0.28:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accuracy, comment }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setAccuracy("");
        setComment("");
        await setFeedbackStatus();
        alert("Feedback submitted successfully!");
        navigation.goBack();
      } else {
        alert(data.message || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Text style={styles.title}>User Feedback</Text>

      <View style={styles.buttonGroup}>
        {["Not accurate", "Quite accurate", "Very accurate"].map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => setAccuracy(label)}
            style={[styles.button, accuracy === label && styles.selected]}
          >
            <Text>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Your comment..."
        value={comment}
        onChangeText={setComment}
        style={styles.textInput}
        multiline
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to submit your feedback?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={handleSubmit}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeedbacksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  selected: {
    backgroundColor: "#4a90e2",
    borderColor: "#4a90e2",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButtonCancel: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  modalButtonConfirm: {
    backgroundColor: "#4a90e2",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
