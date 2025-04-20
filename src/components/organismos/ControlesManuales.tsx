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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
  
        {/* Columna Izquierda: Graficos principales */}
        <div className="flex flex-col gap-4">
          <GraficoTemperatura />
          <GraficoLuz />
          <GraficoHumedadSuelo />
        </div>
  
        {/* Columna Derecha: Dashboard luz solar y temperatura animal */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <GraficoLuz /> {/* Si deseas un gráfico diferente para luz solar, cámbialo aquí */}
            <GraficoTemperaturaAnimal />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <TarjetaTanque />
            <TarjetaComida />
          </div>
        </div>
      </div>
  
      {/* Gráfico de Historial de Alertas */}
      <div className="mt-8 w-full">
        <GraficoHistorialAlertas />
      </div>
    </main>
  );
  