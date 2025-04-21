'use client';
import Link from 'next/link';  // Importa Link desde next/link

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar bg-[#f7f7f7] text-black w-64 h-full flex flex-col p-6">
      {/* Logo */}
      <div className="logo flex items-center mb-8">
        <img src="/logotipo.jpg" alt="AgroSmart IA" className="w-12 h-12 mr-4" />
        <div className="text-lg font-bold">AgroSmart IA</div>
      </div>

      {/* Menu */}
      <ul className="menu space-y-4">
        <li>
          <Link href="/dashboard"> {/* Redirige a la página Dashboard */}
            <div className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
              <img src="/ChartPieSlice.png" alt="Dashboard Icon" className="w-6 h-6" />
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/ubicacion"> {/* Redirige a la página Ubicación */}
            <div className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
              <img src="/ubicacion.png" alt="Ubicación Icon" className="w-6 h-6" />
              <span>Ubicación</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/datos"> {/* Redirige a la nueva página de Datos Históricos */}
            <div className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded">
              <img src="/FolderNotch.png" alt="Datos históricos Icon" className="w-6 h-6" />
              <span>Datos históricos</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
