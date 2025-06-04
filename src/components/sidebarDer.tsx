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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700">
        {icono} <span>{titulo}</span>
      </h4>
      <div className="space-y-2">
        {acciones.map((accion, idx) => (
          <button
            key={idx}
            onClick={() => handleAccion(accion.value)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-200 py-2 px-3 text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-green-300"
          >
            {accion.icon} <span>{accion.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="flex h-full flex-col overflow-y-auto bg-[#f7f7f7] p-6 text-black">
      <section className="mb-4 rounded-lg bg-white p-4 shadow">
        <h3 className="mb-2 text-lg font-bold text-gray-800">Alertas y Notificaciones</h3>
        {alerts.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No hay alertas recientes.</p>
        )}
      </section>

      <section className="mb-4 rounded-lg bg-white p-4 shadow">
        <h3 className="mb-2 text-lg font-bold text-gray-800">Datos Ambientales</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>🌡️ Temperatura: <span className="font-semibold">{temp ?? "N/A"}°C</span></li>
          <li>🔆 Luz: <span className="font-semibold">{luz ?? "N/A"}</span></li>
          <li>🌱 Humedad del Suelo: <span className="font-semibold">{humSuelo ?? "N/A"}</span></li>
        </ul>
      </section>

      <section className="mb-4 rounded-lg bg-white p-4 shadow">
        <h3 className="mb-2 text-lg font-bold text-gray-800">Monitoreo Animal</h3>
        <p className="mb-1 text-sm text-gray-700">
          <span className="font-medium">Código:</span> {animalData?.codigo ?? "COW001"}
        </p>
        <p className="mb-1 text-sm text-gray-700">
          <span className="font-medium">Temp. Animal (IR):</span> {tempAnimal ?? "N/A"}°C
        </p>
        <p className="mb-1 text-sm text-gray-700">
          <span className="font-medium">Estado:</span> {animalData?.estado ?? "normal"}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Última Alimentación:</span> {animalData?.ultimaAlimentacion ?? "08:00"}
        </p>
      </section>

      <section className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-2 text-lg font-bold text-gray-800">Acciones Rápidas</h3>
        {renderGrupoBotones("Riego", <Droplets className="h-5 w-5 text-blue-500" />, [
          { label: "Activar Riego", value: "desactivar_riego", icon: <Droplets className="h-4 w-4" /> },
          { label: "Desactivar Riego", value: "activar_riego", icon: <X className="h-4 w-4" /> },
          { label: "Modo Automático Riego", value: "auto_riego", icon: <Bot className="h-4 w-4" /> },
        ])}
        {renderGrupoBotones("Alimentador", <Utensils className="h-5 w-5 text-yellow-500" />, [
          { label: "Activar Alimentador", value: "desactivar_alimentador", icon: <Utensils className="h-4 w-4" /> },
          { label: "Desactivar Alimentador", value: "activar_alimentador", icon: <X className="h-4 w-4" /> },
          { label: "Modo Automático Alimentador", value: "auto_alimentador", icon: <Bot className="h-4 w-4" /> },
        ])}
        {renderGrupoBotones("Ventilador", <Fan className="h-5 w-5 text-blue-700" />, [
          { label: "Activar Ventilador", value: "desactivar_ventilador", icon: <Fan className="h-4 w-4" /> },
          { label: "Desactivar Ventilador", value: "activar_ventilador", icon: <X className="h-4 w-4" /> },
          { label: "Modo Automático Ventilador", value: "auto_ventilador", icon: <Bot className="h-4 w-4" /> },
        ])}
      </section>
    </aside>
  );
};

export default SidebarDer;
