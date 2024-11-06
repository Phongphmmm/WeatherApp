import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";

import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import LocationScreen from "./src/screens/LocationScreen";
import VoiceInputScreen from "./src/screens/VoiceInputScreen";
import FavoriteScreen from "./src/screens/FavouriteScreen";
import FeedbacksScreen from "./src/screens/FeedbacksScreen";
import { checkFeedbackStatus } from "./src/Utils/usageStatus";
import PlaceholderScreen from "./src/Components/PlaceHolderScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [feedbackCompleted, setFeedbackCompleted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchFeedbackStatus = async () => {
      const status = await checkFeedbackStatus();
      setFeedbackCompleted(status);
    };
    fetchFeedbackStatus();
  }, []);

  const handleFeedbackCompletion = () => {
    setFeedbackCompleted(true);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="DrawerNavigator" options={{ headerShown: false }}>
            {(props) => (
              <DrawerNavigator
                {...props}
                feedbackCompleted={feedbackCompleted}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="FeedbacksScreen">
            {(props) => (
              <FeedbacksScreen
                {...props}
                onFeedbackComplete={handleFeedbackCompletion}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function DrawerNavigator({ feedbackCompleted, navigation }) {
  const handleRedirectToFeedback = () => {
    navigation.navigate("FeedbacksScreen");
  };

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
          headerTintColor: "white",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Location Manage"
        component={LocationScreen}
        options={{
          headerTintColor: "#3E2D8F",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourite"
        component={FavoriteScreen}
        options={{
          headerTintColor: "#3E2D8F",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Map"
        component={
          feedbackCompleted
            ? MapScreen
            : () => (
                <PlaceholderScreen
                  message="You need to complete feedback before accessing the Map."
                  onComplete={handleRedirectToFeedback}
                />
              )
        }
        options={{
          headerTintColor: "#3E2D8F",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Voice"
        component={
          feedbackCompleted
            ? VoiceInputScreen
            : () => (
                <PlaceholderScreen
                  message="You need to complete feedback before accessing the Voice screen."
                  onComplete={handleRedirectToFeedback}
                />
              )
        }
        options={{
          headerTintColor: "#3E2D8F",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mic-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedbacks"
        component={FeedbacksScreen}
        options={{
          headerTintColor: "#3E2D8F",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="thumbs-up-sharp" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
