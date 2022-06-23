// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-AV_AZpQoHg0Efic5lzhYKNFP1kXI5dU",
  authDomain: "vehicle-project-f04c9.firebaseapp.com",
  projectId: "vehicle-project-f04c9",
  storageBucket: "vehicle-project-f04c9.appspot.com",
  messagingSenderId: "465107674337",
  appId: "1:465107674337:web:3203fc6ed53ba330e743a0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
