"use client";

import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getLatestAnimalData } from "@/services/animal";
import { analyzeAndAlert } from "@/ai/flows/intelligent-alerting";
import { Bot, Droplets, Fan, Utensils, X } from "lucide-react";

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
    await set(ref(db, `actuadores/${accion.split("_")[1]}`), {
      "activar": 1,
      "desactivar": 0,
      "auto": 2
    }[accion.split("_")[0]]);
  };

  const renderGrupoBotones = (
    titulo: string,
    icono: React.ReactNode,
    acciones: { label: string; value: string; icon: React.ReactNode }[]
  ) => (
    <div className="mb-6">
      <h4 className="text-gray-600 font-semibold mb-2 flex items-center gap-2">
        {icono} {titulo}
      </h4>
      <div className="space-y-2">
        {acciones.map((accion, idx) => (
          <button
            key={idx}
            onClick={() => handleAccion(accion.value)}
            className="w-full bg-green-200 hover:bg-green-300 rounded-xl py-1.5 px-3 text-black font-semibold flex items-center gap-2 justify-center"
          >
            {accion.icon} {accion.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="sidebar-der bg-[#f7f7f7] text-black w-64 h-full flex flex-col p-6 overflow-y-auto">
      <section className="bg-white p-4 rounded-lg shadow mb-4">
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

      <section className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="font-bold text-lg">Datos Ambientales</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>🌡️ Temperatura: {temp ?? "N/A"}°C</li>
          <li>🔆 Luz: {luz ?? "N/A"}</li>
          <li>🌱 Humedad del Suelo: {humSuelo ?? "N/A"}</li>
        </ul>
      </section>

      <section className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="font-bold text-lg">Monitoreo Animal</h3>
        <p className="text-sm text-gray-700">Código: {animalData?.codigo ?? "COW001"}</p>
        <p className="text-sm text-gray-700">Temp. Animal (IR): {tempAnimal ?? "N/A"}°C</p>
        <p className="text-sm text-gray-700">Estado: {animalData?.estado ?? "normal"}</p>
        <p className="text-sm text-gray-700">Última Alimentación: {animalData?.ultimaAlimentacion ?? "08:00"}</p>
      </section>

      <section className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Acciones Rápidas</h3>
        {renderGrupoBotones("Riego", <Droplets className="w-4 h-4" />, [
          { label: "Activar Riego", value: "desactivar_riego", icon: <Droplets className="w-4 h-4" /> },
          { label: "Desactivar Riego", value: "activar_riego", icon: <X className="w-4 h-4" /> },
          { label: "Modo Automático Riego", value: "auto_riego", icon: <Bot className="w-4 h-4" /> },
        ])}
        {renderGrupoBotones("Alimentador", <Utensils className="w-4 h-4" />, [
          { label: "Activar Alimentador", value: "desactivar_alimentador", icon: <Utensils className="w-4 h-4" /> },
          { label: "Desactivar Alimentador", value: "activar_alimentador", icon: <X className="w-4 h-4" /> },
          { label: "Modo Automático Alimentador", value: "auto_alimentador", icon: <Bot className="w-4 h-4" /> },
        ])}
        {renderGrupoBotones("Ventilador", <Fan className="w-4 h-4" />, [
          { label: "Activar Ventilador", value: "desactivar_ventilador", icon: <Fan className="w-4 h-4" /> },
          { label: "Desactivar Ventilador", value: "activar_ventilador", icon: <X className="w-4 h-4" /> },
          { label: "Modo Automático Ventilador", value: "auto_ventilador", icon: <Bot className="w-4 h-4" /> },
        ])}
      </section>
    </aside>
  );
};

export default SidebarDer;