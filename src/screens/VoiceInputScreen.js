import { useState } from "react";
import { View, Button, Text } from "react-native";
import {
  startVoiceRecognition,
  stopVoiceRecognition,
} from "../Utils/voiceUtils";

const VoiceInputScreen = () => {
  const [voiceText, setVoiceText] = useState("");
  const [witResponse, setWitResponse] = useState(null);

  const handleStartRecognition = async () => {
    const result = await startVoiceRecognition();
    if (result) {
      setVoiceText(result.text);
      setWitResponse(result.entities);
    }
  };

  const handleStopRecognition = () => {
    stopVoiceRecognition();
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Start Voice" onPress={handleStartRecognition} />
      <Button title="Stop Voice" onPress={handleStopRecognition} />

      <Text style={{ marginTop: 20, fontSize: 18 }}>
        Recognized Text: {voiceText}
      </Text>

      {witResponse && (
        <View>
          <Text style={{ marginTop: 10, fontSize: 18 }}>Wit.ai Response:</Text>
          <Text>{JSON.stringify(witResponse, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

export default VoiceInputScreen;
