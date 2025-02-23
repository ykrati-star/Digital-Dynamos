import admin from 'firebase-admin';
import * as serviceAccount from './firebaseAdminKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "iit-mandi-campus-marketplace.firebaseapp.com", // Replace with your actual Firestore URL
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { auth, db };


