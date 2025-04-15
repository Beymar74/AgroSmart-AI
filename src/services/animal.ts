/**
 * Represents animal data including code, temperature, health status and last feeding time.
 */
export interface AnimalData {
  /**
   * The code or name of the animal.
   */
  code: string;
  /**
   * The body temperature of the animal.
   */
  temperature: number;
  /**
   * The health status of the animal (e.g., normal/sick).
   */
  healthStatus: string;
  /**
   * The last feeding time of the animal.
   */
  lastFeedingTime: string;
}

/**
 * Asynchronously retrieves the latest animal data detected via RFID.
 *
 * @returns A promise that resolves to an AnimalData object.
 */
export async function getLatestAnimalData(): Promise<AnimalData> {
  // TODO: Implement this by calling an API.
  return {
    code: 'Cow001',
    temperature: 38.5,
    healthStatus: 'normal',
    lastFeedingTime: '08:00',
  };
}
