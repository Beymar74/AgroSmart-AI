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
import { Thermometer, CloudRain, Sun, Droplet, Cat, AlertTriangle, Cloud } from 'lucide-react';
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
    
      
        
          
            
              
                
                  AgroSmart AI Dashboard
                
              
            
          
          
            Última actualización: {formatDate(currentDateTime)}
          
        

        {alerts.length > 0 && (
          
            
              
                ¡Alerta Crítica!
              
              
                
                  
                    {alerts.map((alert, index) => (
                      
                        {alert}
                        
                          Descartar
                        
                      
                    ))}
                  
                
              
            
          
        )}

        
          {/* Environmental Data */}
          
            
              
                Datos Ambientales
              
              
                Métricas en tiempo real
              
            
            
              
                 Temperatura: {environmentData?.temperatureCelsius}°C
                
                 Humedad: {environmentData?.humidityPercentage}%
                
                 Luz Solar: {environmentData?.sunlightLevel}
                
                 Nivel de Agua: {environmentData?.waterLevel}
                
                Última actualización: {formatDate(currentDateTime)}
              
            
          

          {/* Animal Monitoring */}
          
            
              
                Monitoreo Animal
              
              
                Datos RFID más recientes
              
            
            
              
                 Código: {animalData?.code}
                
                 Temperatura: {animalData?.temperature}°C
                
                Estado: {animalData?.healthStatus}
                
                Última Alimentación: {animalData?.lastFeedingTime}
                
                Última actualización: {formatDate(currentDateTime)}
                
                  Ver Detalles
                
              
            
          

          {/* Alerts Display */}
          
            
              
                Alertas
              
              
                Alertas recientes para conocimiento rápido
              
            
            
              
                
                  {alerts.length > 0 ? (
                    
                      {alerts.map((alert, index) => (
                        
                          
                            ¡Alerta!
                          
                          {alert}
                          
                            Descartar
                          
                        
                      ))}
                    
                  ) : (
                    
                      No hay alertas recientes.
                    
                  )}
                
              
            
          
        

        {/* Quick Actions */}
        
          
            Activar Riego
          
          
            Alimentar Animal
          
          
            Historial de Eventos
          
        

        {/* Historical Graphs */}
        
          
            Gráficos Históricos
            
          
          
            
              {/* Ambient Temperature */}
              
                
                  Temperatura Ambiental (°C)
                  
                  
                    Variación histórica de temperatura
                  
                
                
                  
                    
                      
                        
                          
                          
                          
                        
                      
                    
                  
                
              
            

            {/* Soil Moisture */}
            
              
                
                  Humedad del Suelo (%)
                  
                  
                    Niveles históricos de humedad del suelo
                  
                
                
                  
                    
                      
                        
                          
                          
                          
                        
                      
                    
                  
                
              
            

            {/* Animal Temperature */}
            
              
                
                  Temperatura Corporal por Animal
                  
                  
                    Variación de temperatura por animal
                  
                   
                      
                        
                          Seleccionar Animal
                        
                      
                      
                        
                          Animal 1
                        
                        
                          Animal 2
                        
                      
                    
                  
                
                
                  
                    
                      
                        
                          
                          
                          
                        
                      
                    
                  
                
              
            

            {/* Alert History */}
            
              
                
                  Historial de Alertas (Últimas 24 Horas)
                  
                  
                    Número de alertas por tipo
                  
                
                
                  
                    
                      
                        
                          
                          
                          
                        
                      
                    
                  
                
              
            
          
        
          
            
              
                
                  Detalles del Animal
                  
                  
                    Información detallada del animal seleccionado.
                  
                
                {selectedAnimal && (
                  
                    
                      
                        
                          Código
                        
                        {selectedAnimal.code}
                      
                      
                        
                          Temperatura
                        
                        {selectedAnimal.temperature}°C
                      
                      
                        
                          Estado de Salud
                        
                        {selectedAnimal.healthStatus}
                      
                      
                        
                          Última Alimentación
                        
                        {selectedAnimal.lastFeedingTime}
                      
                    
                  
                )}
              
            
          
        
      
    
  );
}
