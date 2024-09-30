const WIT_API_URL = "https://api.wit.ai/message?v=20240930&q=";
const WIT_ACCESS_TOKEN = "GN5MD56AFMTD3AKRJ2ONILPPDQWDVW5C";

export const fetchWitAiResponse = async (message) => {
  try {
    const response = await fetch(
      `${WIT_API_URL}&q=${encodeURIComponent(message)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${WIT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Wit.ai response:", error);
    return null;
  }
};
