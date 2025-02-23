# 📱 Campus Marketplace App  

## 📝 Problem Statement  
On-campus students often struggle to buy and sell second-hand products like books, electronics, and accessories. Existing platforms are either unreliable or lack campus-specific filters. Our solution provides a **dedicated campus marketplace** where students can **list, buy, sell, and chat** securely.  

---

## 🚀 Solution in Brief  
This **Campus Marketplace App** is a React Native-based platform where students can:  
✅ **Login securely** with email and password  
✅ **Post ads** for items they want to sell  
✅ **Browse & search** for listed products  
✅ **Chat with sellers** in real-time  
✅ **Save favorite items** for later  
✅ **Get push notifications** for updates  

Built using **React Native (Expo)** for frontend and **Firebase (Auth, Firestore, Storage)** for backend.  

---

## 🏗️ Architecture  
The app follows a **modular structure**:  

- **Frontend:** React Native (Expo) for a cross-platform UI  
- **Backend:** Firebase Firestore for real-time database & authentication  
- **Storage:** Firebase Storage for product images  
- **Authentication:** Firebase Auth (Email & Password)  
- **Navigation:** React Navigation for screen management  
- **Chat System:** React Native Gifted Chat for real-time messaging  


📁 **Project Structure:**
📂 campusxchange
┣ 📂 assets # (Images & Icons)
┣ 📂 components
┣ 📂 app # (Contains tabs, screens, and main UI files)
┣ 📂 backend # (Contains Firebase config, auth, and database files)
┣ 📂 config
┣ 📂 constants
┣ 📜 App.js
┣ 📜 firebaseConfig.ts
┣ 📜 package.json
┣ 📜 README.md # (Documentation)

---

## 🛠 Tech Stack  
| Component        | Technology Used |
|-----------------|----------------|
| **Frontend**    | React Native (Expo) |
| **Backend**     | Firebase Firestore |
| **Authentication** | Firebase Auth |
| **Database**    | Firestore (NoSQL) |
| **Storage**     | Firebase Storage |
| **Chat System** | React Native Gifted Chat |
| **Navigation**  | React Navigation |

---

## 📥 Setup Instructions  

### 1️⃣ Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (LTS version)  
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)  
- A Firebase Account
- Firestore(https://firebase.google.com/docs/firestore)
- React Native
- Android Studio(https://developer.android.com/studio?gad_source=1&gclid=Cj0KCQiAq-u9BhCjARIsANLj-s2MMjMzkutoFvTiE1PCf-qZ6cBwRsVTM6uj1cf6roMVLNOFV-fhqYcaAnFuEALw_wcB&gclsrc=aw.ds)

