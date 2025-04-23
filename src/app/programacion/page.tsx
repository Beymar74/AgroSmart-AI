"use client";

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import toast, { Toaster } from "react-hot-toast";

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

export default function ProgramacionPage() {
  const [horaRiegoInicio, setHoraRiegoInicio] = useState("");
  const [horaRiegoFin, setHoraRiegoFin] = useState("");
  const [diasRiego, setDiasRiego] = useState<string[]>([]);

  const [horaAlimInicio, setHoraAlimInicio] = useState("");
  const [horaAlimFin, setHoraAlimFin] = useState("");
  const [diasAlim, setDiasAlim] = useState<string[]>([]);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  useEffect(() => {
    onValue(ref(db, "programacion/riego"), (snap) => {
      const data = snap.val();
      if (data) {
        setHoraRiegoInicio(data.inicio || "");
        setHoraRiegoFin(data.fin || "");
        setDiasRiego(data.dias || []);
      }
    });

    onValue(ref(db, "programacion/alimentacion"), (snap) => {
      const data = snap.val();
      if (data) {
        setHoraAlimInicio(data.inicio || "");
        setHoraAlimFin(data.fin || "");
        setDiasAlim(data.dias || []);
      }
    });
  }, []);

  const toggleDia = (dia: string, setDias: any, diasAct: string[]) => {
    setDias(diasAct.includes(dia) ? diasAct.filter(d => d !== dia) : [...diasAct, dia]);
  };

  const guardarHorarios = async () => {
    if (
      (!horaRiegoInicio || !horaRiegoFin || diasRiego.length === 0) &&
      (!horaAlimInicio || !horaAlimFin || diasAlim.length === 0)
    ) {
      toast.error("Completa al menos una programación con hora y días");
      return;
    }

    if (horaRiegoFin <= horaRiegoInicio && horaRiegoInicio && horaRiegoFin) {
      toast.error("La hora de fin de riego debe ser posterior a la de inicio");
      return;
    }

    if (horaAlimFin <= horaAlimInicio && horaAlimInicio && horaAlimFin) {
      toast.error("La hora de fin de alimentación debe ser posterior a la de inicio");
      return;
    }

    await set(ref(db, "programacion/riego"), {
      inicio: horaRiegoInicio,
      fin: horaRiegoFin,
      dias: diasRiego
    });

    await set(ref(db, "programacion/alimentacion"), {
      inicio: horaAlimInicio,
      fin: horaAlimFin,
      dias: diasAlim
    });

    toast.success("Horarios guardados correctamente ✅");
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-center mb-6">Programación Horaria</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* RIEGO */}
        <div>
          <h2 className="font-bold text-lg mb-2">🌿 Riego</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Inicio</label>
              <input type="time" className="input" value={horaRiegoInicio} onChange={e => setHoraRiegoInicio(e.target.value)} />
            </div>
            <div>
              <label>Fin</label>
              <input type="time" className="input" value={horaRiegoFin} onChange={e => setHoraRiegoFin(e.target.value)} />
            </div>
          </div>
          <div className="mt-3">
            <label className="block mb-1 font-medium text-sm text-gray-600">Días de ejecución:</label>
            <div className="flex flex-wrap gap-2">
              {dias.map(dia => (
                <label key={dia} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={diasRiego.includes(dia)}
                    onChange={() => toggleDia(dia, setDiasRiego, diasRiego)}
                  />
                  {dia}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ALIMENTACIÓN */}
        <div>
          <h2 className="font-bold text-lg mb-2">🍽 Alimentación</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Inicio</label>
              <input type="time" className="input" value={horaAlimInicio} onChange={e => setHoraAlimInicio(e.target.value)} />
            </div>
            <div>
              <label>Fin</label>
              <input type="time" className="input" value={horaAlimFin} onChange={e => setHoraAlimFin(e.target.value)} />
            </div>
          </div>
          <div className="mt-3">
            <label className="block mb-1 font-medium text-sm text-gray-600">Días de ejecución:</label>
            <div className="flex flex-wrap gap-2">
              {dias.map(dia => (
                <label key={dia} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={diasAlim.includes(dia)}
                    onChange={() => toggleDia(dia, setDiasAlim, diasAlim)}
                  />
                  {dia}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          className="w-full mt-4 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600"
          onClick={guardarHorarios}
        >
          Guardar Programación
        </button>
      </div>
    </main>
  );
}
