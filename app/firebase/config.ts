import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAI80cuweAOCMCdSaDvvqD6jSn46wXqbAg",
  authDomain: "summarist-clone-286be.firebaseapp.com",
  projectId: "summarist-clone-286be",
  storageBucket: "summarist-clone-286be.firebasestorage.app",
  messagingSenderId: "1041619670338",
  appId: "1:1041619670338:web:b6f46012ee422ed379e4db",
  measurementId: "G-QCFS3T0TWD"
};

export const app = initializeApp(firebaseConfig)