import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Tendencias variables',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'green',
      tension: 0.1,
    },
  ],
};

const Page = () => {
  return (
    <div className="p-6">
      {/* Date Range and Controls */}
      <div className="flex justify-between mb-6">
        <input type="date" className="p-2 border rounded" />
        <div className="flex space-x-4">
          <button className="p-2 bg-blue-500 text-white rounded">Tipo de variable</button>
          <button className="p-2 bg-blue-500 text-white rounded">Registros de animales enfermos</button>
          <button className="p-2 bg-green-500 text-white rounded">Exportar datos</button>
        </div>
      </div>

      {/* Tendencias Variables (Line Chart) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Tendencias variables</h3>
        <Line data={data} />
      </div>

      {/* Indicadores de Rendimiento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded bg-white shadow">
          <h4 className="text-lg font-semibold">Temperatura máxima</h4>
          <p className="text-xl">35°C</p>
          <p className="text-green-600">+10%</p>
        </div>
        <div className="p-4 border rounded bg-white shadow">
          <h4 className="text-lg font-semibold">Temperatura mínima</h4>
          <p className="text-xl">5°C</p>
          <p className="text-red-600">-5%</p>
        </div>
        <div className="p-4 border rounded bg-white shadow">
          <h4 className="text-lg font-semibold">Humedad media</h4>
          <p className="text-xl">60%</p>
          <p className="text-green-600">+2%</p>
        </div>
      </div>

      {/* Alerts Section (Table) */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Alerts</h3>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Tipo de alerta</th>
              <th className="p-2 border">Valor detectado</th>
              <th className="p-2 border">Crítico</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">2024-07-15 10:00</td>
              <td className="p-2 border">Alta Temperatura</td>
              <td className="p-2 border">33°C</td>
              <td className="p-2 border text-red-600">Alto</td>
            </tr>
            <tr>
              <td className="p-2 border">2024-07-14 14:00</td>
              <td className="p-2 border">Baja Humedad</td>
              <td className="p-2 border">30%</td>
              <td className="p-2 border text-yellow-600">Medio</td>
            </tr>
            <tr>
              <td className="p-2 border">2024-07-10 20:00</td>
              <td className="p-2 border">Baja Temperatura</td>
              <td className="p-2 border">8°C</td>
              <td className="p-2 border text-green-600">Bajo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
