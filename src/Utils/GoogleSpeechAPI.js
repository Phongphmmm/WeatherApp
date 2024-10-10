import axios from "axios";
import { Buffer } from "buffer";
export const transcribeAudio = async (audioUri) => {
  const apiKey = "AIzaSyAwjTRbnSBNoDnWXnGwEQCieuRmq8UX_Eg";
  try {
    const audioBuffer = await fetch(audioUri).then((res) => res.arrayBuffer());
    const audioBase64 = Buffer.from(audioBuffer).toString("base64");

    const config = {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 16000,
      languageCode: "en-US",
    };

    const requestData = {
      audio: {
        content: audioBase64,
      },
      config: config,
    };

    const response = await axios.post(
      `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
      requestData
    );
    console.log("Response Data:", JSON.stringify(response.data, null, 2));
    if (response.data.results && response.data.results.length > 0) {
      const transcription = response.data.results
        .map((result) => result.alternatives[0].transcript)
        .join(" ");
      return transcription;
    } else {
      throw new Error("No transcriptions found in the response.");
    }
  } catch (error) {
    console.error("Error with Google Cloud Speech-to-Text:", error);
    throw error;
  }
};
