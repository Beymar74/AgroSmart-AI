"use client";

import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import { ThermometerSun } from "lucide-react";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  label: string;
  data: { hour: string; value: number }[];
  unit?: string;
}

export default function GraficoCircular({ label, data, unit }: Props) {
  const latestValue = data.length > 0 ? data[data.length - 1].value : null;

  const getColor = (val: number | null) => {
    if (val === null) return "#d1d5db";
    if (val < 34) return "#f87171"; // rojo claro (hipotermia)
    if (val > 39.5) return "#fbbf24"; // amarillo (fiebre)
    return "#34d399"; // verde (normal)
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <ThermometerSun className="w-5 h-5 text-rose-500" /> {label}
      </h2>
      <div className="w-44 h-44">
        <CircularProgressbarWithChildren
          value={latestValue ?? 0}
          maxValue={45}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: getColor(latestValue),
            trailColor: "#e5e7eb"
          })}
        >
          <div className="text-center font-bold text-2xl">
            {latestValue !== null ? `${latestValue.toFixed(2)}${unit ?? ""}` : "--"}
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
