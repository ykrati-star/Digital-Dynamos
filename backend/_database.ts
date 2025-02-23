// database.ts
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    updateDoc,
    where
} from 'firebase/firestore';
import { auth,db } from './_firebaseConfig';
import { uploadImage } from './_storage';
  
  interface Item {
    title: string;
    price: number;
    category: string;
    description: string;
    condition: string;
    location: string;
    images: string[];
    sellerId: string;
    status: 'active' | 'sold';
    createdAt: Date;
  }
  
  interface Chat {
    itemId: string;
    participants: string[];
    lastMessage: string | null;
    lastMessageTime: Date | null;
    createdAt: Date;
  }
  
  interface Message {
    content: string;
    senderId: string;
    createdAt: Date;
  }
  
  export const itemsService = {
    async createItem(itemData: Omit<Item, 'sellerId' | 'status' | 'createdAt'>, images: File[]): Promise<string> {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');
  
        const imageUrls = await Promise.all(
          images.map(async (image) => {
            const imageUrl = await uploadImage(image, `items/${user.uid}`);
            return imageUrl;
          })
        );
  
        const itemRef = await addDoc(collection(db, 'items'), {
          ...itemData,
          images: imageUrls,
          sellerId: user.uid,
          createdAt: new Date(),
          status: 'active'
        });
  
        return itemRef.id;
      } catch (error) {
        throw error;
      }
    },
  
    async getItemsByCategory(category: string): Promise<(Item & { id: string })[]> {
      try {
        const q = query(
          collection(db, 'items'),
          where('category', '==', category),
          where('status', '==', 'active'),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as (Item & { id: string })[];
      } catch (error) {
        throw error;
      }
    },
  
    async searchItems(searchQuery: string): Promise<(Item & { id: string })[]> {
      try {
        const q = query(
          collection(db, 'items'),
          where('status', '==', 'active'),
          orderBy('title'),
          where('title', '>=', searchQuery),
          where('title', '<=', searchQuery + '\uf8ff')
        );
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as (Item & { id: string })[];
      } catch (error) {
        throw error;
      }
    }
  };
  
  export const chatService = {
    async createChat(itemId: string, sellerId: string): Promise<string> {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');
  
        const q = query(
          collection(db, 'chats'),
          where('itemId', '==', itemId),
          where('participants', 'array-contains', user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0].id;
        }
  
        const chatRef = await addDoc(collection(db, 'chats'), {
          itemId,
          participants: [user.uid, sellerId],
          createdAt: new Date(),
          lastMessage: null,
          lastMessageTime: null
        });
  
        return chatRef.id;
      } catch (error) {
        throw error;
      }
    },
  
    async sendMessage(chatId: string, content: string): Promise<string> {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');
  
        const messageRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
          content,
          senderId: user.uid,
          createdAt: new Date()
        });
  
        await updateDoc(doc(db, 'chats', chatId), {
          lastMessage: content,
          lastMessageTime: new Date()
        });
  
        return messageRef.id;
      } catch (error) {
        throw error;
      }
    },
  
    subscribeToChats(callback: (chats: Chat[]) => void): () => void {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
  
      const q = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', user.uid),
        orderBy('lastMessageTime', 'desc')
      );
  
      return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        const chats: Chat[] = snapshot.docs.map((doc: DocumentData) => ({
            id: doc.id,
            ...(doc.data() as Chat),
          }));
        callback(chats);
      });
    },
  
    subscribeToMessages(chatId: string, callback: (messages: Message[]) => void): () => void {
      const q = query(
        collection(db, `chats/${chatId}/messages`),
        orderBy('createdAt', 'asc')
      );
  
      return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        console.log("Snapshot size:", snapshot.size);
        snapshot.docs.forEach(doc => console.log("Doc Data:", doc.data()));
      
        const messages = snapshot.docs.map((doc: DocumentData) => ({
          id: doc.id,
          ...(doc.data() as Message),
        }));
        callback(messages);
      });
      
    }
  };