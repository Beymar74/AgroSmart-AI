"use client";
import React, { useState } from 'react';
import Header from '@/components/header';  
import Sidebar from '@/components/sidebar';  
import SidebarDer from '@/components/sidebarDer'; 
import Dashboard from '@/components/Dashboard'; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarDerOpen, setIsSidebarDerOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App flex min-h-screen">
      {/* Sidebar izquierdo */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Panel de control en la parte central */}
      <div className="main-content flex flex-col flex-grow ml-1 mr-1">
        <Header 
          onMenuClick={toggleSidebar}
          showMenuButton={true}
        />
        <div className="dashboard-container flex-1">
          <Dashboard />
        </div>
      </div>

      {/* Sidebar derecho */}
      {isSidebarDerOpen && <SidebarDer />}
    </div>
  );
}

export default App;