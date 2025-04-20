"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  onAccion: (accion: string) => void;
}

const BotonesAccion: React.FC<Props> = ({ onAccion }) => {
  // Clase base para todos los botones (fondo, texto negro, pill‑shape, padding)
  const btnBase =
    "w-full rounded-full py-2 text-black font-sans"; // reemplaza font-sans por el font-family que uses

  // Color de fondo personalizado
  const btnBg = "bg-[#94E9B8] hover:bg-opacity-90";

  // Clases para los títulos de sección
  const sectionTitle = "text-black/50 font-sans mb-2";

  return (
    <div className="space-y-6">
      {/* Sección Riego */}
      <div>
        <h4 className={sectionTitle}>Riego</h4>
        <div className="space-y-2">
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Activar Riego")}
          >
            💧 Activar Riego
          </Button>
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Desactivar Riego")}
          >
            ❌💧 Desactivar Riego
          </Button>
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Modo Automático Riego")}
          >
            🤖 Modo Automático Riego
          </Button>
        </div>
      </div>

      {/* Sección Alimentador */}
      <div>
        <h4 className={sectionTitle}>Alimentador</h4>
        <div className="space-y-2">
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Activar Alimentador")}
          >
            🍽️ Activar Alimentador
          </Button>
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Desactivar Alimentador")}
          >
            ❌🍽️ Desactivar Alimentador
          </Button>
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Modo Automático Alimentador")}
          >
            🤖 Modo Automático Alimentador
          </Button>
        </div>
      </div>

      {/* Sección Ventilador */}
      <div>
        <h4 className={sectionTitle}>Ventilador</h4>
        <div className="space-y-2">
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Encender Ventilador")}
          >
            🌀 Activar Ventilador
          </Button>
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Apagar Ventilador")}
          >
            ❌🌀 Apagar Ventilador
          </Button>
          <Button
            className={`${btnBase} ${btnBg}`}
            onClick={() => onAccion("Modo Automático Ventilador")}
          >
            🤖 Modo Automático Ventilador
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BotonesAccion;
