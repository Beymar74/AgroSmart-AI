"use client";
import React, { useState, useEffect } from 'react';
import { initializeApp }       from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getLatestAnimalData } from '@/services/animal';
import { analyzeAndAlert }     from '@/ai/flows/intelligent-alerting';
import BotonesAccion           from '@/components/moleculas/BotonesAccion';
import TarjetaAlertas          from "@/components/organismos/TarjetaAlertas";
import TarjetaAmbiental        from "@/components/organismos/TarjetaAmbiental";
import TarjetaAnimal           from "@/components/organismos/TarjetaAnimal";

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
const db  = getDatabase(app);

interface SidebarDerProps {
  onAccion: (accion: string) => void;
}

const SidebarDer: React.FC<SidebarDerProps> = ({ onAccion }) => {
  // Estados para datos ambientales, animal y alertas
  const [temp, setTemp]         = useState<number|null>(null);
  const [luz, setLuz]           = useState<number|null>(null);
  const [humSuelo, setHumSuelo] = useState<number|null>(null);
  const [tempAnimal, setTempAnimal] = useState<number|null>(null);
  const [animalData, setAnimalData] = useState<any>(null);
  const [alerts, setAlerts]         = useState<string[]>([]);

  // Función para re‑calcular alertas
  const actualizarAlertas = async (envData: any, aniData: any) => {
    const result = await analyzeAndAlert({
      historicalAlerts: "No hay alertas recientes.",
      environmentData: envData,
      animalData: aniData
    });
    setAlerts(result.alerts);
  };

  useEffect(() => {
    // Listeners Firebase
    onValue(ref(db, "ambiente/temperatura"), snap => setTemp(snap.val()));
    onValue(ref(db, "ambiente/luz"),         snap => setLuz(snap.val()));
    onValue(ref(db, "ambiente/humedad_suelo"), snap => setHumSuelo(snap.val()));
    onValue(ref(db, "ambiente/temperatura_animal"), snap => setTempAnimal(snap.val()));

    // Traer datos del animal y generar alertas
    (async () => {
      const ani = await getLatestAnimalData();
      setAnimalData(ani);
      await actualizarAlertas(
        { temperatura: temp, luz, humedadSuelo: humSuelo },
        ani
      );
    })();
  }, [temp, luz, humSuelo]);

  return (
    <aside className="sidebar-der bg-[#f7f7f7] text-black w-64 h-full flex flex-col p-6">
      {/* 1) Alertas y Notificaciones */}
      <div className="mb-6">
        <TarjetaAlertas alertas={alerts} />
      </div>

      {/* 2) Datos Ambientales */}
      <div className="mb-6">
        <TarjetaAmbiental
          temperatura={temp}
          luz={luz}
          humedadSuelo={humSuelo}
        />
      </div>

      {/* 3) Monitoreo Animal */}
      <div className="mb-6">
        <TarjetaAnimal
          animalData={animalData}
          temperaturaIR={tempAnimal}
        />
      </div>

      {/* 4) Acciones Rápidas (sin cambios) */}
      <div className="mt-auto">
        <h3 className="font-semibold text-lg mb-2">Acciones Rápidas</h3>
        <BotonesAccion onAccion={onAccion} />
      </div>
    </aside>
  );
};

export default SidebarDer;
