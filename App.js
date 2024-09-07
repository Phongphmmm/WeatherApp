import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import Loading from "./src/Components/Loading";
import LocationScreen from "./src/screens/LocationScreen";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import { registerForPushNotificationsAsync } from "./src/Notification/Notification";
import { scheduleDailyWeatherNotification } from "./src/Notification/scheduleWeatherNotification.js";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#6E53BE",
        },
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Location Manage"
        component={LocationScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

useEffect(() => {
  (async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (status === "granted") {
      console.log("Notification permissions granted.");
    }
  })();
}, []);

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    scheduleDailyWeatherNotification();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#21005D" />
        <Stack.Navigator>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
