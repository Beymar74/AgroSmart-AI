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

export default function Home() {
  const [environmentData, setEnvironmentData] = useState(null);
  const [animalData, setAnimalData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const { toast } = useToast();

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
    </div>
  );
}
