"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Props {
  temperatura: number | null;
  luz: number | null;
  humedadSuelo: number | null;
}

export default function TarjetaAmbiental({ temperatura, luz, humedadSuelo }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos Ambientales</CardTitle>
        <CardDescription>Lectura directa desde Firebase</CardDescription>
      </CardHeader>
      <CardContent>
        <p>🌡️ Temperatura: {temperatura ?? '--'} °C</p>
        <p>🔆 Luz: {luz ?? '--'}</p>
        <p>🌱 Humedad del Suelo: {humedadSuelo ?? '--'}</p>
      </CardContent>
    </Card>
  );
}
