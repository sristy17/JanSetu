import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Camera = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Camera Screen</Text>
  </View>
);

export default Camera;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
