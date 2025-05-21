export function analyzeLocally({
    environmentData,
    animalData,
  }: {
    environmentData: { temperatura: number | null; luz: number | null; humedadSuelo: number | null };
    animalData: any;
  }) {
    const alerts: string[] = [];
  
    // Ambiente
    if (environmentData.temperatura !== null && environmentData.temperatura > 30) {
      alerts.push("⚠️ Temperatura ambiental elevada");
    }
    if (environmentData.humedadSuelo !== null && environmentData.humedadSuelo < 20) {
      alerts.push("🚱 Humedad del suelo baja, posible riego necesario");
    }
    if (environmentData.luz !== null && environmentData.luz < 100) {
      alerts.push("🌘 Nivel de luz bajo");
    }
  
    // Animal
    if (animalData?.estado === "enfermo") {
      alerts.push("🚨 El animal está en estado crítico (enfermo)");
    }
    if (animalData?.temperaturaIR > 39) {
      alerts.push("🌡️ Temperatura corporal elevada");
    }
  
    return { alerts };
  }
  