/*
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
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
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeStack = createStackNavigator();


// Home Screen Component
const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('CategoryItems', { category: item.name })}
    >
      <Ionicons name={item.icon} size={32} color="#007AFF" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
  const CATEGORIES = [
    { id: '1', name: 'Textbooks', icon: 'book' },
    { id: '2', name: 'Electronics', icon: 'laptop' },
    { id: '3', name: 'Services', icon: 'construct' },
    { id: '4', name: 'Furniture', icon: 'bed' },
  ];
  
  const ITEMS = [
    {
      id: '1',
      title: 'Data Structures Textbook',
      price: '₹400',
      category: 'Textbooks',
      description: 'Like new condition, 3rd edition. Perfect for CS201 course.',
      condition: 'Like New',
      location: 'North Campus Library',
      seller: {
        id: '1',
        name: 'John Doe',
        department: 'Computer Science',
        year: '3rd Year',
        rating: 4.8,
        totalSales: 12,
        avatar: 'https://via.placeholder.com/50',
      },
      images: [
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/400',
      ],
      postedDate: '2024-02-20T10:30:00Z',
      tags: ['CS201', 'Computer Science', 'Textbook'],
    },
  ];
  const renderItemCard = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate('ItemDetails', { item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />

      <Text style={styles.sectionTitle}>Recent Listings</Text>
      <FlatList
        data={ITEMS}
        renderItem={renderItemCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// Item Details Screen Component
const ItemDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleContact = () => {
    navigation.navigate('ChatDetail', { user: item.seller.name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageCarousel}>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={item.images}
            keyExtractor={(_, index) => index.toString()}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / styles.imageCarousel.width
              );
              setCurrentImageIndex(newIndex);
            }}
            renderItem={({ item: image }) => (
              <Image
                source={{ uri: image }}
                style={styles.itemDetailImage}
                resizeMode="cover"
              />
            )}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.itemDetailTitle}>{item.title}</Text>
          <Text style={styles.itemDetailPrice}>{item.price}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.actionButton, styles.messageButton]}
          onPress={handleContact}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Message Seller</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Navigation Configuration
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="MarketPlace" component={HomeScreen} />
    <HomeStack.Screen
      name="ItemDetails"
      component={ItemDetailsScreen}
      options={{ title: 'Item Details' }}
    />
  </HomeStack.Navigator>
);

const styles = StyleSheet.create({
  // ... [All styles from the original file related to Home and ItemDetails]
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    margin: 16,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 4,
  },
  imageCarousel: {
    width: '100%',
    height: 300,
  },
  itemDetailImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 16,
  },
  itemDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemDetailPrice: {
    fontSize: 20,
    color: '#007AFF',
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 16,
  },
  actionBar: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
  },
  messageButton: {
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default HomeStackScreen;
