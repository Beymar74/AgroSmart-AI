"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import TarjetaComida from "@/components/organismos/TarjetaComida";
import TarjetaAmbiental from "@/components/organismos/TarjetaAmbiental";
import TarjetaAnimal from "@/components/organismos/TarjetaAnimal";
import TarjetaAlertas from "@/components/organismos/TarjetaAlertas";
import GraficoTemperatura from "@/components/organismos/GraficoTemperatura";
import GraficoLuz from "@/components/organismos/GraficoLuz";
import GraficoLuzSolar from "@/components/organismos/GraficoLuzSolar";
import GraficoHumedadSuelo from "@/components/organismos/GraficoHumedadSuelo";
import TarjetaTanque from "@/components/organismos/TarjetaTanque";
import GraficoTemperaturaAnimal from "@/components/organismos/GraficoTemperaturaAnimal";
import GraficoHistorialAlertas from "@/components/organismos/GraficoHistorialAlertas";
import GraficoCircular from "@/components/organismos/GraficoCircular";
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
  const [environmentData, setEnvironmentData] = useState<any>(null);
  const [animalData, setAnimalData] = useState<any>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
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
  const [irrigationConfig, setIrrigationConfig] = useState<any>(null);
  const [feedingConfig, setFeedingConfig] = useState<any>(null);

  const alertHistoryData = [
    { type: "Fiebre", count: Math.floor(Math.random() * 5) },
    { type: "Bajo Nivel de Agua", count: Math.floor(Math.random() * 10) },
    { type: "Falta de Alimentación", count: Math.floor(Math.random() * 3) }
  ];

  const solarCircularData = solarData.map(d => ({ hour: d.hour, value: d.luzSolar }));
  const animalCircularData = tempAnimalData.map(d => ({ hour: d.hour, value: d.temperatura }));

  const { toast } = useToast();
  const currentDateTime = format(new Date(), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });

  useEffect(() => {
    async function fetchData() {
      const envData = await getEnvironmentData();
      const aniData = await getLatestAnimalData();
      const irrigConf = await getIrrigationConfig();
      const feedConf = await getFeedingConfig();

      setEnvironmentData(envData);
      setAnimalData(aniData);
      setIrrigationConfig(irrigConf);
      setFeedingConfig(feedConf);

      const alertResult = await analyzeAndAlert({
        historicalAlerts: "No hay alertas recientes.",
        environmentData: envData,
        animalData: aniData
      });
      setAlerts(alertResult.alerts);
    }
    fetchData();

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

    onValue(ref(db, "historico/luz"), snap => {
      setLuzData(Object.entries(snap.val() || {}).map(([k, v]) => ({
        hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        luz: v
      })));
    });

    onValue(ref(db, "historico/luz_solar"), snap => {
      setSolarData(Object.entries(snap.val() || {}).map(([k, v]) => ({
        hour: new Date(Number(k)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        luzSolar: v
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

    onValue(ref(db, "alertas/error"), snapshot => {
      const data = snapshot.val();
      if (data) {
        const errores = Object.values(data).filter(Boolean) as string[];
        setAlerts(prevAlerts => Array.from(new Set([...prevAlerts, ...errores])));
      }
    });
  }, []);

  useEffect(() => {
    const nuevasAlertas: string[] = [];
    if (firebaseTemp === null || firebaseTemp < -10 || firebaseTemp > 60) {
      nuevasAlertas.push("🚨 Temperatura ambiental inválida");
    }
    if (firebaseHumedadSuelo === null || firebaseHumedadSuelo < 0 || firebaseHumedadSuelo > 4095) {
      nuevasAlertas.push("🌱 Humedad del suelo fuera de rango");
    }
    if (firebaseDistancia === null || firebaseDistancia < 0 || firebaseDistancia > 500) {
      nuevasAlertas.push("📏 Sensor ultrasónico con fallas");
    }
    if (firebaseTempAnimal === null || firebaseTempAnimal < 34 || firebaseTempAnimal > 40.5) {
      nuevasAlertas.push("🐄 Fiebre o hipotermia detectada en el animal");
    }
    if (firebaseLuz === null || firebaseLuz < 0) {
      nuevasAlertas.push("💡 Sensor de luz no disponible");
    }
    setAlerts(nuevasAlertas);

    const intervalId = setInterval(() => setAlerts(nuevasAlertas), 60000);
    return () => clearInterval(intervalId);
  }, [firebaseTemp, firebaseHumedadSuelo, firebaseDistancia, firebaseTempAnimal, firebaseLuz]);

  return (
    <main className="p-6 space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TarjetaAmbiental temperatura={firebaseTemp} luz={firebaseLuz} humedadSuelo={firebaseHumedadSuelo} />
        <TarjetaAnimal animalData={animalData} temperaturaIR={firebaseTempAnimal} />
        <TarjetaAlertas alertas={alerts} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GraficoTemperatura data={temperatureData} />
          <GraficoLuz data={luzData} />
          <GraficoHumedadSuelo data={soilMoistureData} />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GraficoCircular label="Luz Solar" data={solarCircularData} unit="lm" />
            <GraficoCircular label="Temperatura" data={animalCircularData} unit="°C" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TarjetaComida nivelPorcentaje={firebaseDistancia !== null ? convertirADistanciaPorcentaje(firebaseDistancia) : null} />
            <TarjetaTanque nivelPorcentaje={firebaseDistancia !== null ? convertirADistanciaPorcentaje(firebaseDistancia) : null} />
          </div>
          <GraficoHistorialAlertas data={alertHistoryData} />
        </div>
      </section>
    </main>
  );
}