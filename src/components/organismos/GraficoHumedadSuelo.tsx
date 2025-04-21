"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: any[];
}

export default function GraficoHumedadSuelo({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Humedad del Suelo</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="moisture" stroke="#82ca9d" fill="#c8f7c5" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
