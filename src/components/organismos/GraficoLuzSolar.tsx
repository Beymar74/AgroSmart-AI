// src/components/organismos/GraficoLuzSolar.tsx
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

interface SolarData {
  hour: string;
  luzSolar: number;
}

interface Props {
  data: SolarData[];
}

export default function GraficoLuzSolar({ data }: Props) {
  const colors = [
    "#F9A825", // amarillo oscuro
    "#FFF176", // amarillo claro
    "#FFEB3B", // amarillo
    "#FFF59D", // pálido
    "#FDD835",
    "#FFEE58"
  ];

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle>Luz Solar</CardTitle>
      </CardHeader>
      <CardContent className="h-53">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
          >
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
              domain={[0, 'dataMax + 50']}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              formatter={(value: number) => [`${value} lm`, "Luz Solar"]}
              labelFormatter={(label: string) => `Hora: ${label}`}
            />
            <Bar dataKey="luzSolar" barSize={32} radius={[6, 6, 0, 0]}>
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
