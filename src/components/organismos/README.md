# 🧩 Componentes - Organismos (AgroSmart AI)

Esta carpeta contiene componentes de nivel **organismo** según la metodología de Atomic Design. Agrupan componentes más pequeños (átomos y moléculas) para formar partes funcionales completas del dashboard AgroSmart AI.

---

## 📚 Lista de Componentes

| Componente                        | Descripción                                                                 | Usa Firebase |
|----------------------------------|-----------------------------------------------------------------------------|--------------|
| `ControlesManuales.tsx`          | Controles para encender, apagar o activar el modo automático de actuadores  | ✅ Sí         |
| `GraficoAgua.tsx`                | Gráfico que representa el nivel de agua del tanque (sensor ultrasónico)     | ✅ Sí         |
| `GraficoCircular.tsx`            | Gráfico circular genérico (uso por definir)                                 | ❓ Por confirmar |
| `GraficoCircularLuz.tsx`         | Gráfico circular específico para intensidad de luz solar                     | ✅ Sí         |
| `GraficoHistorialAlertas.tsx`    | Gráfico histórico de alertas generadas por el sistema                        | ✅ Sí         |
| `GraficoHumedadSuelo.tsx`        | Muestra la humedad del suelo mediante el sensor FC-28                        | ✅ Sí         |
| `GraficoLuz.tsx`                 | Muestra en tiempo real la luz solar (sensor LDR)                             | ✅ Sí         |
| `GraficoLuzSolar.tsx`            | Historial de luz solar                                                       | ✅ Sí         |
| `GraficoTemperatura.tsx`         | Temperatura ambiental en tiempo real (sensor DHT11)                          | ✅ Sí         |
| `GraficoTemperaturaAnimal.tsx`   | Temperatura corporal del animal (sensor MLX90614)                            | ✅ Sí         |
| `TarjetaAlertas.tsx`             | Muestra errores y alertas del nodo `/alertas/error`                          | ✅ Sí         |
| `TarjetaAmbiental.tsx`           | Tarjeta visual con temperatura y humedad general                             | ✅ Sí         |
| `TarjetaAnimal.tsx`              | Muestra información relacionada a salud y control del animal                 | ✅ Sí         |
| `TarjetaComida.tsx`              | Visualiza el estado del alimentador (activo, enfermo, especial)              | ✅ Sí         |
| `TarjetaTanque.tsx`              | Tarjeta visual del tanque de agua                                            | ✅ Sí         |

---

## 🔄 Notas

- Todos los componentes están diseñados para integrarse con el dashboard principal.
- Se recomienda seguir el patrón de **props bien tipadas** y evitar repetir lógica que puede unificarse en servicios.
- Para visualizar correctamente los datos, asegúrate de que las rutas en Firebase estén bien sincronizadas.

---

👨‍💻 *Última actualización por el equipo de desarrollo de AgroSmart AI.*
