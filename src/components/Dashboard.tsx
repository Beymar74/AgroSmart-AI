"use client";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { 
  Thermometer, 
  Droplets, 
  Sun, 
  Gauge, 
  Activity, 
  TrendingUp,
  BarChart3,
  LineChart,
  Utensils,
  AlertTriangle,
  Bell,
  Fan,
  Bot
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

// Componente de Tarjeta de Métrica
const MetricCard = ({ title, value, unit, icon: Icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600"
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">{value ?? "N/A"}</p>
            {unit && <p className="text-sm text-gray-500 ml-1">{unit}</p>}
          </div>
          {trend && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// Componente de Gráfico Simple
const SimpleChart = ({ title, data, type = "line", color = "blue" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            {type === "line" ? <LineChart className="w-5 h-5 text-gray-400" /> : <BarChart3 className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const colorClasses = {
    blue: "from-blue-500 to-blue-400",
    green: "from-green-500 to-green-400",
    orange: "from-orange-500 to-orange-400",
    red: "from-red-500 to-red-400",
    purple: "from-purple-500 to-purple-400"
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          {type === "line" ? <LineChart className="w-5 h-5 text-gray-400" /> : <BarChart3 className="w-5 h-5 text-gray-400" />}
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '200px' }}>
              <div 
                className={`absolute bottom-0 w-full bg-gradient-to-t ${colorClasses[color]} rounded-t-lg transition-all duration-300`}
                style={{ height: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente de Nivel de Tanque
const TankLevel = ({ title, level, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-400",
    green: "from-green-500 to-green-400",
    orange: "from-orange-500 to-orange-400"
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-48 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`absolute bottom-0 w-full bg-gradient-to-t ${colorClasses[color]} transition-all duration-500`}
            style={{ height: `${level || 0}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white drop-shadow-lg">{level || 0}%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Nivel actual</p>
        <p className={`text-lg font-semibold ${(level || 0) > 20 ? 'text-green-600' : 'text-red-600'}`}>
          {(level || 0) > 20 ? 'Normal' : 'Bajo'}
        </p>
      </div>
    </div>
  );
};

// Componente de Alertas
const AlertsPanel = ({ alerts = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Alertas y Notificaciones</h3>
        <Bell className="w-5 h-5 text-gray-600" />
      </div>
      
      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">{alert.title}</p>
                <p className="text-xs text-red-600">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Activity className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">No hay alertas recientes</p>
          <p className="text-xs text-gray-500">Sistema funcionando correctamente</p>
        </div>
      )}
    </div>
  );
};

// Componente de Controles Rápidos
const QuickControls = () => {
  const [states, setStates] = useState({
    riego: 'auto',
    alimentador: 'off',
    ventilador: 'auto'
  });

  const controls = [
    { id: 'riego', label: 'Sistema de Riego', icon: Droplets, color: 'blue' },
    { id: 'alimentador', label: 'Alimentador', icon: Utensils, color: 'green' },
    { id: 'ventilador', label: 'Ventilador', icon: Fan, color: 'purple' }
  ];

  const handleToggle = (id) => {
    setStates(prev => ({
      ...prev,
      [id]: prev[id] === 'off' ? 'on' : prev[id] === 'on' ? 'auto' : 'off'
    }));
  };

  const getStateColor = (state) => {
    switch(state) {
      case 'on': return 'bg-green-500 text-white';
      case 'auto': return 'bg-blue-500 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getStateText = (state) => {
    switch(state) {
      case 'on': return 'Encendido';
      case 'auto': return 'Automático';
      default: return 'Apagado';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Controles Rápidos</h3>
        <Bot className="w-5 h-5 text-gray-600" />
      </div>
      
      <div className="space-y-4">
        {controls.map((control) => (
          <div key={control.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <control.icon className="w-5 h-5 text-gray-600 mr-3" />
              <span className="font-medium text-gray-900">{control.label}</span>
            </div>
            <button
              onClick={() => handleToggle(control.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${getStateColor(states[control.id])}`}
            >
              {getStateText(states[control.id])}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente Principal del Dashboard
const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    temperature: null,
    humidity: null,
    soilMoisture: null,
    pressure: null,
    animalTemp: null,
    light: null,
    waterLevel: null,
    foodLevel: null
  });

  const [historicalData, setHistoricalData] = useState({
    temperature: [],
    humidity: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        // Obtener datos actuales de sensores
        const sensorsRef = ref(db, 'sensors');
        onValue(sensorsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setMetrics(prev => ({
              ...prev,
              temperature: data.temperature,
              humidity: data.humidity,
              soilMoisture: data.soilMoisture,
              pressure: data.pressure,
              animalTemp: data.animalTemp,
              light: data.light
            }));
          }
          setLoading(false);
        }, (error) => {
          console.error("Error al obtener datos de sensores:", error);
          setError("Error al conectar con la base de datos");
          setLoading(false);
        });

        // Obtener niveles de tanques
        const tanksRef = ref(db, 'tanks');
        onValue(tanksRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setMetrics(prev => ({
              ...prev,
              waterLevel: data.waterLevel,
              foodLevel: data.foodLevel
            }));
          }
        });

        // Simular datos históricos (reemplazar con datos reales de Firebase)
        setHistoricalData({
          temperature: [
            { label: '06:00', value: 18 },
            { label: '08:00', value: 20 },
            { label: '10:00', value: 22 },
            { label: '12:00', value: 25 },
            { label: '14:00', value: 27 },
            { label: '16:00', value: 24 },
            { label: '18:00', value: 21 }
          ],
          humidity: [
            { label: 'Lun', value: 65 },
            { label: 'Mar', value: 70 },
            { label: 'Mié', value: 60 },
            { label: 'Jue', value: 75 },
            { label: 'Vie', value: 68 },
            { label: 'Sáb', value: 72 },
            { label: 'Dom', value: 69 }
          ]
        });

      } catch (err) {
        console.error("Error al inicializar Firebase:", err);
        setError("Error al inicializar la conexión");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generar alertas basadas en los datos
  const generateAlerts = () => {
    const alerts = [];
    
    if (metrics.temperature > 28) {
      alerts.push({
        title: 'Temperatura Alta',
        message: `La temperatura ambiental es de ${metrics.temperature}°C`
      });
    }
    
    if (metrics.humidity < 30) {
      alerts.push({
        title: 'Humedad Baja',
        message: `La humedad está en ${metrics.humidity}%`
      });
    }
    
    if (metrics.waterLevel < 20) {
      alerts.push({
        title: 'Nivel de Agua Bajo',
        message: `El tanque de agua está al ${metrics.waterLevel}%`
      });
    }

    return alerts;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos del sistema...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Verifica tu conexión a internet</p>
        </div>
      </div>
    );
  }

  const alerts = generateAlerts();

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AgroSmart Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitoreo en tiempo real de tu sistema agrícola</p>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Sistema Activo</span>
            </div>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Temperatura Ambiental"
            value={metrics.temperature?.toFixed(1)}
            unit="°C"
            icon={Thermometer}
            trend="Normal"
            color="orange"
          />
          <MetricCard
            title="Humedad"
            value={metrics.humidity}
            unit="%"
            icon={Droplets}
            trend="Estable"
            color="blue"
          />
          <MetricCard
            title="Luz Ambiental"
            value={metrics.light}
            unit="lux"
            icon={Sun}
            trend="Óptimo"
            color="green"
          />
          <MetricCard
            title="Presión"
            value={metrics.pressure?.toFixed(2)}
            unit="hPa"
            icon={Gauge}
            trend="Estable"
            color="purple"
          />
        </div>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SimpleChart 
            title="Temperatura Ambiental (Últimas 24h)" 
            data={historicalData.temperature} 
            color="orange"
          />
          <SimpleChart 
            title="Humedad del Suelo (Última semana)" 
            data={historicalData.humidity} 
            type="bar" 
            color="blue"
          />
        </div>

        {/* Niveles de tanques y temperatura animal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TankLevel 
            title="Nivel de Agua" 
            level={metrics.waterLevel || 0} 
            icon={Droplets} 
            color="blue" 
          />
          <TankLevel 
            title="Nivel de Comida" 
            level={metrics.foodLevel || 100} 
            icon={Utensils} 
            color="green" 
          />
          <MetricCard
            title="Temp. Animal"
            value={metrics.animalTemp?.toFixed(2)}
            unit="°C"
            icon={Activity}
            trend="Saludable"
            color="red"
          />
        </div>

        {/* Panel de alertas y controles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertsPanel alerts={alerts} />
          <QuickControls />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;