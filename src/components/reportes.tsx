'use client';

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

const ReportesDashboard = () => {
  const [fecha, setFecha] = useState('');
  const [datos, setDatos] = useState<{ valor: number; hora: string; fecha: string; timestamp: number }[]>([]);
  const [variable, setVariable] = useState('temperatura');

  const [responsable, setResponsable] = useState('');
  const [puesto, setPuesto] = useState('');
  const [observaciones, setObservaciones] = useState('El sistema operó con normalidad.');

  useEffect(() => {
    const refDatos = ref(db, `historico/${variable}`);
    onValue(refDatos, snapshot => {
      const raw = snapshot.val();
      if (!raw) return;
      const filtrados = Object.entries(raw)
        .map(([ts, val]) => {
          const d = new Date(Number(ts));
          return {
            valor: Number(val),
            hora: d.toTimeString().split(' ')[0].substring(0, 5),
            fecha: d.toLocaleDateString('en-CA'),
            timestamp: Number(ts)
          };
        })
        .filter(d => {
          if (!fecha) return true;
          const fechaDato = new Date(d.timestamp);
          const today = new Date(fecha);
          return (
            fechaDato.getFullYear() === today.getFullYear() &&
            fechaDato.getMonth() === today.getMonth() &&
            fechaDato.getDate() === today.getDate()
          );
        });
      setDatos(filtrados);
    });
  }, [fecha, variable]);

  const max = Math.max(...datos.map(d => d.valor));
  const min = Math.min(...datos.map(d => d.valor));
  const avg = datos.length ? (datos.reduce((a, b) => a + b.valor, 0) / datos.length).toFixed(2) : '0';

  const exportarPDFTexto = () => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(12);
    doc.text(`Proyecto: SmartAgroMed`, 14, y); y += 8;
    doc.text(`Fecha: ${fecha || 'Todos'}`, 14, y); y += 8;
    doc.text(`Nombre del responsable: ${responsable || '____________________'}`, 14, y); y += 8;
    doc.text(`Puesto: ${puesto || '____________________'}`, 14, y); y += 12;

    doc.setFont('helvetica', 'bold');
    doc.text(`Actividades realizadas:`, 14, y); y += 10;
    doc.setFont('helvetica', 'normal');

    doc.text(`1. Monitoreo de ${variable}:`, 14, y); y += 8;
    doc.text(`- Se registraron ${datos.length} lecturas.`, 16, y); y += 6;
    doc.text(`- Valor máximo: ${isFinite(max) ? max + '' : 'N/A'}`, 16, y); y += 6;
    doc.text(`- Valor mínimo: ${isFinite(min) ? min + '' : 'N/A'}`, 16, y); y += 6;
    doc.text(`- Valor promedio: ${avg}`, 16, y); y += 10;

    doc.setFont('helvetica', 'bold');
    doc.text(`Resumen:`, 14, y); y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(`Total de registros: ${datos.length}`, 16, y); y += 10;

    doc.setFont('helvetica', 'bold');
    doc.text(`Observaciones:`, 14, y); y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(`${observaciones}`, 16, y); y += 16;

    doc.text(`Firma: ______________________________`, 14, y);
    doc.save(`Informe_SmartAgroMed_${fecha || 'Todos'}.pdf`);
  };

  const exportarReporte = () => {
    const resumen = [{
      Fecha: fecha || 'Todos',
      Variable: variable,
      'Valor Máximo': max,
      'Valor Mínimo': min,
      Promedio: Number(avg),
      Registros: datos.length
    }];
    const detalle = datos.map(d => ({ Fecha: d.fecha, Hora: d.hora, Valor: d.valor }));

    const wb = XLSX.utils.book_new();
    const resumenSheet = XLSX.utils.json_to_sheet(resumen);
    const detalleSheet = XLSX.utils.json_to_sheet(detalle);

    XLSX.utils.book_append_sheet(wb, resumenSheet, 'Resumen');
    XLSX.utils.book_append_sheet(wb, detalleSheet, 'Detalle');
    XLSX.writeFile(wb, `Reporte_${variable}_${fecha || 'Todos'}.xlsx`);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="p-2 border rounded" />
        <select value={variable} onChange={e => setVariable(e.target.value)} className="p-2 border rounded">
          <option value="temperatura">Temperatura</option>
          <option value="humedad">Humedad</option>
          <option value="presion">Presión</option>
          <option value="luz">Luz</option>
          <option value="humedad_suelo">Humedad Suelo</option>
        </select>
        <div className="flex gap-2">
          <button onClick={exportarReporte} className="bg-green-600 text-white px-4 py-2 rounded shadow">
            Exportar Excel
          </button>
          <button onClick={exportarPDFTexto} className="bg-red-600 text-white px-4 py-2 rounded shadow">
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Nombre del responsable" value={responsable} onChange={e => setResponsable(e.target.value)} className="p-2 border rounded w-full" />
        <input type="text" placeholder="Puesto" value={puesto} onChange={e => setPuesto(e.target.value)} className="p-2 border rounded w-full" />
        <textarea placeholder="Observaciones" value={observaciones} onChange={e => setObservaciones(e.target.value)} className="p-2 border rounded col-span-2" />
      </div>

      <h3 className="text-xl font-bold mb-4">Reporte consolidado del día</h3>
      <table className="w-full table-auto border-collapse border text-sm">
        <thead>
          <tr>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Variable</th>
            <th className="border p-2">Máximo</th>
            <th className="border p-2">Mínimo</th>
            <th className="border p-2">Promedio</th>
            <th className="border p-2">Registros</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">{fecha || 'Todos'}</td>
            <td className="border p-2">{variable}</td>
            <td className="border p-2">{isFinite(max) ? `${max}` : 'N/A'}</td>
            <td className="border p-2">{isFinite(min) ? `${min}` : 'N/A'}</td>
            <td className="border p-2">{avg}</td>
            <td className="border p-2">{datos.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportesDashboard;
