"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";

interface Props {
  alertas: string[];
}

export default function TarjetaAlertas({ alertas }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas y Notificaciones</CardTitle>
        <CardDescription>Últimas alertas detectadas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {alertas.length > 0 ? (
          alertas.map((alerta, i) => (
            <p
              key={i}
              className="text-red-600 whitespace-normal break-words flex items-center gap-2"
            >
              ⚠️ {alerta}
            </p>
          ))
        ) : (
          <p>No hay alertas recientes.</p>
        )}
      </CardContent>
    </Card>
  );
}
