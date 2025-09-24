import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { User, Camera, FileText, Info } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import Profile from "./Profile";
import CameraScreen from "./Camera";
import Posts from "./Posts";
import About from "./About";

const Tab = createBottomTabNavigator();

const categories = ["All", "Roads", "Footpaths", "Buildings", "Transport", "River/Lakes"];

const feedData = [
  { id: "1", username: "JohnDoe", profilePic: "https://randomuser.me/api/portraits/men/1.jpg", time: "2h ago", caption: "Pothole on main road spotted today.", image: "https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718", category: "Roads", status: "Pending" },
  { id: "2", username: "JaneSmith", profilePic: "https://randomuser.me/api/portraits/women/2.jpg", time: "5h ago", caption: "he streetlights on the main road have been broken for months.", image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSvrjYsqPDui7sjzwDyA9mO9z1RQC7ASLpid3e0qAm7UYd3pfTe", category: "Footpaths", status: "In Progress" },
  { id: "3", username: "Mike89", profilePic: "https://randomuser.me/api/portraits/men/3.jpg", time: "1d ago", caption: "Streetlight broke and fell on footpath.", image: "https://www.bing.com/th/id/OIP.xASAYFR9G69ZM2ufmnmakQHaFj?w=190&h=180&c=8&rs=1&qlt=70&o=7&cb=thws5&dpr=1.3&pid=3.1&rm=3", category: "Footpath", status: "Completed" },
  { id: "4", username: "SaraLee", profilePic: "https://randomuser.me/api/portraits/women/4.jpg", time: "3d ago", caption: "he streetlights on the main road have been broken for months.", image: "https://images.unsplash.com/photo-1523983301421-eda7c9f6b7df", category: "Roads", status: "Pending" },
  { id: "5", username: "TomHanks", profilePic: "https://randomuser.me/api/portraits/men/5.jpg", time: "5d ago", caption: "Streetlight broke and fell on footpath.", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", category: "Roads", status: "In Progress" },
];

const FeedItem = ({ post }: { post: typeof feedData[0] }) => (
  <View style={styles.postContainer}>
    <View style={styles.header}>
      <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
      <View>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.time}>{post.time}</Text>
      </View>
    </View>

    {/* Status Tag */}
    <View style={[
      styles.statusTag,
      post.status === "Pending" && styles.pending,
      post.status === "In Progress" && styles.inProgress,
      post.status === "Completed" && styles.completed
    ]}>
      <Text style={styles.statusText}>{post.status}</Text>
    </View>

    <Text style={styles.caption}>{post.caption}</Text>
    <Image source={{ uri: post.image }} style={styles.postImage} />
  </View>
);

const HomeContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFeed = selectedCategory === "All"
    ? feedData
    : feedData.filter(item => item.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: "#f0ffebff" }}>
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryItem, selectedCategory === cat && styles.categorySelected]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextSelected]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredFeed}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FeedItem post={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

// Custom Floating Camera Button
const CameraButton = ({ onPress }: any) => {
  return (
    <TouchableOpacity style={styles.cameraButtonContainer} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={["#8ABCAA", "#3CB371"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.cameraButton}
      >
        <Camera color="#fff" size={28} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: { height: 70, paddingBottom: 5, backgroundColor: "transparent", borderTopWidth: 0 },
        tabBarBackground: () => <LinearGradient colors={["#8ABCAA", "#BCE76D"]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={{ flex: 1 }} />,
        tabBarIcon: ({ color, size }: any) => {
          if (route.name === "Home") return <FileText color={color} size={size} />;
          if (route.name === "Profile") return <User color={color} size={size} />;
          if (route.name === "Posts") return <FileText color={color} size={size} />;
          if (route.name === "About") return <Info color={color} size={size} />;
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeContent} />
      <Tab.Screen name="Profile" component={Profile} />

      {/* Camera with custom floating button */}
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarButton: (props) => <CameraButton {...props} />,
        }}
      />

      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  categoriesContainer: { flexDirection: "row", paddingVertical: 10, paddingHorizontal: 10 },
  statusTag: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15, marginBottom: 8 },
  statusText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  pending: { backgroundColor: "#FF4D4D" },
  inProgress: { backgroundColor: "#FFA500" },
  completed: { backgroundColor: "#3CB371" },
  categoryItem: { paddingVertical: 8, paddingHorizontal: 15, backgroundColor: "#dcffbbff", borderRadius: 20, marginRight: 10 },
  categorySelected: { backgroundColor: "#3CB371" },
  categoryText: { color: "#2D5C4F", fontWeight: "600" },
  categoryTextSelected: { color: "#fff" },
  postContainer: { backgroundColor: "#dcffbbff", borderRadius: 12, padding: 15, marginVertical: 10, marginHorizontal: 10, shadowColor: "#2D5C4F", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 3, borderWidth: 1, borderColor: "#CFF6E4" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontWeight: "bold", fontSize: 16, color: "#2D5C4F" },
  time: { color: "#777", fontSize: 12 },
  caption: { fontSize: 14, marginBottom: 10, color: "#333" },
  postImage: { width: "100%", height: 200, borderRadius: 10 },
  cameraButtonContainer: { top: -30, justifyContent: "center", alignItems: "center" },
  cameraButton: { width: 70, height: 70, borderRadius: 35, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 5 },
});
