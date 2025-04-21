"use client";

import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getLatestAnimalData } from "@/services/animal";
import { analyzeAndAlert } from "@/ai/flows/intelligent-alerting";
import TarjetaAlertas from "@/components/organismos/TarjetaAlertas";
import TarjetaAmbiental from "@/components/organismos/TarjetaAmbiental";
import TarjetaAnimal from "@/components/organismos/TarjetaAnimal";

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

const SidebarDer: React.FC = () => {
  const [temp, setTemp] = useState<number | null>(null);
  const [luz, setLuz] = useState<number | null>(null);
  const [humSuelo, setHumSuelo] = useState<number | null>(null);
  const [tempAnimal, setTempAnimal] = useState<number | null>(null);
  const [animalData, setAnimalData] = useState<any>(null);
  const [alerts, setAlerts] = useState<string[]>([]);

  const actualizarAlertas = async (envData: any, aniData: any) => {
    const result = await analyzeAndAlert({
      historicalAlerts: "No hay alertas recientes.",
      environmentData: envData,
      animalData: aniData
    });
    setAlerts(result.alerts);
  };

  useEffect(() => {
    onValue(ref(db, "ambiente/temperatura"), snap => setTemp(snap.val()));
    onValue(ref(db, "ambiente/luz"), snap => setLuz(snap.val()));
    onValue(ref(db, "ambiente/humedad_suelo"), snap => setHumSuelo(snap.val()));
    onValue(ref(db, "ambiente/temperatura_animal"), snap => setTempAnimal(snap.val()));

    (async () => {
      const ani = await getLatestAnimalData();
      setAnimalData(ani);
      await actualizarAlertas(
        { temperatura: temp, luz, humedadSuelo: humSuelo },
        ani
      );
    })();
  }, [temp, luz, humSuelo]);

  const handleAccion = async (accion: string) => {
    switch (accion) {
      case "activar_riego":
        await set(ref(db, "actuadores/riego"), 1);
        break;
      case "desactivar_riego":
        await set(ref(db, "actuadores/riego"), 0);
        break;
      case "auto_riego":
        await set(ref(db, "actuadores/riego"), 2);
        break;

      case "activar_alimentador":
        await set(ref(db, "actuadores/alimentador"), 1);
        break;
      case "desactivar_alimentador":
        await set(ref(db, "actuadores/alimentador"), 0);
        break;
      case "auto_alimentador":
        await set(ref(db, "actuadores/alimentador"), 2);
        break;

      case "activar_ventilador":
        await set(ref(db, "actuadores/ventilador"), 1);
        break;
      case "desactivar_ventilador":
        await set(ref(db, "actuadores/ventilador"), 0);
        break;
      case "auto_ventilador":
        await set(ref(db, "actuadores/ventilador"), 2);
        break;
    }
  };

  const renderGrupoBotones = (titulo: string, acciones: { label: string, value: string }[]) => (
    <div className="mb-6">
      <h4 className="text-gray-600 font-semibold mb-2">{titulo}</h4>
      <div className="space-y-2">
        {acciones.map((accion, idx) => (
          <button
            key={idx}
            onClick={() => handleAccion(accion.value)}
            className="w-full bg-[#94E9B8] hover:bg-opacity-90 rounded-full py-2 px-4 text-black font-semibold"
          >
            {accion.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="sidebar-der bg-[#f7f7f7] text-black w-64 h-full flex flex-col p-6 overflow-y-auto">
      <div className="mb-6">
        <TarjetaAlertas alertas={alerts} />
      </div>

      <div className="mb-6">
        <TarjetaAmbiental temperatura={temp} luz={luz} humedadSuelo={humSuelo} />
      </div>

      <div className="mb-6">
        <TarjetaAnimal animalData={animalData} temperaturaIR={tempAnimal} />
      </div>

      <div className="mt-auto">
        <h3 className="font-semibold text-lg mb-2">Acciones Rápidas</h3>

        {renderGrupoBotones("Riego", [
          { label: "💧 Desactivar Riego", value: "activar_riego" },
          { label: "❌💧 Activar Riego", value: "desactivar_riego" },
          { label: "🤖 Modo Automático Riego", value: "auto_riego" },
        ])}

        {renderGrupoBotones("Alimentador", [
          { label: "🍽️ Desactivar Alimentador", value: "activar_alimentador" },
          { label: "❌🍽️ Activar Alimentador", value: "desactivar_alimentador" },
          { label: "🤖 Modo Automático Alimentador", value: "auto_alimentador" },
        ])}

        {renderGrupoBotones("Ventilador", [
          { label: "🌀 Desactivar Ventilador", value: "activar_ventilador" },
          { label: "❌🌀 Activar Ventilador", value: "desactivar_ventilador" },
          { label: "🤖 Modo Automático Ventilador", value: "auto_ventilador" },
        ])}
      </div>
    </aside>
  );
};

export default SidebarDer;
