import * as Notifications from "expo-notifications";

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  const projectId = "14d163a9-0335-4bec-b519-b203ba484034";
  const token = await Notifications.getExpoPushTokenAsync({ projectId });
  console.log("Push token:", token);
  return token;
};
