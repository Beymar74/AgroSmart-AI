import React from 'react';
import DatosHistoricos from '@/components/datahistoricos';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar'; 
import SidebarDer from '@/components/sidebarDer'; 

function Datos() {
  return (
    <div className="App flex min-h-screen">
      <Sidebar />  
      <div className="main-content flex flex-col flex-grow ml-1 mr-1">
        <Header title="Datos Historicos" />
        <div className="dashboard-container flex-1">
          <DatosHistoricos />
        </div>
      </div>

      <SidebarDer />
    </div>
  );
}

export default Datos;
