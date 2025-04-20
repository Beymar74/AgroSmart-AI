/* components/TarjetaComida.tsx */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import WaterTank from '@/components/WaterTank';

interface Props {
  nivelPorcentaje: number | null;
}

export default function TarjetaComida({ nivelPorcentaje }: Props) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex justify-center">
        <CardTitle className="text-center">Comida</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        {nivelPorcentaje !== null ? (
          <WaterTank
            nivelPorcentaje={nivelPorcentaje}
            borderColorClass="border-green-500"
            fillColorClass="bg-green-400"
            textColorClass="text-green-900"
          />
        ) : (
          <p>Sin lectura</p>
        )}
      </CardContent>
    </Card>
  );
}
