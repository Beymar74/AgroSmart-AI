"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("✅ Iniciando sesión...");
    // Aquí luego puedes validar credenciales
    router.push('/'); // Redirige al dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Bienvenido a AgroSmart AI</h2>

        {/* Logo */}
        <img
          src="/logotipo.jpg"
          alt="Logotipo de AgroSmart"
          className="mx-auto mb-6 w-32 h-auto"
        />

        <img src="/ubicacion.png" alt="Mapa de ubicacion" className="mx-auto mb-6 w-64 h-auto" />

        {/* Campo de Usuario */}
        <div className="mb-4 text-left">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-6 text-left">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Botón */}
        <button
          onClick={handleLogin}
          style={{ backgroundColor: 'rgba(101, 160, 72, 1)' }}
          className="hover:brightness-110 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Login;
