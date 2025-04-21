// src/components/organismos/GraficoCircularLuz.tsx
"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  value: number;
}

const GraficoCircularLuz: React.FC<Props> = ({ value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <h2 className="text-lg font-bold mb-2">Luz Solar</h2>
      <CircularProgressbar
        value={value}
        maxValue={1023}
        text={`${value} lm`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#facc15",
          trailColor: "#eee",
        })}
      />
    </div>
  );
};

export default GraficoCircularLuz;
