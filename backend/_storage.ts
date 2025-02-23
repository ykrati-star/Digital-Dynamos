import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes
} from 'firebase/storage';
import { storage } from './_firebaseConfig';
  
  export const uploadImage = async (file: File, path: string): Promise<string> => {
    try {
      const imageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
      await uploadBytes(imageRef, file);
      return getDownloadURL(imageRef);
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteImage = async (url: string): Promise<void> => {
    try {
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);
    } catch (error) {
      throw error;
    }
  };
  