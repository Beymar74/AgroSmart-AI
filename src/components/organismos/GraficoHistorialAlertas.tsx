// components/organismos/GraficoHistorialAlertas.tsx
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
  CartesianGrid,
  Tooltip
} from "recharts";

interface AlertData {
  type: string;
  count: number;
}

interface Props {
  data: AlertData[];
}

export default function GraficoHistorialAlertas({ data }: Props) {
  // Asegurarnos de que todos los tipos estén presentes (incluso con count = 0)
  const tiposFijos = ["Fiebre", "Bajo Nivel de Agua", "Falta de Alimentación"];
  const completeData = tiposFijos.map((tipo) => {
    const found = data.find((d) => d.type === tipo);
    return { type: tipo, count: found ? found.count : 0 };
  });

  return (
    <Card className="rounded-2xl border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle>Historial de Alertas</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="w-full h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={completeData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              {/* Opcional: grid de fondo muy sutil */}
              <CartesianGrid horizontal={false} vertical={false} />
              
              <XAxis
                dataKey="type"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#444", fontSize: 12 }}
                interval={0}
                angle={0}
                textAnchor="middle"
                height={30}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#444", fontSize: 12 }}
                allowDecimals={false}
                domain={[0, "dataMax + 1"]}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{ borderRadius: 8, border: "none" }}
              />
              <Bar
                dataKey="count"
                fill="#FF6B6B"
                maxBarSize={50}
                radius={[10, 10, 10, 10]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
