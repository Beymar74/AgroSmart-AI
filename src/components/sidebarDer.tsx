"use client";

import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getLatestAnimalData } from "@/services/animal";
import { analyzeAndAlert } from "@/ai/flows/intelligent-alerting";
import { 
  Bot, 
  Droplets, 
  Fan, 
  Utensils, 
  X, 
  Bell, 
  Thermometer, 
  Sun, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Zap
} from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyBBoy3db8ZR5zglMwm0mwt8G4-rNRbaQ6w",
  authDomain: "agrosmart-ai-9ee95.firebaseapp.com",
  databaseURL: "https://agrosmart-ai-9ee95-default-rtdb.firebaseio.com",
  projectId: "agrosmart-ai-9ee95",
  storageBucket: "agrosmart-ai-9ee95.appspot.com",
  messagingSenderId: "854583309870",
  appId: "1:854583309870:web:50d37190c1ba4355e5d1bf"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const SidebarDer: React.FC = () => {
  const [temp, setTemp] = useState<number | null>(null);
  const [luz, setLuz] = useState<number | null>(null);
  const [humSuelo, setHumSuelo] = useState<number | null>(null);
  const [tempAnimal, setTempAnimal] = useState<number | null>(null);
  const [animalData, setAnimalData] = useState<any>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para los actuadores
  const [actuatorStates, setActuatorStates] = useState({
    riego: 'auto',
    alimentador: 'off',
    ventilador: 'auto'
  });

  const actualizarAlertas = async (envData: any, aniData: any) => {
    try {
      const result = await analyzeAndAlert({
        historicalAlerts: "No hay alertas recientes.",
        environmentData: envData,
        animalData: aniData
      });
      setAlerts(result.alerts || []);
    } catch (error) {
      console.error("Error al actualizar alertas:", error);
    }
  };

  useEffect(() => {
    const unsubscribes = [
      onValue(ref(db, "ambiente/temperatura"), snap => setTemp(snap.val())),
      onValue(ref(db, "ambiente/luz"), snap => setLuz(snap.val())),
      onValue(ref(db, "ambiente/humedad_suelo"), snap => setHumSuelo(snap.val())),
      onValue(ref(db, "ambiente/temperatura_animal"), snap => setTempAnimal(snap.val()))
    ];

    (async () => {
      try {
        const ani = await getLatestAnimalData();
        setAnimalData(ani);
        await actualizarAlertas(
          { temperatura: temp, luz, humedadSuelo: humSuelo },
          ani
        );
      } catch (error) {
        console.error("Error al obtener datos del animal:", error);
      } finally {
        setLoading(false);
      }
    })();

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [temp, luz, humSuelo]);

  const handleAccion = async (accion: string) => {
    try {
      const [estado, dispositivo] = accion.split("_");
      const valor = {
        "activar": 1,
        "desactivar": 0,
        "auto": 2
      }[estado];

      await set(ref(db, `actuadores/${dispositivo}`), valor);
      
      // Actualizar estado local
      setActuatorStates(prev => ({
        ...prev,
        [dispositivo]: estado === 'activar' ? 'on' : estado === 'desactivar' ? 'off' : 'auto'
      }));
    } catch (error) {
      console.error("Error al actualizar actuador:", error);
    }
  };

  const getStateColor = (state: string) => {
    switch(state) {
      case 'on': return 'bg-green-500 text-white';
      case 'auto': return 'bg-blue-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getStateIcon = (state: string) => {
    switch(state) {
      case 'on': return <CheckCircle className="w-4 h-4" />;
      case 'auto': return <Bot className="w-4 h-4" />;
      default: return <X className="w-4 h-4" />;
    }
  };

  const renderControlGroup = (
    titulo: string,
    dispositivo: string,
    icono: React.ReactNode,
    color: string
  ) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icono}
          <h4 className="font-semibold text-gray-900">{titulo}</h4>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStateColor(actuatorStates[dispositivo])}`}>
          {getStateIcon(actuatorStates[dispositivo])}
          <span className="capitalize">{actuatorStates[dispositivo] === 'on' ? 'Encendido' : actuatorStates[dispositivo] === 'auto' ? 'Auto' : 'Apagado'}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleAccion(`activar_${dispositivo}`)}
          className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          ON
        </button>
        <button
          onClick={() => handleAccion(`desactivar_${dispositivo}`)}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <X className="w-3 h-3 mr-1" />
          OFF
        </button>
        <button
          onClick={() => handleAccion(`auto_${dispositivo}`)}
          className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center"
        >
          <Bot className="w-3 h-3 mr-1" />
          AUTO
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <aside className="w-full h-full bg-gray-50 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </aside>
    );
  }

  return (
    <aside className="w-full h-screen bg-gray-50 p-4 overflow-y-auto space-y-4">
      {/* Alertas y Notificaciones */}
      <section className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-gray-600" />
            Alertas
          </h3>
          {alerts.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {alerts.length}
            </span>
          )}
        </div>
        
        {alerts.length > 0 ? (
          <div className="space-y-2">
            {alerts.slice(0, 3).map((alert, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800">{alert}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No hay alertas recientes</p>
            <p className="text-xs text-gray-500">Sistema funcionando correctamente</p>
          </div>
        )}
      </section>

      {/* Datos Ambientales */}
      <section className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center">
          <Thermometer className="w-5 h-5 mr-2 text-gray-600" />
          Datos Ambientales
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-600">Temperatura</span>
            </div>
            <span className="font-semibold text-gray-900">{temp ?? "N/A"}°C</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Luz</span>
            </div>
            <span className="font-semibold text-gray-900">{luz ?? "N/A"}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">Humedad del Suelo</span>
            </div>
            <span className="font-semibold text-gray-900">{humSuelo ?? "N/A"}</span>
          </div>
        </div>
      </section>

      {/* Monitoreo Animal */}
      <section className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-gray-600" />
          Monitoreo Animal
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Código</span>
            <span className="font-semibold text-gray-900">{animalData?.codigo ?? "COW001"}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Temp. Animal (IR)</span>
            <span className="font-semibold text-gray-900">{tempAnimal ?? "N/A"}°C</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estado</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              (animalData?.estado ?? "normal") === "normal" 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {animalData?.estado ?? "normal"}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Última Alimentación</span>
            <span className="font-semibold text-gray-900">{animalData?.ultimaAlimentacion ?? "08:00"}</span>
          </div>
        </div>
      </section>

      {/* Controles Rápidos */}
      <section className="space-y-3">
        <h3 className="font-bold text-lg text-gray-900 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-gray-600" />
          Controles Rápidos
        </h3>
        
        {renderControlGroup(
          "Sistema de Riego",
          "riego",
          <Droplets className="w-5 h-5 text-blue-500" />,
          "blue"
        )}
        
        {renderControlGroup(
          "Alimentador",
          "alimentador",
          <Utensils className="w-5 h-5 text-green-500" />,
          "green"
        )}
        
        {renderControlGroup(
          "Ventilador",
          "ventilador",
          <Fan className="w-5 h-5 text-purple-500" />,
          "purple"
        )}
      </section>
    </aside>
  );
};

export default SidebarDer;