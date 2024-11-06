import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export async function requestNotificationPermission() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    return finalStatus === "granted";
  }
  return false;
}

export async function sendWeatherNotification(message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Weather Alert!",
      body: message,
      sound: true,
    },
    trigger: null,
  });
}
