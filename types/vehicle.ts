export interface VehicleEngine {
  type: string;
  displacement: string;
  cylinders: number | null;
  horsepower: number | null;
  torque_nm: number | null;
}

export interface VehicleRentalInfo {
  category: string;
  daily_price: number;
  currency: string;
  availability: boolean;
  minimum_driver_age: number;
  deposit_required: boolean;
}

export interface VehicleImageInfo {
  url: string;
  format: string;
  transparent_background: boolean;
  source_type: string;
  source: string;
}

export interface StructuredVehicle {
  id: string;
  make: string;
  model: string;
  generation: string;
  year: number;
  trim: string;
  body_type: string;
  vehicle_class: string;
  fuel_type: string;
  transmission: string;
  drivetrain: string;
  engine: VehicleEngine;
  seating_capacity: number;
  doors: number;
  color: string;
  country_of_origin: string;
  production_start: number;
  production_end: number | null;
  is_electric: boolean;
  is_hybrid: boolean;
  rental_category: string;
  daily_rental_price: number | null;
  availability: boolean;
  rental: VehicleRentalInfo;
  image: VehicleImageInfo;
}

export interface CatalogFilterOptions {
  searchQuery?: string;
  make?: string;
  model?: string;
  year?: number | string;
  generation?: string;
  bodyType?: string;
  vehicleClass?: string;
  fuelType?: string;
  transmission?: string;
  drivetrain?: string;
  seatingCapacity?: number | string;
  minPrice?: number;
  maxPrice?: number;
  isElectric?: boolean;
  isHybrid?: boolean;
  availabilityOnly?: boolean;
}
