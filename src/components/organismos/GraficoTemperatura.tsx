"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: { hour: string; temperature: number }[];
}

export default function GraficoTemperatura({ data }: Props) {
  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle>Temperatura Ambiental</CardTitle>
        
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
          >
            {/* Definimos el degradado */}
            <defs>
              <linearGradient id="gradTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Ejes sin líneas ni marcas innecesarias */}
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              domain={["dataMin - 2", "dataMax + 2"]}
            />

            {/* Líneas de grid horizontales suaves */}
            <CartesianGrid
              vertical={false}
              stroke="#e0e0e0"
              strokeDasharray="3 3"
            />

            {/* Tooltip con esquinas redondeadas */}
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none" }}
              itemStyle={{ color: "#8884d8" }}
            />

            {/* Área rellena con degradado y línea superior suave */}
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#8884d8"
              strokeWidth={2}
              fill="url(#gradTemp)"
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
