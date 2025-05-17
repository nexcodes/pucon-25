export interface TransportData {
  distance: number;
  efficiency: number;
  fuelType: "petrol" | "diesel";
}

export interface ElectricityData {
  kWh: number;
}

export interface GasData {
  amount: number;
  unit: "m3" | "therm";
}

export interface FoodData {
  foodType: "beef" | "chicken" | "vegetables" | "lentils";
  grams: number;
}

export interface TreeData {
  trees: number;
}

export type ActivityData =
  | TransportData
  | ElectricityData
  | GasData
  | FoodData
  | TreeData;

export interface Activity {
  type: "transport" | "electricity" | "gas" | "food" | "tree";
  data: ActivityData;
  date: Date;
}

export interface EmissionResult {
  activityId: number;
  activityType: string;
  emissions: number; // kg of CO2
  details: string;
}
