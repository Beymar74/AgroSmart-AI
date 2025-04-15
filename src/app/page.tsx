"use client";

import { useEffect, useState } from 'react';
import { getEnvironmentData } from '@/services/environment';
import { getLatestAnimalData } from '@/services/animal';
import { analyzeAndAlert } from '@/ai/flows/intelligent-alerting';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Home() {
  const [environmentData, setEnvironmentData] = useState(null);
  const [animalData, setAnimalData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const { toast } = useToast();

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
    { type: 'Fever', count: Math.floor(Math.random() * 5) },
    { type: 'Low Water', count: Math.floor(Math.random() * 10) },
    { type: 'Missed Feeding', count: Math.floor(Math.random() * 3) },
  ];

  useEffect(() => {
    async function fetchData() {
      const envData = await getEnvironmentData();
      const aniData = await getLatestAnimalData();

      setEnvironmentData(envData);
      setAnimalData(aniData);

      // Call the intelligent alerting AI flow
      const alertResult = await analyzeAndAlert({
        historicalAlerts: "No recent alerts.", // Replace with actual historical data
        environmentData: envData,
        animalData: aniData
      });
      setAlerts(alertResult.alerts);
    }

    fetchData();
  }, []);

  const handleAction = (actionName: string) => {
    toast({
      title: "Action Triggered!",
      description: `You have triggered ${actionName}.`,
    })
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">AgroSmart AI Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Environmental Data */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Data</CardTitle>
            <CardDescription>Real-time metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Temperature: {environmentData?.temperatureCelsius}°C</p>
            <p>Humidity: {environmentData?.humidityPercentage}%</p>
            <p>Sunlight: {environmentData?.sunlightLevel}</p>
            <p>Water Level: {environmentData?.waterLevel}</p>
          </CardContent>
        </Card>

        {/* Animal Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>Animal Monitoring</CardTitle>
            <CardDescription>Latest RFID data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Code: {animalData?.code}</p>
            <p>Temperature: {animalData?.temperature}°C</p>
            <p>Health: {animalData?.healthStatus}</p>
            <p>Last Fed: {animalData?.lastFeedingTime}</p>
          </CardContent>
        </Card>

        {/* Alerts Display */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Recent alerts for quick awareness</CardDescription>
          </CardHeader>
          <CardContent>
              {alerts.length > 0 ? (
                <div className="space-y-2">
                  {alerts.map((alert, index) => (
                    <Alert key={index}>
                      <Icons.warning className="h-4 w-4" />
                      <AlertTitle>Alert!</AlertTitle>
                      <AlertDescription>{alert}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              ) : (
                <p>No recent alerts.</p>
              )}
            </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4">
        <Button onClick={() => handleAction("activate irrigation")}>Activate Irrigation</Button>
        <Button onClick={() => handleAction("special feed")}>Special Feed</Button>
        <Button onClick={() => handleAction("force temperature read")}>Force Temp Read</Button>
      </div>

      {/* Historical Graphs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Historical Graphs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ambient Temperature */}
          <Card>
            <CardHeader>
              <CardTitle>Ambient Temperature (°C)</CardTitle>
              <CardDescription>Historical temperature variation</CardDescription>
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
              <CardTitle>Soil Moisture (%)</CardTitle>
              <CardDescription>Historical soil moisture levels</CardDescription>
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
              <CardTitle>Body Temperature per Animal</CardTitle>
              <CardDescription>Temperature variation per animal</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={animalTemperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="animal1" stroke="#ff7300" name="Animal 1 (°C)" />
                  <Line type="monotone" dataKey="animal2" stroke="#387908" name="Animal 2 (°C)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Alert History */}
          <Card>
            <CardHeader>
              <CardTitle>Alert History (Last 24 Hours)</CardTitle>
              <CardDescription>Number of alerts by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={alertHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#a855f7" name="Alerts" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
