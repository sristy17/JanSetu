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

import Profile from "./Profile";
import CameraScreen from "./Camera";
import Posts from "./Posts";
import About from "./About";

const Tab = createBottomTabNavigator();

// Updated categories
const categories = [
  "All",
  "Roads",
  "Footpaths",
  "Buildings",
  "Transport",
  "River/Lakes",
];

// Feed posts with updated categories
const feedData = [
  {
    id: "1",
    username: "JohnDoe",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    time: "2h ago",
    caption: "The main road looks congested today.",
    image: "https://images.unsplash.com/photo-1505842465776-3e45e7a35d1c",
    category: "Roads",
  },
  {
    id: "2",
    username: "JaneSmith",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    time: "5h ago",
    caption: "Newly paved footpaths in the park.",
    image: "https://images.unsplash.com/photo-1606788075761-43c83ff82a05",
    category: "Footpaths",
  },
  {
    id: "3",
    username: "Mike89",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    time: "1d ago",
    caption: "Skyscrapers dominate the skyline.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    category: "Buildings",
  },
  {
    id: "4",
    username: "SaraLee",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    time: "3d ago",
    caption: "Busy city transport hub today.",
    image: "https://images.unsplash.com/photo-1523983301421-eda7c9f6b7df",
    category: "Transport",
  },
  {
    id: "5",
    username: "TomHanks",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    time: "5d ago",
    caption: "The river looks clean after recent rains.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "River/Lakes",
  },
];

// Single feed post component
const FeedItem = ({ post }: { post: (typeof feedData)[0] }) => (
  <View style={styles.postContainer}>
    <View style={styles.header}>
      <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
      <View>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.time}>{post.time}</Text>
      </View>
    </View>
    <Text style={styles.caption}>{post.caption}</Text>
    <Image source={{ uri: post.image }} style={styles.postImage} />
  </View>
);

const HomeContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter feed based on selected category
  const filteredFeed =
    selectedCategory === "All"
      ? feedData
      : feedData.filter((item) => item.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: "#f0ffebff" }}>
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryItem,
                selectedCategory === cat && styles.categorySelected,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Feed */}
      <FlatList
        data={filteredFeed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedItem post={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarActiveTintColor: "#3CB371",
        tabBarInactiveTintColor: "#A7D7C5",
        tabBarStyle: {
          backgroundColor: "#E0F7EF",
          height: 70,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }: any) => {
          if (route.name === "Home")
            return <FileText color={color} size={size} />;
          if (route.name === "Profile")
            return <User color={color} size={size} />;
          if (route.name === "Camera")
            return <Camera color={color} size={size} />;
          if (route.name === "Posts")
            return <FileText color={color} size={size} />;
          if (route.name === "About") return <Info color={color} size={size} />;
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeContent} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#dcffbbff",
    borderRadius: 20,
    marginRight: 10,
  },
  categorySelected: {
    backgroundColor: "#3CB371",
  },
  categoryText: {
    color: "#2D5C4F",
    fontWeight: "600",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  postContainer: {
    backgroundColor: "#dcffbbff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#2D5C4F",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#CFF6E4",
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontWeight: "bold", fontSize: 16, color: "#2D5C4F" },
  time: { color: "#777", fontSize: 12 },
  caption: { fontSize: 14, marginBottom: 10, color: "#333" },
  postImage: { width: "100%", height: 200, borderRadius: 10 },
});
