// src/firebase/config.ts

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBBoy3db8ZR5zglMwm0mwt8G4-rNRbaQ6w",
  authDomain: "agrosmart-ai-9ee95.firebaseapp.com",
  databaseURL: "https://agrosmart-ai-9ee95-default-rtdb.firebaseio.com",
  projectId: "agrosmart-ai-9ee95",
  storageBucket: "agrosmart-ai-9ee95.appspot.com",
  messagingSenderId: "854583309870",
  appId: "1:854583309870:web:50d37190c1ba4355e5d1bf"
};

export const app = initializeApp(firebaseConfig);
