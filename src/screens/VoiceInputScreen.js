import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { transcribeAudio } from "../Utils/GoogleSpeechAPI";
import { getCohereResponse } from "../Utils/getCohereResponse";
import { ScrollView } from "react-native-gesture-handler";

const VoiceInputScreen = () => {
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const GOOGLE_API_KEY = "AIzaSyAwjTRbnSBNoDnWXnGwEQCieuRmq8UX_Eg";
  const COHERE_API = "fkedg98Y7orioFJqv0br59PiFPcDM1FPYESIgRbL";

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access microphone was denied");
        return;
      }

      const recordingOptions = {
        android: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_PCM_16BIT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_PCM_16BIT,
          sampleRate: 16000,
          numberOfChannels: 1,
        },
        ios: {
          extension: ".wav",
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 16000,
          numberOfChannels: 1,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      };

      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      setLoading(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        const transcriptResult = await transcribeAudio(
          uri,
          `${GOOGLE_API_KEY}`
        );
        setTranscript(transcriptResult);

        const aiResponseResult = await getCohereResponse(
          transcriptResult,
          `${COHERE_API}`
        );
        setAIResponse(aiResponseResult);
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          recording ? styles.buttonStop : styles.buttonStart,
        ]}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {recording ? "Stop Recording" : "Start Recording"}
        </Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
          {transcript ? (
            <Text
              style={styles.transcriptText}
            >{`Transcription: ${transcript}`}</Text>
          ) : (
            <Text style={styles.transcriptText}>No transcription yet.</Text>
          )}
          <ScrollView>
            {aiResponse ? (
              <Text style={styles.aiResponseText}>{` ${aiResponse}`}</Text>
            ) : (
              <Text style={styles.aiResponseText}>No AI response yet.</Text>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 100,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonStart: {
    backgroundColor: "#4CAF50",
  },
  buttonStop: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  loader: {
    marginVertical: 20,
  },
  transcriptText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  aiResponseText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});

export default VoiceInputScreen;
