"use client";

import { Button } from "@/components/ui/button";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "@/firebase/config";

const db = getDatabase(app);

export default function ControlesManuales() {
  const actualizarActuador = (actuador: string, estado: number) => {
    set(ref(db, `actuadores/${actuador}`), estado);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Riego */}
      <Button onClick={() => actualizarActuador("riego", 1)}>💧 Activar Riego</Button>
      <Button variant="destructive" onClick={() => actualizarActuador("riego", 0)}>🔴 Apagar Riego</Button>
      <Button onClick={() => actualizarActuador("riego", 2)}>♻️ Modo Automático Riego</Button>

      {/* Alimentador */}
      <Button onClick={() => actualizarActuador("alimentador", 1)}>🍽️ Activar Alimentador</Button>
      <Button variant="destructive" onClick={() => actualizarActuador("alimentador", 0)}>🔴 Apagar Alimentador</Button>
      <Button onClick={() => actualizarActuador("alimentador", 2)}>♻️ Modo Automático Alimentador</Button>

      {/* Ventilador */}
      <Button onClick={() => actualizarActuador("ventilador", 1)}>🌀 Activar Ventilador</Button>
      <Button variant="destructive" onClick={() => actualizarActuador("ventilador", 0)}>🔴 Apagar Ventilador</Button>
      <Button onClick={() => actualizarActuador("ventilador", 2)}>♻️ Modo Automático Ventilador</Button>
    </section>
  );
}
