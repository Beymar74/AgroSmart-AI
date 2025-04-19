"use client";

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBoy3db8ZR5zglMwm0mwt8G4-rNRbaQ6w",
  authDomain: "agrosmart-ai-9ee95.firebaseapp.com",
  databaseURL: "https://agrosmart-ai-9ee95-default-rtdb.firebaseio.com",
  projectId: "agrosmart-ai-9ee95",
  storageBucket: "agrosmart-ai-9ee95.appspot.com",
  messagingSenderId: "854583309870",
  appId: "1:854583309870:web:50d37190c1ba4355e5d1bf"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function AmbienteCard() {
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [humedad, setHumedad] = useState<number | null>(null);

  useEffect(() => {
    const tempRef = ref(db, "ambiente/temperatura");
    const humRef = ref(db, "ambiente/humedad");

    onValue(tempRef, (snapshot) => {
      setTemperatura(snapshot.val());
    });

    onValue(humRef, (snapshot) => {
      setHumedad(snapshot.val());
    });
  }, []);

  return (
    <div className="p-4 border rounded shadow bg-white text-center space-y-2">
      <h2 className="text-xl font-bold">🌤️ Datos Ambientales</h2>
      <p>🌡️ Temperatura: {temperatura ?? "--"} °C</p>
      <p>💧 Humedad: {humedad ?? "--"} %</p>
    </div>
  );
}
