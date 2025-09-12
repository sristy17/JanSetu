import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function Index() {
  const [phone, setPhone] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.langSelector}>
        <MaterialIcons name="language" size={20} color="#000" />
        <Text style={styles.langText}>English</Text>
      </View>

      <Text style={styles.welcome}>Welcome to CitiConnect!</Text>
      <Text style={styles.subtitle}>Let's get started</Text>

      <LinearGradient
        colors={["#8ABCAA", "#BCE76D"]}
        style={styles.card}
      >
        <Text style={styles.cardTitle}>
          Enter your phone number to continue
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <Button
          mode="contained"
          onPress={() => console.log("Send OTP to:", phone)}
          style={styles.button}
          labelStyle={{ fontWeight: "bold" }}
        >
          SEND OTP
        </Button>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  langSelector: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langText: {
    marginLeft: 6,
    fontWeight: "600",
  },
  welcome: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
  },
  card: {
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#6AAB95",
  },
});
