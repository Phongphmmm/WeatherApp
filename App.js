import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import MapScreen from "./src/screens/MapScreen";
import Loading from "./src/Components/Loading";
import LocationScreen from "./src/screens/LocationScreen";
import VoiceInputScreen from "./src/screens/VoiceInputScreen";
import FavoriteScreen from "./src/screens/FavouriteScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#6E53BE",
          width: 250,
        },
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "white",
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
        },
        headerTransparent: true,
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerShown: true,
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
          drawerLabel: "Location Manage",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
          headerTintColor: "#392C60",
        }}
      />
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
          headerTintColor: "#392C60",
        }}
      />
      <Drawer.Screen
        name="Voice"
        component={VoiceInputScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mic-outline" color={color} size={size} />
          ),
          headerTintColor: "#392C60",
        }}
      />
      <Drawer.Screen
        name="Favourite Locations"
        component={FavoriteScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
          headerTintColor: "#392C60",
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
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
