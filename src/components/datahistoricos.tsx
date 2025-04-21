'use client';
import React from 'react';
import Fechas1 from './fechas1';
import TipVariable from './tipVariable';
import ReAnimales from './reAnimales'; 
import Button from './button'; 
import Indicadores from './indicadores'; 
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DataHistoricos: React.FC = () => {

  const data = [
    { month: 'Ene', uv: 4000, pv: 2400, amt: 2400 },
    { month: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { month: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { month: 'Abr', uv: 2780, pv: 3908, amt: 2000 },
    { month: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { month: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { month: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const chartData = {
    labels: data.map(item => item.month), 
    datasets: [
      {
        label: 'UV', 
        data: data.map(item => item.uv), 
        borderColor: 'rgb(75, 192, 192)', 
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        fill: true,  
      },
    ],
  };

  const alerts = [
    { date: '2024-07-15 10:00', type: 'Alta Temperatura', value: '33°C', level: 'Alto' },
    { date: '2024-07-14 14:00', type: 'Baja Humedad', value: '30%', level: 'Medio' },
    { date: '2024-07-12 08:00', type: 'Actividad Anormal', value: 'Aumento del movimiento', level: 'Alto' },
    { date: '2024-07-10 20:00', type: 'Baja Temperatura', value: '8°C', level: 'Bajo' },
    { date: '2024-07-08 16:00', type: 'Humedad Media', value: '85%', level: 'Medio' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-6">
        <Fechas1 />
        <TipVariable />
        <ReAnimales />
        <Button />
      </div>

      <div className="bg-white p-4 mb-6 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Tendencias variables</h2>
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      <div className="">
        <Indicadores />
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Alertas</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Tipo de alerta</th>
              <th className="p-2 text-left">Valor detectado</th>
              <th className="p-2 text-left">Crítico</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{alert.date}</td>
                <td className="p-2">{alert.type}</td>
                <td className="p-2">{alert.value}</td>
                <td className="p-2">{alert.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataHistoricos;
