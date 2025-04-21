"use client";

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import TarjetaComida from "@/components/organismos/TarjetaComida";
import TarjetaTanque from "@/components/organismos/TarjetaTanque";
import GraficoTemperatura from "@/components/organismos/GraficoTemperatura";
import GraficoLuz from "@/components/organismos/GraficoLuz";
import GraficoLuzSolar from "@/components/organismos/GraficoLuzSolar";
import GraficoHumedadSuelo from "@/components/organismos/GraficoHumedadSuelo";
import GraficoCircular from "@/components/organismos/GraficoCircular";
import GraficoHistorialAlertas from "@/components/organismos/GraficoHistorialAlertas";

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
  const [solarData, setSolarData] = useState<any[]>([]);
  const [firebaseTemp, setFirebaseTemp] = useState<number | null>(null);
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [soilMoistureData, setSoilMoistureData] = useState<any[]>([]);
  const [firebaseDistancia, setFirebaseDistancia] = useState<number | null>(null);
  const [firebaseTempAnimal, setFirebaseTempAnimal] = useState<number | null>(null);
  const [tempAnimalData, setTempAnimalData] = useState<any[]>([]);

  const alertHistoryData = [
    { type: "Fiebre", count: Math.floor(Math.random() * 5) },
    { type: "Bajo Nivel de Agua", count: Math.floor(Math.random() * 10) },
    { type: "Falta de Alimentación", count: Math.floor(Math.random() * 3) }
  ];

  const solarCircularData = solarData.map(d => ({ hour: d.hour, value: d.luzSolar }));
  const animalCircularData = tempAnimalData.map(d => ({ hour: d.hour, value: d.temperatura }));

  useEffect(() => {
    onValue(ref(db, "ambiente/temperatura"), snap => setFirebaseTemp(snap.val()));
    onValue(ref(db, "ambiente/luz"), snap => setFirebaseLuz(snap.val()));
    onValue(ref(db, "ambiente/humedad_suelo"), snap => setFirebaseHumedadSuelo(snap.val()));
    onValue(ref(db, "ambiente/distancia"), snap => setFirebaseDistancia(snap.val()));
    onValue(ref(db, "ambiente/temperatura_animal"), snap => setFirebaseTempAnimal(snap.val()));

    onValue(ref(db, "historico/temperatura"), snap => {
      setTemperatureData(Object.entries(snap.val() || {}).map(([k, v]) => ({
        hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: v
      })));
    });

    onValue(ref(db, "historico/luz_solar"), snap => {
      setSolarData(Object.entries(snap.val() || {}).map(([k, v]) => ({
        hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        luzSolar: Math.min(100, Math.round((Number(v) / 4095) * 100))
      })));
    });

    onValue(ref(db, "historico/humedad_suelo"), snap => {
      setSoilMoistureData(Object.entries(snap.val() || {}).map(([k, v]) => ({
        hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        moisture: v
      })));
    });

    onValue(ref(db, "historico/temperatura_animal"), snap => {
      setTempAnimalData(Object.entries(snap.val() || {}).map(([k, v]) => ({
        hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperatura: v
      })));
    });
  }, []);

    return (
        <main className="p-6 min-h-screen bg-[#f8f8f8]">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Gráficos de línea */}
              <GraficoTemperatura data={temperatureData} />
              <GraficoHumedadSuelo data={soilMoistureData} />
              {/* Gráficos de luz */}
              <GraficoLuz data={luzData} />
              <GraficoLuzSolar data={solarData} />
    
              {/* Gráficos circulares */}
              <GraficoCircular label="Luz Solar" data={solarCircularData} unit="%" />
              <GraficoCircular label="Temperatura" data={animalCircularData} unit="°C" />
    
              {/* Historial de alertas */}
              <GraficoHistorialAlertas data={alertHistoryData} />
    
              {/* Tarjetas de estado */}
              <TarjetaComida
                nivelPorcentaje={
                  firebaseDistancia !== null
                    ? convertirADistanciaPorcentaje(firebaseDistancia)
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
            </div>
          </div>
        </main>
      );
    }