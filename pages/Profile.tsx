import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

const Profile = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [address, setAddress] = useState("123 Main Street");
  const [locality, setLocality] = useState("Downtown");

  const handleUpdate = () => {
    // For now, just show an alert
    Alert.alert("Profile Updated", `Username: ${username}\nAddress: ${address}\nLocality: ${locality}`);
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
        style={styles.profilePic}
      />

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />

      {/* Address */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
      />

      {/* Locality */}
      <Text style={styles.label}>Locality</Text>
      <TextInput
        style={styles.input}
        value={locality}
        onChangeText={setLocality}
        placeholder="Enter locality"
      />

      {/* Update Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0ffeb",
    alignItems: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "600",
    color: "#2D5C4F",
    marginTop: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CFF6E4",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3CB371",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
