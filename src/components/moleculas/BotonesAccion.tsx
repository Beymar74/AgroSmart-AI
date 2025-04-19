"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onAccion: (accion: string) => void;
}

const BotonesAccion: React.FC<Props> = ({ onAccion }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Riego */}
      <Button onClick={() => onAccion("Apagar Riego")}>💧 Activar Riego</Button>
      <Button onClick={() => onAccion("Activar Riego")}>🚫 Desactivar Riego</Button>
      <Button onClick={() => onAccion("Modo Automático Riego")}>🤖 Modo Automático Riego</Button>

      {/* Alimentador */}
      <Button onClick={() => onAccion("Apagar Alimentador")}>🍽️ Activar Alimentador</Button>
      <Button onClick={() => onAccion("Activar Alimentador")}>🚫 Desactivar Alimentador</Button>
      <Button onClick={() => onAccion("Modo Automático Alimentador")}>🤖 Modo Automático Alimentador</Button>

      {/* Ventilador */}
      <Button onClick={() => onAccion("Encender Ventilador")}>🌀 Activar Ventilador</Button>
      <Button className="bg-[#589434] text-white hover:bg-[#43A047]"onClick={() => onAccion("Apagar Ventilador")}>
      🚫 Apagar Ventilador</Button>

      <Button onClick={() => onAccion("Modo Automático Ventilador")}>♻️ Modo Automático Ventilador</Button>

    </section>
  );
};

export default BotonesAccion;
