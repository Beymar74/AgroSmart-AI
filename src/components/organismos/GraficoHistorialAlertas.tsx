"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: any[];
}

export default function GraficoHistorialAlertas({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Alertas (Últimas 24 Horas)</CardTitle>
        <CardDescription>Cantidad de alertas por tipo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
