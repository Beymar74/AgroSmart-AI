"use client";

import { useEffect, useState } from 'react';
import { getEnvironmentData } from '@/services/environment';
import { getLatestAnimalData, AnimalData } from '@/services/animal';
import { analyzeAndAlert } from '@/ai/flows/intelligent-alerting';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Thermometer, AirHumidity, Sun, Droplet, Cat, AlertTriangle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const statusColors = {
  normal: 'border-green-500 bg-green-50',
  warning: 'border-yellow-500 bg-yellow-50',
  critical: 'border-red-500 bg-red-50',
};

const formatDate = (date: Date): string => {
  return format(date, 'd \'de\' MMMM \'de\' yyyy, HH:mm', { locale: es });
};

export default function Home() {
  const [environmentData, setEnvironmentData] = useState<any>(null);
  const [animalData, setAnimalData] = useState<any>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const { toast } = useToast();
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalData | null>(null);
  const [selectedAnimalCode, setSelectedAnimalCode] = useState<string | null>(null);

  // Dummy data for charts
  const temperatureData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    temperature: 15 + Math.random() * 10,
  }));

  const soilMoistureData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    moisture: 40 + Math.random() * 30,
  }));

  const animalTemperatureData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    animal1: 38 + Math.random() * 1,
    animal2: 39 + Math.random() * 0.5,
  }));

  const alertHistoryData = [
    { type: 'Fiebre', count: Math.floor(Math.random() * 5) },
    { type: 'Bajo Nivel de Agua', count: Math.floor(Math.random() * 10) },
    { type: 'Falta de Alimentación', count: Math.floor(Math.random() * 3) },
  ];

  useEffect(() => {
    async function fetchData() {
      const envData = await getEnvironmentData();
      const aniData = await getLatestAnimalData();

      setEnvironmentData(envData);
      setAnimalData(aniData);

      // Call the intelligent alerting AI flow
      const alertResult = await analyzeAndAlert({
        historicalAlerts: "No hay alertas recientes.", // Replace with actual historical data
        environmentData: envData,
        animalData: aniData
      });
      setAlerts(alertResult.alerts);
    }

    fetchData();
  }, []);

  const handleAction = (actionName: string) => {
    toast({
      title: "¡Acción Desencadenada!",
      description: `Has desencadenado ${actionName}.`,
    })
  };

  const openAnimalDetails = (animal: AnimalData) => {
    setSelectedAnimal(animal);
  };

  const closeAnimalDetails = () => {
    setSelectedAnimal(null);
  };

  const handleAnimalSelection = (code: string) => {
    setSelectedAnimalCode(code);
  };

  const currentDateTime = new Date();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return statusColors.normal;
      case 'warning':
        return statusColors.warning;
      case 'enfermo':
        return statusColors.critical;
      default:
        return statusColors.normal;
    }
  };

  const clearAlert = (index: number) => {
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    setAlerts(newAlerts);
  };

  return (
    <>
      <div className="container mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AgroSmart AI Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Última actualización: {formatDate(currentDateTime)}
          </p>
        </header>

        {alerts.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>¡Alerta Crítica!</AlertTitle>
            <AlertDescription>
              <ScrollArea className="max-h-80">
                <ul>
                  {alerts.map((alert, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {alert}
                      <Button variant="ghost" size="sm" onClick={() => clearAlert(index)}>
                        Descartar
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Environmental Data */}
          <Card className={getStatusColor('normal')}>
            <CardHeader>
              <CardTitle>Datos Ambientales</CardTitle>
              <CardDescription>Métricas en tiempo real</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><Thermometer className="inline-block h-4 w-4 mr-2" /> Temperatura: {environmentData?.temperatureCelsius}°C</p>
              <p><AirHumidity className="inline-block h-4 w-4 mr-2" /> Humedad: {environmentData?.humidityPercentage}%</p>
              <p><Sun className="inline-block h-4 w-4 mr-2" /> Luz Solar: {environmentData?.sunlightLevel}</p>
              <p><Droplet className="inline-block h-4 w-4 mr-2" /> Nivel de Agua: {environmentData?.waterLevel}</p>
              <p className="text-sm text-muted-foreground">Última actualización: {formatDate(currentDateTime)}</p>
            </CardContent>
          </Card>

          {/* Animal Monitoring */}
          <Card className={animalData?.healthStatus ? getStatusColor(animalData.healthStatus) : statusColors.normal}>
            <CardHeader>
              <CardTitle>Monitoreo Animal</CardTitle>
              <CardDescription>Datos RFID más recientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><Cat className="inline-block h-4 w-4 mr-2" /> Código: {animalData?.code}</p>
              <p><Thermometer className="inline-block h-4 w-4 mr-2" /> Temperatura: {animalData?.temperature}°C</p>
              <p>Estado: {animalData?.healthStatus}</p>
              <p>Última Alimentación: {animalData?.lastFeedingTime}</p>
               <p className="text-sm text-muted-foreground">Última actualización: {formatDate(currentDateTime)}</p>
              <Button variant="secondary" size="sm" onClick={() => openAnimalDetails(animalData)}>
                Ver Detalles
              </Button>
            </CardContent>
          </Card>

          {/* Alerts Display */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Alertas</CardTitle>
              <CardDescription>Alertas recientes para conocimiento rápido</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-80">
                {alerts.length > 0 ? (
                  <div className="space-y-2">
                    {alerts.map((alert, index) => (
                      <Alert key={index}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>¡Alerta!</AlertTitle>
                        <AlertDescription>{alert}</AlertDescription>
                        <Button variant="ghost" size="sm" onClick={() => clearAlert(index)}>
                          Descartar
                        </Button>
                      </Alert>
                    ))}
                  </div>
                ) : (
                  <p>No hay alertas recientes.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <Button onClick={() => handleAction("activar riego")}>Activar Riego</Button>
          <Button onClick={() => handleAction("alimentar animal manualmente")}>Alimentar Animal</Button>
          <Button onClick={() => handleAction("revisar historial de eventos")}>Historial de Eventos</Button>
        </div>

        {/* Historical Graphs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Gráficos Históricos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ambient Temperature */}
            <Card>
              <CardHeader>
                <CardTitle>Temperatura Ambiental (°C)</CardTitle>
                <CardDescription>Variación histórica de temperatura</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="°C" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Soil Moisture */}
            <Card>
              <CardHeader>
                <CardTitle>Humedad del Suelo (%)</CardTitle>
                <CardDescription>Niveles históricos de humedad del suelo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={soilMoistureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="moisture" stroke="#82ca9d" fill="#82ca9d" name="%" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Animal Temperature */}
            <Card>
              <CardHeader>
                <CardTitle>Temperatura Corporal por Animal</CardTitle>
                <CardDescription>Variación de temperatura por animal</CardDescription>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Seleccionar Animal
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem onClick={() => handleAnimalSelection("animal1")}>Animal 1</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAnimalSelection("animal2")}>Animal 2</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={animalTemperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedAnimalCode === "animal1" && (
                      <Line type="monotone" dataKey="animal1" stroke="#ff7300" name="Animal 1 (°C)" />
                    )}
                    {selectedAnimalCode === "animal2" && (
                      <Line type="monotone" dataKey="animal2" stroke="#387908" name="Animal 2 (°C)" />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Alert History */}
            <Card>
              <CardHeader>
                <CardTitle>Historial de Alertas (Últimas 24 Horas)</CardTitle>
                <CardDescription>Número de alertas por tipo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={alertHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#a855f7" name="Alertas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>
          <Dialog open={selectedAnimal !== null} onOpenChange={closeAnimalDetails}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalles del Animal</DialogTitle>
                <DialogDescription>
                  Información detallada del animal seleccionado.
                </DialogDescription>
              </DialogHeader>
              {selectedAnimal && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="name"
                      className="text-right text-sm font-medium leading-none text-right"
                    >
                      Código
                    </label>
                    <p>{selectedAnimal.code}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="code"
                      className="text-right text-sm font-medium leading-none text-right"
                    >
                      Temperatura
                    </label>
                    <p>{selectedAnimal.temperature}°C</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="username"
                      className="text-right text-sm font-medium leading-none text-right"
                    >
                      Estado de Salud
                    </label>
                    <p>{selectedAnimal.healthStatus}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="username"
                      className="text-right text-sm font-medium leading-none text-right"
                    >
                      Última Alimentación
                    </label>
                    <p>{selectedAnimal.lastFeedingTime}</p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
      </div>
    </>
  );
}
