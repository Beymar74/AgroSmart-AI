import React from 'react';

interface HeaderProps {
  title: string;
  setMostrarSidebar: () => void; // ahora no recibe un boolean, sino una función que alterna
}

const Header: React.FC<HeaderProps> = ({ title, setMostrarSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md md:px-6 md:py-4">
      {/* Botón hamburguesa visible solo en móviles (md:hidden) */}
      <button
        onClick={setMostrarSidebar}
        className="md:hidden text-2xl font-bold text-gray-700 focus:outline-none"
      >
        ☰
      </button>

      {/* Título centrado */}
      <h1 className="flex-grow text-center text-lg font-semibold text-gray-800 md:text-xl">
        {title}
      </h1>

      {/* Botón para abrir sidebar derecho en móviles */}
      <button
        onClick={() => {
          /* 
            Para abrir el sidebar derecho, dispararemos un evento personalizado
            o usaremos un callback adicional. Por simplicidad, capturaremos desde DOM.
          */
          const event = new CustomEvent('toggle-sidebar-der');
          window.dispatchEvent(event);
        }}
        className="md:hidden text-2xl font-bold text-gray-700 focus:outline-none"
      >
        ⋮
      </button>

      {/* Espacio invisible en pantallas >= md para mantener el título centrado */}
      <div className="hidden w-6 md:block"></div>
    </header>
  );
};

export default Header;
