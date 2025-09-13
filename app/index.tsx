import * as React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import bcrypt from "bcryptjs";
import { supabase } from "../libs/supabase";

export default function AuthScreen() {
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");

  // LOGIN
  const handleLogin = async () => {
    if (!phone || !password)
      return Alert.alert("Error", "Enter phone & password");

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    if (error || !user) return Alert.alert("Error", "User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return Alert.alert("Error", "Wrong password");

    Alert.alert("Success", "Logged in successfully!");
  };

  // SIGNUP FLOW
  const handleSignupStep1 = async () => {
    if (!phone) return Alert.alert("Error", "Enter phone");

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (existingUser) {
      return Alert.alert("Error", "Phone already registered. Please login.");
    }

  };

  const handleSignupStep2 = () => {
    if (otp !== "123456") return Alert.alert("Error", "Invalid OTP");
    setStep(3);
  };

  const handleSignupStep3 = async () => {
    if (!password) return Alert.alert("Error", "Enter password");

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert([
      {
        phone,
        password: hashedPassword,
      },
    ]);

    if (error) return Alert.alert("Error", error.message);

    Alert.alert("Success", "Account created! You can now login.");
    setMode("login");
    setStep(1);
    setPhone("");
    setOtp("");
    setPassword("");
  };

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
        {mode === "login" && (
          <View style={styles.card}>
            <TextInput
              mode="outlined"
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TextInput
              mode="outlined"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
              labelStyle={{ fontWeight: "bold" }}
            >
              LOGIN
            </Button>
            <Button onPress={() => setMode("signup")}>
              Don’t have an account? Sign Up
            </Button>
          </View>
        )}

        {mode === "signup" && step === 1 && (
          <View style={styles.card}>
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
              onPress={handleSignupStep1}
              style={styles.button}
            >
              SEND OTP
            </Button>
          </View>
        )}

        {mode === "signup" && step === 2 && (
          <View style={styles.card}>
            <TextInput
              mode="outlined"
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
              keyboardType="number-pad"
            />
            <Button
              mode="contained"
              onPress={handleSignupStep2}
              style={styles.button}
            >
              VERIFY OTP
            </Button>
          </View>
        )}

        {mode === "signup" && step === 3 && (
          <View style={styles.card}>
            <TextInput
              mode="outlined"
              placeholder="Create Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <Button
              mode="contained"
              onPress={handleSignupStep3}
              style={styles.button}
            >
              SIGN UP
            </Button>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
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
    color: "#333",
    marginBottom: 30,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
