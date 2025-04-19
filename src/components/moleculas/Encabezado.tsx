"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Encabezado() {
  const [fechaActual, setFechaActual] = useState("");

  useEffect(() => {
    const ahora = new Date().toLocaleString("es-BO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    setFechaActual(ahora);
  }, []);

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-4">
      <div className="flex items-center gap-4">
        <Image
          src="/logotipo.jpg"
          alt="AgroSmart Logo"
          width={60}
          height={60}
          className="rounded-md"
        />
        <h1 className="text-2xl font-bold text-center md:text-left">
          Panel de Control - AgroSmart AI
        </h1>
      </div>

      <div className="text-sm text-gray-600 text-center md:text-right">
        {fechaActual}
      </div>
    </header>
  );
}
