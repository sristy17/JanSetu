import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { ArrowUp, ArrowDown } from "lucide-react-native";

const postsData = [
  {
    id: "1",
    username: "JohnDoe",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    time: "2h ago",
    phone: "+91 9876543210",
    caption: "Check out this cool phone!",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    comments: ["Nice!", "Wow!", "Where can I get this?"],
  },
  {
    id: "2",
    username: "JaneSmith",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    time: "5h ago",
    phone: "+91 9123456780",
    caption: "Loving this new gadget!",
    image: "https://images.unsplash.com/photo-1581091012184-7b02b32e0d7b",
    comments: ["Amazing!", "I want one!"],
  },
  {
    id: "3",
    username: "Mike89",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    time: "1d ago",
    phone: "+91 9988776655",
    caption: "React Native is amazing!",
    image: "https://images.unsplash.com/photo-1523475496153-3d6cc0eea28f",
    comments: ["Absolutely!", "Learning React Native too!"],
  },
];

const PostItem = ({ post }: { post: typeof postsData[0] }) => {
  const [votes, setVotes] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);

  const addComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, newComment.trim()]);
    setNewComment("");
  };

  return (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
        <View>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.time}>{post.time}</Text>
        </View>
      </View>

      {/* Phone */}
      <Text style={styles.phone}>{post.phone}</Text>

      {/* Caption */}
      <Text style={styles.caption}>{post.caption}</Text>

      {/* Post Image */}
      <Image source={{ uri: post.image }} style={styles.postImage} />

      {/* Vote & Comment */}
      <View style={styles.footer}>
        <View style={styles.voteContainer}>
          <TouchableOpacity onPress={() => setVotes(votes + 1)}>
            <ArrowUp size={24} color="green" />
          </TouchableOpacity>
          <Text style={styles.voteCount}>{votes}</Text>
          <TouchableOpacity onPress={() => setVotes(votes - 1)}>
            <ArrowDown size={24} color="red" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.comments}>💬 {comments.length} comments</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comments</Text>
            <FlatList
              data={comments}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.commentItem}>• {item}</Text>}
            />
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
              style={styles.input}
            />
            <Button title="Send" onPress={addComment} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Posts = () => {
  return (
    <FlatList
      data={postsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostItem post={item} />}
      contentContainerStyle={styles.container}
    />
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f0ffebff",
  },
  postContainer: {
    backgroundColor: "#dcffbbff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
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
  phone: { fontSize: 14, fontWeight: "600", marginBottom: 5, color: "#2D5C4F" },
  caption: { fontSize: 14, marginBottom: 10, color: "#333" },
  postImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  voteContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  voteCount: { fontSize: 16, marginHorizontal: 5, color: "#2D5C4F" },
  comments: { color: "#777", fontSize: 14 },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, color: "#2D5C4F" },
  commentItem: { fontSize: 14, marginBottom: 10, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#CFF6E4",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    color: "#2D5C4F",
  },
});
