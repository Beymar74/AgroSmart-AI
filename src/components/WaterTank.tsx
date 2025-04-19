// src/components/WaterTank.tsx

interface WaterTankProps {
  nivelPorcentaje: number; // entre 0 y 100
}

export default function WaterTank({ nivelPorcentaje }: WaterTankProps) {
  const altura = Math.max(0, Math.min(100, nivelPorcentaje));
  return (
    <div className="w-24 h-40 border-4 border-blue-500 rounded-lg overflow-hidden relative bg-white shadow-md">
      <div
        className="absolute bottom-0 left-0 w-full bg-blue-400 transition-all duration-700"
        style={{ height: `${altura}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-blue-900">
        {altura}%
      </div>
    </div>
  );
}