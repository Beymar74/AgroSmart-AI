import { getDatabase, ref, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";

// 🔧 Configuración Firebase
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

//
// 🔄 RIEGO
//
export async function getIrrigationConfig() {
  const snapshot = await get(ref(db, "configuracion/riego"));
  return snapshot.val();
}

export async function triggerIrrigation(motivo: string) {
  await set(ref(db, "actuadores/riego"), 1);
}

export async function stopIrrigation() {
  await set(ref(db, "actuadores/riego"), 0);
}

//
// 🍽️ ALIMENTACIÓN
//
export async function getFeedingConfig() {
  const snapshot = await get(ref(db, "configuracion/alimentacion"));
  return snapshot.val();
}

export async function triggerFeeding(motivo: string) {
  await set(ref(db, "actuadores/alimentador"), 1);
}

export async function stopFeeding() {
  await set(ref(db, "actuadores/alimentador"), 0);
}

//
// 🌀 VENTILADOR

// Obtener configuración del ventilador
export async function getFanConfig() {
  const snapshot = await get(ref(db, "configuracion/ventilador"));
  return snapshot.val();
}

// Encender ventilador (manual)
// ✅ Encender el ventilador (0 = encendido)
export async function triggerFan() {
  await set(ref(db, "actuadores/ventilador"), 0);
}

// ✅ Apagar el ventilador (1 = apagado)
export async function stopFan() {
  await set(ref(db, "actuadores/ventilador"), 1);
}

// ✅ Modo automático (2)
export async function autoFan() {
  await set(ref(db, "actuadores/ventilador"), 2);
}



