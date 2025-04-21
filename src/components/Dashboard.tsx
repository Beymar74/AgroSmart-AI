"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
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
import { useToast } from "@/hooks/use-toast";
import { getEnvironmentData } from "@/services/environment";
import { getLatestAnimalData } from "@/services/animal";
import { analyzeAndAlert } from "@/ai/flows/intelligent-alerting";
import { getIrrigationConfig, getFeedingConfig } from "@/services/automation";

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

interface DashboardProps {
  onAccion: (accion: string) => void;
}

export default function Dashboard({ onAccion }: DashboardProps) {
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
      setSolarData(
        Object.entries(snap.val() || {}).map(([k, v]) => ({
          hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          luzSolar: Math.min(100, Math.round((Number(v) / 4095) * 100)) // ✅ Normalizado
        }))
      );
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

  const [alerts, setAlerts] = useState<string[]>([])
  const [environmentalData, setEnvironmentalData] = useState<{ temperature: number | null, light: number | null, soilMoisture: number | null }>({ temperature: null, light: null, soilMoisture: null })
  const [animalData, setAnimalData] = useState<{ code: string, temperature: number | null, state: string, lastFeeding: string }>({ code: "COW001", temperature: null, state: "normal", lastFeeding: "08:00" })

  // Simulate alerts for now
  useEffect(() => {
    if (firebaseTemp !== null && firebaseTemp > 30) {
      setAlerts(prevAlerts => [...prevAlerts, "Temperatura alta detectada"])
    }
  }, [firebaseTemp])

  useEffect(() => {
    setEnvironmentalData({
      temperature: firebaseTemp,
      light: firebaseLuz,
      soilMoisture: firebaseHumedadSuelo,
    })
  }, [firebaseTemp, firebaseLuz, firebaseHumedadSuelo])

  useEffect(() => {
    setAnimalData(prevData => ({ ...prevData, temperature: firebaseTempAnimal }))
  }, [firebaseTempAnimal])

  return (
    <main className="p-6">
      <div className="flex space-x-6">
        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temperature, Light, Soil Moisture */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <GraficoTemperatura data={temperatureData} />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <GraficoLuz data={luzData} />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <GraficoHumedadSuelo data={soilMoistureData} />
          </div>

          {/* Luz Solar, Temperatura Circular, Food/Water Cards */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-cols-1 gap-6">
            <div className="row-span-1">
              <GraficoCircular label="Luz Solar" data={solarCircularData} unit="%" />
            </div>
            <div className="row-span-1">
              <GraficoCircular label="Temperatura" data={animalCircularData} unit="°C" />
            </div>
          </div>

          {/* Comida, Agua, Alert History */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <TarjetaComida nivelPorcentaje={firebaseDistancia !== null ? convertirADistanciaPorcentaje(firebaseDistancia) : null} />
            </div>
            <div className="md:col-span-1">
              <TarjetaTanque nivelPorcentaje={firebaseDistancia !== null ? convertirADistanciaPorcentaje(firebaseDistancia) : null} />
            </div>
            <div className="md:col-span-2">
              <GraficoHistorialAlertas data={alertHistoryData} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-80 space-y-6">
          {/* Alertas y Notificaciones */}
          <section className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Alertas y Notificaciones</h3>
            {alerts.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {alerts.map((alert, index) => (
                  <li key={index}>{alert}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No hay alertas recientes.</p>
            )}
          </section>

        {/* Datos Ambientales */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">Datos Ambientales</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Temperatura: {environmentalData.temperature !== null ? `${environmentalData.temperature}°C` : "N/A"}</li>
            <li>Luz: {environmentalData.light !== null ? environmentalData.light : "N/A"}</li>
            <li>Humedad del Suelo: {environmentalData.soilMoisture !== null ? environmentalData.soilMoisture : "N/A"}</li>
          </ul>
        </section>

        {/* Monitoreo Animal */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">Monitoreo Animal</h3>
          <p className="text-sm text-gray-700">Código: {animalData.code}</p>
          <p className="text-sm text-gray-700">Temp. Animal (IR): {animalData.temperature !== null ? `${animalData.temperature}°C` : "N/A"}</p>
          <p className="text-sm text-gray-700">Estado: {animalData.state}</p>
          <p className="text-sm text-gray-700">Última Alimentación: {animalData.lastFeeding}</p>
        </section>

        {/* Acciones Rapidas */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">Acciones Rapidas</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button onClick={() => onAccion("riego")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs">Activar Riego</button>
            <button onClick={() => onAccion("alimentador")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded text-xs">Activar Alimentador</button>
            <button onClick={() => onAccion("ventilador")} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded text-xs">Activar Ventilador</button>
          </div>
        </section>
      </aside>
      </div>
    </main>
  )
}
