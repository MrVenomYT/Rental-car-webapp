import { CarProps, FilterProps } from "@types";
import { comprehensiveVehicleCatalog, structuredToCarProps } from "../data/vehicleCatalog";

export const sampleCars: CarProps[] = comprehensiveVehicleCatalog.map(structuredToCarProps);

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.delete(type.toLocaleLowerCase());
  return `${window.location.pathname}?${newSearchParams.toString()}`;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Filter directly from verified structured catalog
  const filtered = sampleCars.filter((car) => {
    if (manufacturer && car.make.toLowerCase() !== manufacturer.toLowerCase()) return false;
    if (model && !car.model.toLowerCase().includes(model.toLowerCase())) return false;
    if (fuel && car.fuel_type.toLowerCase() !== fuel.toLowerCase()) return false;
    if (year && car.year !== Number(year)) return false;
    return true;
  });

  return filtered.length > 0 ? filtered.slice(0, limit || 20) : sampleCars.slice(0, limit || 20);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  if (car.image_url) {
    return car.image_url;
  }

  const make = car.make ? car.make.toLowerCase() : "";
  const model = car.model ? car.model.toLowerCase() : "";

  if (make.includes("bmw") || model.includes("m3") || model.includes("3 series")) {
    return "/cars/bmw.png";
  }
  if (make.includes("audi") || model.includes("a4") || model.includes("a6")) {
    return "/cars/audi.png";
  }
  if (make.includes("toyota") || model.includes("corolla") || model.includes("camry") || model.includes("supra")) {
    return "/cars/toyota.png";
  }
  if (make.includes("honda") || model.includes("accord") || model.includes("civic")) {
    return "/cars/honda.png";
  }
  if (make.includes("ford") || model.includes("mustang") || model.includes("explorer")) {
    return "/cars/ford.png";
  }
  if (make.includes("mercedes") || model.includes("benz") || model.includes("c class")) {
    return "/cars/mercedes.png";
  }
  if (make.includes("volkswagen") || model.includes("jetta") || model.includes("golf")) {
    return "/cars/volkswagen.png";
  }
  if (make.includes("jeep") || model.includes("cherokee") || model.includes("wrangler")) {
    return "/cars/jeep.png";
  }
  if (make.includes("tesla") || model.includes("model 3") || model.includes("model y")) {
    return "/cars/tesla.png";
  }
  if (make.includes("hyundai") || model.includes("elantra") || model.includes("sonata")) {
    return "/cars/hyundai.png";
  }
  if (make.includes("subaru") || model.includes("impreza") || model.includes("outback")) {
    return "/cars/subaru.png";
  }

  return "/cars/bmw.png";
};
