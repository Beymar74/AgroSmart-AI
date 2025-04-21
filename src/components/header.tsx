import React from 'react';

interface HeaderProps {
  title: string;
  setMostrarSidebar: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ title, setMostrarSidebar }) => {
  return (
    <div className="header-container w-full p-4 bg-white shadow-md flex items-center justify-between">
      {/* Botón hamburguesa visible solo en móviles */}
      <button
        onClick={() => setMostrarSidebar(true)}
        className="md:hidden text-2xl font-bold text-gray-700"
      >
        ☰
      </button>

      {/* Título centrado */}
      <h1 className="text-xl font-bold text-center flex-grow">{title}</h1>

      {/* Espacio invisible para mantener el título centrado */}
      <div className="w-6 md:hidden"></div>
    </div>
  );
};

export default Header;
