import * as Speech from "expo-speech";

export const startVoiceRecognition = async () => {
  try {
    const result = await Speech.speak("Start speaking");
    return result;
  } catch (error) {
    console.error("Voice recognition error:", error);
    return null;
  }
};

export const stopVoiceRecognition = () => {
  try {
    Speech.stop();
    console.log("Voice recognition stopped.");
  } catch (error) {
    console.error("Error stopping voice recognition:", error);
  }
};
