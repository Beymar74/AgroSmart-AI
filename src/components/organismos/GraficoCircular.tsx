// src/components/organismos/GraficoCircular.tsx
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

interface CircularData {
  hour: string;
  value: number;
}

interface Props {
  label: string;
  data: CircularData[];  // serie horaria completa
  unit: string;           // "lm" o "°C"
  colors?: [string, string];
}

export default function GraficoCircular({
  label,
  data,
  unit,
  colors = ["#68D478", "#e5e7eb"]
}: Props) {
  const latest = data.length ? data[data.length - 1].value : 0;
  const percent = Math.min(100, Math.max(0, latest));

  const pieData = [
    { name: label, value: percent },
    { name: "resto", value: 100 - percent }
  ];

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle >{label}</CardTitle>
      </CardHeader>
      <CardContent className="h-60 flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip formatter={v => `${v}${unit}`} />
            <Pie
              data={pieData}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={2}
              cornerRadius={8}
            >
              {pieData.map((_, idx) => (
                <Cell key={idx} fill={idx === 0 ? colors[0] : colors[1]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute text-center">
          <span className="text-2xl font-semibold">{`${latest}${unit}`}</span>
        </div>
      </CardContent>
    </Card>
  );
}
