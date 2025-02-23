
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './_firebaseConfig';
  
  interface UserProfile {
    uid: string;
    name: string;
    department: string;
    year: number;
    rating: number;
    totalSales: number;
    createdAt: Date;
  }
  
  export const authService = {
    async register(email: string, password: string, name: string, department: string, year: number): Promise<any> {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        await addDoc(collection(db, 'users'), {
          uid: userCredential.user.uid,
          name,
          department,
          year,
          rating: 0,
          totalSales: 0,
          createdAt: new Date(),
        } as UserProfile);
        
        return userCredential.user;
      } catch (error) {
        throw error;
      }
    },
  
    async login(email: string, password: string): Promise<any> {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw error;
      }
    },
  
    async getCurrentUserProfile(): Promise<UserProfile | null> {
      const user = auth.currentUser;
      if (!user) return null;
  
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data() as UserProfile;
    }
  };

