"use client";

import { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import TarjetaComida from "@/components/organismos/TarjetaComida";
import TarjetaTanque from "@/components/organismos/TarjetaTanque";
import GraficoTemperatura from "@/components/organismos/GraficoTemperatura";
import GraficoLuz from "@/components/organismos/GraficoLuz";
import TarjetaPresion from "@/components/organismos/TarjetaPresion";
import GraficoHumedadSuelo from "@/components/organismos/GraficoHumedadSuelo";
import GraficoCircular from "@/components/organismos/GraficoCircular";
import GraficoHistorialAlertas from "@/components/organismos/GraficoHistorialAlertas";
import GraficoPresion from "@/components/organismos/GraficoPresion";

const firebaseConfig = {
  apiKey: "AIzaSyBBoy3db8ZR5zglMwm0mwt8G4-rNRbaQ6w",
  authDomain: "agrosmart-ai-9ee95.firebaseapp.com",
  databaseURL: "https://agrosmart-ai-9ee95-default-rtdb.firebaseio.com",
  projectId: "agrosmart-ai-9ee95",
  storageBucket: "agrosmart-ai-9ee95.appspot.com",
  messagingSenderId: "854583309870",
  appId: "1:85456308706:web:50d37190c1ba4355e5d1bf"
};

// Solo inicializamos si no existe ninguna app en Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

const convertirADistanciaPorcentaje = (cm: number): number => {
  const maxDist = 30;
  const minDist = 5;
  const nivel = ((maxDist - cm) / (maxDist - minDist)) * 100;
  return Math.max(0, Math.min(100, Math.round(nivel)));
};

export default function Dashboard() {
  const [firebaseLuz, setFirebaseLuz] = useState<number | null>(null);
  const [firebaseHumedadSuelo, setFirebaseHumedadSuelo] = useState<number | null>(null);
  const [luzData, setLuzData] = useState<any[]>([]);
  const [firebaseTemp, setFirebaseTemp] = useState<number | null>(null);
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [soilMoistureData, setSoilMoistureData] = useState<any[]>([]);
  const [firebaseDistancia, setFirebaseDistancia] = useState<number | null>(null);
  const [firebaseTempAnimal, setFirebaseTempAnimal] = useState<number | null>(null);
  const [tempAnimalData, setTempAnimalData] = useState<any[]>([]);
  const [firebasePresion, setFirebasePresion] = useState<number | null>(null);
  const [firebaseNivelComida, setFirebaseNivelComida] = useState<number | null>(null);

  const alertHistoryData = [
    { type: "Fiebre", count: Math.floor(Math.random() * 5) },
    { type: "Bajo Nivel de Agua", count: Math.floor(Math.random() * 10) },
    { type: "Falta de Alimentación", count: Math.floor(Math.random() * 3) }
  ];

  const animalCircularData = tempAnimalData.map(d => ({ hour: d.hour, value: d.temperatura }));

  useEffect(() => {
    onValue(ref(db, "ambiente/temperatura"), snap => setFirebaseTemp(snap.val()));
    onValue(ref(db, "ambiente/luz"), snap => setFirebaseLuz(snap.val()));
    onValue(ref(db, "ambiente/humedad_suelo"), snap => setFirebaseHumedadSuelo(snap.val()));
    onValue(ref(db, "ambiente/distancia"), snap => setFirebaseDistancia(snap.val()));
    onValue(ref(db, "ambiente/temperatura_animal"), snap => setFirebaseTempAnimal(snap.val()));
    onValue(ref(db, "ambiente/presion"), snap => setFirebasePresion(snap.val()));
    onValue(ref(db, "ambiente/nivel_comida"), snap => setFirebaseNivelComida(snap.val()));

    onValue(ref(db, "historico/temperatura"), snap => {
      const data = snap.val() || {};
      setTemperatureData(
        Object.entries(data).map(([k, v]) => ({
          hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: v
        }))
      );
    });

    onValue(ref(db, "historico/humedad_suelo"), snap => {
      const data = snap.val() || {};
      setSoilMoistureData(
        Object.entries(data).map(([k, v]) => ({
          hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          moisture: v
        }))
      );
    });

    onValue(ref(db, "historico/temperatura_animal"), snap => {
      const data = snap.val() || {};
      setTempAnimalData(
        Object.entries(data).map(([k, v]) => ({
          hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperatura: v
        }))
      );
    });

    onValue(ref(db, "historico/luz"), snap => {
      const data = snap.val();
      if (data) {
        const parsed = Object.entries(data).map(([k, v]) => ({
          hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: Math.min(100, Math.round((Number(v) / 4095) * 100))
        }));
        setLuzData(parsed);
      }
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Sección 1: Condiciones ambientales */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <GraficoTemperatura data={temperatureData} />
        <GraficoLuz data={luzData} />
      </section>

      {/* Sección 2: Estado de recursos */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <TarjetaComida
          nivelPorcentaje={
            firebaseNivelComida !== null
              ? convertirADistanciaPorcentaje(firebaseNivelComida)
              : null
          }
        />
        <TarjetaTanque
          nivelPorcentaje={
            firebaseDistancia !== null
              ? convertirADistanciaPorcentaje(firebaseDistancia)
              : null
          }
        />
        <TarjetaPresion presion={firebasePresion} />
      </section>

      {/* Sección 3: Estado animal y alertas */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <GraficoCircular label="Temperatura" data={animalCircularData} unit="°C" />
        <GraficoHistorialAlertas data={alertHistoryData} />
      </section>

      {/* Sección 4: Factores de control agrícola */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <GraficoHumedadSuelo data={soilMoistureData} />
        <GraficoPresion />
      </section>
    </div>
  );
}
