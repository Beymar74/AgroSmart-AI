// src/components/organismos/GraficoLuzSolar.tsx

"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LuzSolarData {
  hour: string;
  luzSolar: number;
}

interface Props {
  data: LuzSolarData[];
}

const GraficoLuzSolar: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Luz Solar (Histórico)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Luz" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoLuzSolar;
