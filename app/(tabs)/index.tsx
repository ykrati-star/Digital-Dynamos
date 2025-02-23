/*
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, Platform, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image 
          source={{ uri: "https://via.placeholder.com/150" }}  
          style={styles.reactLogo} 
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
*/

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const ChatStack = createStackNavigator();

// Mock Data
const CHATS = [
  {
    id: '1',
    user: 'Jane Smith',
    lastMessage: 'Is the textbook still available?',
    timestamp: '10:30 AM',
    unread: 2,
    avatar: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    user: 'Mike Johnson',
    lastMessage: 'Can you hold it until tomorrow?',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'https://via.placeholder.com/50',
  },
];

const MESSAGES = [
  {
    id: '1',
    sender: 'Jane Smith',
    content: 'Is the textbook still available?',
    timestamp: '10:30 AM',
    isSender: false,
  },
  {
    id: '2',
    sender: 'You',
    content: 'Yes, it is! Are you interested?',
    timestamp: '10:32 AM',
    isSender: true,
  },
];

// ✅ Added Chat List Screen Component
const ChatListScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatDetail', { user: item.user })}
          >
            <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatUser}>{item.user}</Text>
                <Text style={styles.chatTimestamp}>{item.timestamp}</Text>
              </View>
              <View style={styles.chatFooter}>
                <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

// ✅ Fixed Chat Detail Screen Component
const ChatDetailScreen = ({ route }) => {
  const [message, setMessage] = useState('');
  const user = route?.params?.user || 'Unknown'; // ✅ Fallback for safety

  const sendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.isSender ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                !item.isSender && styles.receivedMessageText,
              ]}
            >
              {item.content}
            </Text>
            <Text
              style={[
                styles.messageTimestamp,
                !item.isSender && styles.receivedMessageTimestamp,
              ]}
            >
              {item.timestamp}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ✅ Fixed Navigation Configuration
const ChatStackScreen = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen name="Messages" component={ChatListScreen} />
    <ChatStack.Screen 
      name="ChatDetail" 
      component={ChatDetailScreen} 
      options={({ route }) => ({
        title: route?.params?.user || 'Unknown', // ✅ Safe fallback
      })}
    />
  </ChatStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatUser: {
    fontSize: 16,
    fontWeight: '500',
  },
  chatTimestamp: {
    fontSize: 14,
    color: '#666',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  messageList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  receivedMessageText: {
    color: '#000',
  },
  messageTimestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  receivedMessageTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
});

export default ChatStackScreen;


