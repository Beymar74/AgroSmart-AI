import React from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

const GraficoLuz = ({ data }: { data: any[] }) => {
  const chartData = {
    labels: data.map(d => d.hour),
    datasets: [
      {
        label: "",
        data: data.map(d => d.value),
        fill: true,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.3)",
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 },
      },
    },
  };

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle>Luz Ambiental</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default GraficoLuz;