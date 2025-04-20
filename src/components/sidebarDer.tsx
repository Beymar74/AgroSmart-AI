import React from 'react';

const SidebarDer: React.FC = () => {
  return (
    <div className="sidebar-der bg-[#f7f7f7] text-black w-64 h-full flex flex-col p-6">
      <div className="alertas bg-white p-4 rounded shadow-md mb-6 h-32">
        <h3 className="font-semibold text-lg">Alertas y Notificaciones</h3>
        <p>No hay alertas recientes</p>
      </div>

      <div className="datos-ambientales bg-white p-4 rounded shadow-md mb-6 h-32">
        <h3 className="font-semibold text-lg">Datos Ambientales</h3>
        <p>Temperatura: </p>
        <p>Luz: </p>
        <p>Humedad del Suelo: </p>
      </div>

      <div className="monitoreo-animal bg-white p-4 rounded shadow-md mb-6 h-32">
        <h3 className="font-semibold text-lg">Monitoreo Animal</h3>
        <p>Código: </p>
        <p>Temp. Animal (IR): </p>
        <p>Estado: </p>
        <p>Última Alimentación: </p>
      </div>

      <div className="acciones-rapidas bg-white p-4 rounded shadow-md mb-6 h-48">
        <h3 className="font-semibold text-lg">Acciones Rápidas</h3>
        <p>Riego</p>
        <p>Alimentador</p>
        <p>Ventilador</p>
      </div>
    </div>
  );
};

export default SidebarDer;
