import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogOut } from "lucide-react-native";

import Login from "./pages/Login";
import Home from "./pages/Home";

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<"Login" | "Home" | null>(
    null
  );

  useEffect(() => {
    async function checkSession() {
      try {
        const stored = await AsyncStorage.getItem("user");
        if (stored) {
          setInitialRoute("Home");
        } else {
          setInitialRoute("Login");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setInitialRoute("Login");
      }
    }

    checkSession();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#590D22" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          options={() => ({
            headerTintColor: "#2D5C4F",
            headerStyle: { backgroundColor: "#E0F7EF" },
          })}
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Home",
            headerTintColor: "#2D5C4F",
            headerStyle: { backgroundColor: "#E0F7EF" },
            headerRight: () => (
              <Pressable
                style={{ marginRight: 15 }}
                onPress={async () => {
                  await AsyncStorage.removeItem("user");
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                }}
              >
                <LogOut color="#2D5C4F" size={28} strokeWidth={2.5} />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 45,
    width: 45,
  },
});
