# **App Name**: AgroSmart AI

## Core Features:

- Environmental Dashboard: Display real-time environmental data: temperature, humidity, sunlight, and water level.
- Animal Monitoring: Showcase the latest animal RFID data: code, temperature, health status, and last feeding time.
- Alerts Display: List recent alerts for quick awareness: fever, low water, missed feeding.
- Quick Actions: Include quick action buttons: activate irrigation, special feed, and force temperature read.
- Intelligent Alerting: Use the AI model as a tool to interpret sensor data to automatically trigger alerts based on predefined thresholds and historical data analysis.

## Style Guidelines:

- Primary color: Use a calming green (#4CAF50) to represent growth and health.
- Secondary color: A light grey (#F0F0F0) for backgrounds to ensure readability.
- Accent: Use a vibrant blue (#2196F3) for interactive elements and key data points.
- Clear and readable sans-serif fonts for all text elements.
- Use intuitive and consistent icons from a library like Material Design Icons.
- Card-based layout for data presentation, ensuring a clean and organized look.
- Subtle transitions and animations for interactive elements to enhance user experience.

## Original User Request:
Diseña una pantalla principal (dashboard) web para un sistema llamado AgroSmart AI. Es un sistema de monitoreo inteligente y automatización en granjas con IoT e Inteligencia Artificial. Esta pantalla debe mostrar en tiempo real la información más importante del entorno agrícola y los animales monitoreados.

La interfaz debe incluir:

1. Encabezado con el nombre "AgroSmart AI", la fecha y hora actual.
2. Tarjetas o cuadros con los siguientes datos del entorno:
   - Temperatura ambiental (°C)
   - Humedad del aire (%)
   - Nivel de luz solar (texto o ícono)
   - Nivel del agua en el tanque (porcentaje o estado)
3. Información del último animal detectado mediante RFID:
   - Código o nombre del animal
   - Temperatura corporal
   - Estado de salud (normal/enfermo)
   - Última hora de alimentación
4. Lista de alertas recientes (por ejemplo: fiebre detectada, bajo nivel de agua, falta de alimentación).
5. Botones de acción rápida:
   - Activar riego
   - Activar comida especial
   - Forzar lectura de temperatura
6. Diseño moderno, limpio, con íconos intuitivos y visualmente fácil de entender.
7. Interfaz responsive, pensada para PC, tablet y móviles.

Conecta esta interfaz con Firebase Firestore para obtener los datos en tiempo real.
  