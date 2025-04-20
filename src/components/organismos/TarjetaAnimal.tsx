"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";

interface Props {
  animalData: any;
  temperaturaIR: number | null;
}

export default function TarjetaAnimal({ animalData, temperaturaIR }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoreo Animal</CardTitle>
        <CardDescription>Datos RFID solo si está enfermo</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Código: {animalData?.codigo ?? "--"}</p>
        <p>Temp. Animal (IR): {temperaturaIR ?? "--"} °C</p>
        <p>Estado: {animalData?.estado ?? "--"}</p>
        <p>Última Alimentación: {animalData?.ultimaAlimentacion ?? "--"}</p>
        {animalData?.estado?.toLowerCase() === "enfermo" && (
          <p className="text-red-600 font-bold">RFID Activo</p>
        )}
      </CardContent>
    </Card>
  );
}
