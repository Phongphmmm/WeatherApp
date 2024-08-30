import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddLocation() {
  const [cityName, setCityName] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { setCities } = route.params;

  const handleAddCity = () => {
    if (cityName.trim()) {
      setCities((prevCities) => [...prevCities, cityName]);
      navigation.goBack();
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={cityName}
          onChangeText={setCityName}
        />
        <Button title="Add City" onPress={handleAddCity} />
      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});
