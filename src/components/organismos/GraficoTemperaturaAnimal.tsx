"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: any[];
}

export default function GraficoTemperaturaAnimal({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperatura Animal (IR)</CardTitle>
        <CardDescription>Detectada por el sensor MLX90614</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperatura" stroke="#FF5733" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
