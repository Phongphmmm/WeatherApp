import { SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Linear = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#21005D", "#6750A4"]} style={styles.gradient}>
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});

export default Linear;
