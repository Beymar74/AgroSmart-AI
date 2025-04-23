import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '@/firebase/config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficoPresion = () => {
  const [datosPresion, setDatosPresion] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });

  useEffect(() => {
    const db = getDatabase(app);
    const presionRef = ref(db, 'historico/presion');

    onValue(presionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const labels = Object.keys(data).map((timestamp) => {
          const date = new Date(parseInt(timestamp));
          return date.toLocaleTimeString(); // Puedes usar toLocaleString() si prefieres incluir fecha
        });

        const values = Object.values(data).map((val) => Number(val));
        setDatosPresion({ labels, values });
      }
    });
  }, []);

  const data = {
    labels: datosPresion.labels,
    datasets: [
      {
        label: 'Presión (hPa)',
        data: datosPresion.values,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Presión Atmosférica',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default GraficoPresion;
