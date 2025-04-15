/**
 * Represents environmental data including temperature, humidity, sunlight, and water level.
 */
export interface EnvironmentData {
  /**
   * The ambient temperature in Celsius.
   */
  temperatureCelsius: number;
  /**
   * The humidity of the air in percentage.
   */
  humidityPercentage: number;
  /**
   * The level of sunlight (e.g., Low, Medium, High).
   */
  sunlightLevel: string;
  /**
   * The water level in the tank, either as a percentage or status (e.g., Full, Low).
   */
  waterLevel: string;
}

/**
 * Asynchronously retrieves real-time environmental data.
 *
 * @returns A promise that resolves to an EnvironmentData object.
 */
export async function getEnvironmentData(): Promise<EnvironmentData> {
  // TODO: Implement this by calling an API.
  return {
    temperatureCelsius: 25,
    humidityPercentage: 60,
    sunlightLevel: 'Medium',
    waterLevel: '80%',
  };
}
