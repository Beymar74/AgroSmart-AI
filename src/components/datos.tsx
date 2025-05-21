'use client';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const firebaseConfig = {
  apiKey: 'AIzaSyBBoy3db8ZR5zglMwm0mwt8G4-rNRbaQ6w',
  authDomain: 'agrosmart-ai-9ee95.firebaseapp.com',
  databaseURL: 'https://agrosmart-ai-9ee95-default-rtdb.firebaseio.com',
  projectId: 'agrosmart-ai-9ee95',
  storageBucket: 'agrosmart-ai-9ee95.appspot.com',
  messagingSenderId: '854583309870',
  appId: '1:854583309870:web:50d37190c1ba4355e5d1bf'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Page = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [dataValores, setDataValores] = useState<number[]>([]);
  const [variable, setVariable] = useState("temperatura");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");

  useEffect(() => {
    const varRef = ref(db, `historico/${variable}`);
    onValue(varRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const newLabels: string[] = [];
      const newValues: number[] = [];

      Object.entries(data).forEach(([timestamp, value]) => {
        const fecha = new Date(Number(timestamp));
        const fechaStr = fecha.toISOString().split("T")[0];

        if (!fechaSeleccionada || fechaStr === fechaSeleccionada) {
          const horaStr = `${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
          newLabels.push(horaStr);
          newValues.push(Number(value));
        }
      });

      setLabels(newLabels);
      setDataValores(newValues);
    });
  }, [variable, fechaSeleccionada]);

  const max = Math.max(...dataValores);
  const min = Math.min(...dataValores);
  const avg = dataValores.length ? (dataValores.reduce((a, b) => a + b, 0) / dataValores.length).toFixed(2) : "0";

  const unidad = variable.includes("humedad") || variable === "luz" ? "%" : "°C";

  const data = {
    labels,
    datasets: [
      {
        label: `${variable.charAt(0).toUpperCase() + variable.slice(1)} (${unidad})`,
        data: dataValores,
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      },
    ],
  };

  const exportarExcel = () => {
    const worksheetData = labels.map((hora, i) => ({
      Fecha: fechaSeleccionada || 'sin fecha',
      Hora: hora,
      Valor: dataValores[i],
      Maximo: max,
      Minimo: min,
      Promedio: Number(avg)
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    XLSX.writeFile(workbook, `${variable}_${fechaSeleccionada || 'todo'}.xlsx`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6 flex-col md:flex-row gap-4">
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          className="p-2 border rounded"
        />
        <div className="flex space-x-4">
          <select
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="p-2 border rounded bg-white text-black"
          >
            <option value="temperatura">Temperatura</option>
            <option value="humedad">Humedad</option>
            <option value="presion">Presión</option>
            <option value="luz">Luz</option>
            <option value="humedad_suelo">Humedad del suelo</option>
          </select>
          <button className="p-2 bg-green-500 text-white rounded" onClick={exportarExcel}>
            Exportar datos
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Tendencias variables</h3>
        <Line data={data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded bg-white shadow">
          <h4 className="text-lg font-semibold">{`${variable.charAt(0).toUpperCase() + variable.slice(1)} máxima`}</h4>
          <p className="text-xl">{isFinite(max) ? `${max} ${unidad}` : "N/A"}</p>
        </div>
        <div className="p-4 border rounded bg-white shadow">
          <h4 className="text-lg font-semibold">{`${variable.charAt(0).toUpperCase() + variable.slice(1)} mínima`}</h4>
          <p className="text-xl">{isFinite(min) ? `${min} ${unidad}` : "N/A"}</p>
        </div>
        <div className="p-4 border rounded bg-white shadow">
          <h4 className="text-lg font-semibold">{`${variable.charAt(0).toUpperCase() + variable.slice(1)} media`}</h4>
          <p className="text-xl">{isNaN(Number(avg)) ? "N/A" : `${avg} ${unidad}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
