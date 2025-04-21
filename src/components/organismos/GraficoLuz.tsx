// src/components/organismos/GraficoLuz.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

interface LuzData {
  hour: string;
  luz: number;
}

interface Props {
  data: LuzData[];
}

export default function GraficoLuz({ data }: Props) {
  // paleta de colores por barra (ajusta a tu gusto)
  const colors = [
    "#8E99F3", // morado
    "#80CBC4", // menta
    "#000000", // negro
    "#90CAF9", // azul claro
    "#BBDEFB", // celeste
    "#A5D6A7"  // verde suave
  ];

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle>Luz Ambiental</CardTitle>
        {/* Si quieres descripción, descomenta la siguiente línea */}
        {/* <CardDescription>Histórico de niveles de luz</CardDescription> */}
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
          >
            {/* Ejes sin líneas */}
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              padding={{ left: 8, right: 8 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={24}
              domain={[0, 'dataMax + 500']}
            />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              formatter={(value: number) => [`${value}`, "Luz"]}
              labelFormatter={(label: string) => `Hora: ${label}`}
            />

            <Bar dataKey="luz" barSize={32} radius={[6, 6, 0, 0]}>
              {data.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
