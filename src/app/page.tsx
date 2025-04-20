import React from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar'; 
import SidebarDer from '@/components/sidebarDer'; 
import Dashboard from '@/components/Dashboard'; 

function App() {
  return (
    <div className="App flex min-h-screen">
      <Sidebar />  
      <div className="main-content flex flex-col flex-grow ml-1 mr-1">
        <Header title="Panel de Control" />
        <div className="dashboard-container flex-1">
          <Dashboard />
        </div>
      </div>

      <SidebarDer />
    </div>
  );
}

export default App;
