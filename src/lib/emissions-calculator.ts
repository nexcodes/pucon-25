import type {
  Activity,
  EmissionResult,
  TransportData,
  ElectricityData,
  GasData,
  FoodData,
  TreeData,
} from "@/types";

// Emission factors
const FUEL_FACTORS = {
  petrol: 2.31, // kg CO2 per liter
  diesel: 2.68, // kg CO2 per liter
};

const ELECTRICITY_FACTOR = 0.5; // kg CO2 per kWh

const GAS_FACTORS = {
  m3: 1.9, // kg CO2 per cubic meter
  therm: 5.3, // kg CO2 per therm
};

const FOOD_FACTORS = {
  beef: 0.025, // kg CO2 per gram
  chicken: 0.0069, // kg CO2 per gram
  vegetables: 0.002, // kg CO2 per gram
  lentils: 0.0009, // kg CO2 per gram
};

const TREE_FACTOR = -1.75; // kg CO2 absorbed per tree per month

export function calculateEmissions(activity: Activity): EmissionResult {
  const activityId = activity.date.getTime();

  switch (activity.type) {
    case "transport":
      return calculateTransportEmissions(
        activityId,
        activity.data as TransportData
      );
    case "electricity":
      return calculateElectricityEmissions(
        activityId,
        activity.data as ElectricityData
      );
    case "gas":
      return calculateGasEmissions(activityId, activity.data as GasData);
    case "food":
      return calculateFoodEmissions(activityId, activity.data as FoodData);
    case "tree":
      return calculateTreeEmissions(activityId, activity.data as TreeData);
    default:
      return {
        activityId,
        activityType: "unknown",
        emissions: 0,
        details: "Unknown activity type",
      };
  }
}

function calculateTransportEmissions(
  activityId: number,
  data: TransportData
): EmissionResult {
  const { distance, efficiency, fuelType } = data;
  const liters = distance / efficiency;
  const emissions = liters * FUEL_FACTORS[fuelType];

  return {
    activityId,
    activityType: "transport",
    emissions,
    details: `${distance} km traveled using ${fuelType} (${efficiency} km/l)`,
  };
}

function calculateElectricityEmissions(
  activityId: number,
  data: ElectricityData
): EmissionResult {
  const { kWh } = data;
  const emissions = kWh * ELECTRICITY_FACTOR;

  return {
    activityId,
    activityType: "electricity",
    emissions,
    details: `${kWh} kWh of electricity consumed`,
  };
}

function calculateGasEmissions(
  activityId: number,
  data: GasData
): EmissionResult {
  const { amount, unit } = data;
  const emissions = amount * GAS_FACTORS[unit];

  return {
    activityId,
    activityType: "gas",
    emissions,
    details: `${amount} ${unit} of gas consumed`,
  };
}

function calculateFoodEmissions(
  activityId: number,
  data: FoodData
): EmissionResult {
  const { foodType, grams } = data;
  const emissions = grams * FOOD_FACTORS[foodType];

  return {
    activityId,
    activityType: "food",
    emissions,
    details: `${grams} grams of ${foodType} consumed`,
  };
}

function calculateTreeEmissions(
  activityId: number,
  data: TreeData
): EmissionResult {
  const { trees } = data;
  const emissions = trees * TREE_FACTOR;

  return {
    activityId,
    activityType: "tree",
    emissions,
    details: `${trees} trees planted`,
  };
}
