import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkFeedbackStatus = async () => {
  try {
    const status = await AsyncStorage.getItem("feedbackStatus");
    return status === "completed";
  } catch (error) {
    console.log("Error checking feedback status", error);
    return false;
  }
};

export const setFeedbackStatus = async () => {
  try {
    await AsyncStorage.setItem("feedbackStatus", "completed");
  } catch (error) {
    console.log("Error setting feedback status", error);
  }
};
export const clearFeedbackStatus = async () => {
  try {
    await AsyncStorage.removeItem("feedbackStatus");
    console.log("Feedback status cleared");
  } catch (error) {
    console.log("Error clearing feedback status", error);
  }
};
