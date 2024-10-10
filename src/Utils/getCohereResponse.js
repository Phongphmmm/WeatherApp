import axios from "axios";

export const getCohereResponse = async (text) => {
  const apiKey = "fkedg98Y7orioFJqv0br59PiFPcDM1FPYESIgRbL";
  try {
    const response = await axios.post(
      "https://api.cohere.ai/generate",
      {
        prompt: text,
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Cohere-Version": "2022-12-06",
        },
      }
    );
    console.log("Cohere Response Data:", response.data);

    if (response.data.generations && response.data.generations.length > 0) {
      return response.data.generations[0].text.trim();
    } else {
      throw new Error("No response from Cohere.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching Cohere response:", error.response.data);
      throw new Error(
        `Cohere API Error: ${error.response.status} - ${
          error.response.data.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      console.error("Error fetching Cohere response: No response from server");
      throw new Error("No response from Cohere. Please try again later.");
    } else {
      console.error("Error fetching Cohere response:", error.message);
      throw new Error(
        "Unexpected error occurred while fetching Cohere response."
      );
    }
  }
};
