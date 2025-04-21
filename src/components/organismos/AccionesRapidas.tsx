"use client";

import { set, getDatabase, ref } from "firebase/database";

const db = getDatabase();

interface GrupoBotonesProps {
  titulo: string;
  acciones: { label: string; value: string }[];
  onAccion: (accion: string) => void;
}

const GrupoBotones = ({ titulo, acciones, onAccion }: GrupoBotonesProps) => (
  <div className="mb-6">
    <h4 className="text-gray-600 font-semibold mb-2">{titulo}</h4>
    <div className="space-y-2">
      {acciones.map((accion, idx) => (
        <button
          key={idx}
          onClick={() => onAccion(accion.value)}
          className="w-full bg-[#94E9B8] hover:bg-opacity-90 rounded-full py-2 px-4 text-black font-semibold"
        >
          {accion.label}
        </button>
      ))}
    </div>
  </div>
);

export default function AccionesRapidas() {
  const handleAccion = async (accion: string) => {
    const [modo, tipo] = accion.split("_");
    await set(ref(db, `actuadores/${tipo}`), {
      activar: 1,
      desactivar: 0,
      auto: 2,
    }[modo]);
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Acciones Rápidas</h3>

      <GrupoBotones
        titulo="Riego"
        acciones={[
          { label: "💧 Activar Riego", value: "activar_riego" },
          { label: "❌💧 Desactivar Riego", value: "desactivar_riego" },
          { label: "🤖 Modo Automático Riego", value: "auto_riego" },
        ]}
        onAccion={handleAccion}
      />

      <GrupoBotones
        titulo="Alimentador"
        acciones={[
          { label: "🍽️ Activar Alimentador", value: "activar_alimentador" },
          { label: "❌🍽️ Desactivar Alimentador", value: "desactivar_alimentador" },
          { label: "🤖 Modo Automático Alimentador", value: "auto_alimentador" },
        ]}
        onAccion={handleAccion}
      />

      <GrupoBotones
        titulo="Ventilador"
        acciones={[
          { label: "🌀 Activar Ventilador", value: "activar_ventilador" },
          { label: "❌🌀 Desactivar Ventilador", value: "desactivar_ventilador" },
          { label: "🤖 Modo Automático Ventilador", value: "auto_ventilador" },
        ]}
        onAccion={handleAccion}
      />
    </div>
  );
}
