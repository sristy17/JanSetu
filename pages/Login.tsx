import { supabase } from "../utils/supabase/config";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
 
  async function handleLogin() {
    /*
    if (!phone || !password) {
      return Alert.alert("Error", "Enter phone & password");
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();
    


    if (error || !user) {
      return Alert.alert("Error", "Invalid username or password");
    }

    if (user.password !== password) {
      return Alert.alert("Error", "Wrong password");
    }
    
    await AsyncStorage.setItem("user", JSON.stringify(user));
    */
    navigation.navigate("Home" as never);
  }

  async function handleSignupStep1() {
    if (phone.length < 10) {
      return Alert.alert("Invalid Phone", "Please enter a valid phone number.");
    }

    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (existing) {
      return Alert.alert("Error", "Phone already registered. Please login.");
    }

    setStep(2);
  }

  function handleSignupStep2() {
    if (otp !== "1234") {
      return Alert.alert("Invalid OTP", "Please try again.");
    }
    setStep(3);
  }

  async function handleSignupStep3() {
    if (password.length < 6) {
      return Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters."
      );
    }

    const { error } = await supabase
      .from("users")
      .insert([{ phone, password }]);

    if (error) {
      return Alert.alert("Error", error.message);
    }

    Alert.alert("Signup Successful", "You can now log in!");
    setMode("login");
    setStep(1);
    setPassword("");
  }

  function handleBack() {
    if (step === 1) {
      setMode("login");
    } else {
      setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev));
    }
  }

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.welcome}>Welcome to JanSetu!</Text>
      <Text style={styles.subtitle}>Let&apos;s get started</Text>

      {/* Auth Card */}
      <LinearGradient colors={["#8ABCAA", "#BCE76D"]} style={styles.card}>
        {mode === "login" && (
          <View>
            <TextInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
            <Pressable onPress={() => setMode("signup")}>
              <Text style={styles.linkText}>
                Don’t have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        )}

        {mode === "signup" && step === 1 && (
          <View>
            <TextInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <Pressable style={styles.button} onPress={handleSignupStep1}>
              <Text style={styles.buttonText}>SEND OTP</Text>
            </Pressable>
            <Pressable onPress={() => setMode("login")}>
              <Text style={styles.linkText}>
                Already have an account? Login
              </Text>
            </Pressable>
          </View>
        )}

        {mode === "signup" && step === 2 && (
          <View>
            <TextInput
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
              keyboardType="number-pad"
            />
            <Pressable style={styles.button} onPress={handleSignupStep2}>
              <Text style={styles.buttonText}>VERIFY OTP</Text>
            </Pressable>
            <Pressable onPress={handleBack}>
              <Text style={styles.linkText}>Back</Text>
            </Pressable>
          </View>
        )}

        {mode === "signup" && step === 3 && (
          <View>
            <TextInput
              placeholder="Create Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleSignupStep3}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </Pressable>
            <Pressable onPress={handleBack}>
              <Text style={styles.linkText}>Back</Text>
            </Pressable>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#E0F7EF",
  },
  welcome: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "700",
    color: "#1E3A34",
  },
  subtitle: {
    fontSize: 16,
    color: "#2D5C4F",
    marginBottom: 30,
  },
  card: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#F0FFF5", // soft green input
    borderWidth: 1,
    borderColor: "#A7D7C5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1E3A34",
  },
  button: {
    backgroundColor: "#3CB371", // vibrant green
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#3CB371",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16,
  },
  linkText: { 
    textAlign: "center", 
    color: "#2D5C4F", 
    marginTop: 12, 
    fontWeight: "500",
  },
});


export default Login;
