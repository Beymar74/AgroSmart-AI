"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import WaterTank from "@/components/WaterTank";

interface Props {
  nivelPorcentaje: number | null;
}

export default function TarjetaTanque({ nivelPorcentaje }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nivel del Tanque</CardTitle>
        <CardDescription>Medido por sensor ultrasónico</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {nivelPorcentaje !== null ? (
          <WaterTank nivelPorcentaje={nivelPorcentaje} />
        ) : (
          <p>Sin lectura</p>
        )}
      </CardContent>
    </Card>
  );
}
