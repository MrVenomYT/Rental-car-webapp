import { CarProps, FilterProps } from "@types";

export const sampleCars: CarProps[] = [
  { city_mpg: 23, class: "compact car", combination_mpg: 26, cylinders: 4, displacement: 1.6, drive: "fwd", fuel_type: "gas", highway_mpg: 31, make: "Toyota", model: "Corolla", transmission: "a", year: 2022, price: 22500, location: "New York NY", body_type: "Sedan" },
  { city_mpg: 28, class: "midsize car", combination_mpg: 32, cylinders: 4, displacement: 2.5, drive: "fwd", fuel_type: "gas", highway_mpg: 39, make: "Honda", model: "Accord", transmission: "a", year: 2022, price: 24900, location: "Houston TX", body_type: "Sedan" },
  { city_mpg: 19, class: "fullsize car", combination_mpg: 22, cylinders: 6, displacement: 3.0, drive: "rwd", fuel_type: "gas", highway_mpg: 27, make: "BMW", model: "M3", transmission: "m", year: 2023, price: 68500, location: "Miami FL", body_type: "Coupe" },
  { city_mpg: 25, class: "compact car", combination_mpg: 29, cylinders: 4, displacement: 2.0, drive: "awd", fuel_type: "gas", highway_mpg: 34, make: "Audi", model: "A4", transmission: "a", year: 2021, price: 27800, location: "Los Angeles CA", body_type: "Sedan" },
  { city_mpg: 21, class: "suv", combination_mpg: 24, cylinders: 6, displacement: 3.5, drive: "awd", fuel_type: "gas", highway_mpg: 28, make: "Ford", model: "Explorer", transmission: "a", year: 2022, price: 34200, location: "Chicago IL", body_type: "SUV" },
  { city_mpg: 20, class: "sports car", combination_mpg: 23, cylinders: 8, displacement: 5.0, drive: "rwd", fuel_type: "gas", highway_mpg: 26, make: "Ford", model: "Mustang", transmission: "m", year: 2023, price: 41000, location: "Dallas TX", body_type: "Coupe" },
  { city_mpg: 24, class: "sedan", combination_mpg: 28, cylinders: 4, displacement: 2.0, drive: "fwd", fuel_type: "gas", highway_mpg: 32, make: "Volkswagen", model: "Jetta", transmission: "a", year: 2022, price: 21800, location: "Phoenix AZ", body_type: "Sedan" },
  { city_mpg: 18, class: "suv", combination_mpg: 21, cylinders: 6, displacement: 3.6, drive: "awd", fuel_type: "gas", highway_mpg: 25, make: "Jeep", model: "Grand Cherokee", transmission: "a", year: 2023, price: 43500, location: "Denver CO", body_type: "SUV" },
  { city_mpg: 22, class: "compact car", combination_mpg: 25, cylinders: 4, displacement: 2.0, drive: "awd", fuel_type: "gas", highway_mpg: 30, make: "Subaru", model: "Impreza", transmission: "a", year: 2022, price: 23000, location: "Seattle WA", body_type: "Hatchback" },
  { city_mpg: 27, class: "hybrid", combination_mpg: 30, cylinders: 4, displacement: 1.8, drive: "fwd", fuel_type: "gas", highway_mpg: 35, make: "Hyundai", model: "Elantra", transmission: "a", year: 2023, price: 22900, location: "Atlanta GA", body_type: "Sedan" },
  { city_mpg: 110, class: "electric car", combination_mpg: 112, cylinders: 0, displacement: 0.0, drive: "rwd", fuel_type: "electricity", highway_mpg: 114, make: "Tesla", model: "Model 3", transmission: "a", year: 2022, price: 35900, location: "San Francisco CA", body_type: "Sedan" },
  { city_mpg: 102, class: "electric suv", combination_mpg: 105, cylinders: 0, displacement: 0.0, drive: "awd", fuel_type: "electricity", highway_mpg: 108, make: "Tesla", model: "Model Y", transmission: "a", year: 2023, price: 44900, location: "San Diego CA", body_type: "SUV" }
];

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

  const headers: HeadersInit = {
    "X-RapidAPI-Key":
      process.env.NEXT_PUBLIC_RAPID_API_KEY ||
      "59216e850amsh8a8f4a7c6ace41fp1f41f4jsnf73d3d39951d",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  try {
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer || ""}&year=${year || 2022}&model=${model || ""}&limit=${limit || 10}&fuel_type=${fuel || ""}`,
      { headers }
    );

    const result = await response.json();

    if (Array.isArray(result) && result.length > 0) {
      return result;
    }
  } catch (error) {
    console.warn("RapidAPI fetch failed, falling back to mock cars", error);
  }

  // Fallback filtering on sample dataset
  const filtered = sampleCars.filter((car) => {
    if (manufacturer && car.make.toLowerCase() !== manufacturer.toLowerCase()) return false;
    if (model && !car.model.toLowerCase().includes(model.toLowerCase())) return false;
    if (fuel && car.fuel_type.toLowerCase() !== fuel.toLowerCase()) return false;
    if (year && car.year !== Number(year)) return false;
    return true;
  });

  return filtered.length > 0 ? filtered.slice(0, limit || 10) : sampleCars.slice(0, limit || 10);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const make = car.make ? car.make.toLowerCase() : "";
  const model = car.model ? car.model.toLowerCase() : "";

  if (make.includes("bmw") || model.includes("m3") || model.includes("m5")) {
    return "/cars/bmw.png";
  }
  if (make.includes("audi") || model.includes("a4") || model.includes("a6")) {
    return "/cars/audi.png";
  }
  if (make.includes("toyota") || model.includes("corolla") || model.includes("camry") || model.includes("rav4")) {
    return "/cars/toyota.png";
  }
  if (make.includes("honda") || model.includes("accord") || model.includes("civic")) {
    return "/cars/honda.png";
  }
  if (make.includes("ford") || model.includes("mustang") || model.includes("explorer")) {
    return "/cars/ford.png";
  }
  if (make.includes("mercedes") || model.includes("benz") || model.includes("c-class")) {
    return "/cars/mercedes.png";
  }
  if (make.includes("volkswagen") || model.includes("jetta") || model.includes("golf")) {
    return "/cars/volkswagen.png";
  }
  if (make.includes("jeep") || model.includes("cherokee") || model.includes("wrangler")) {
    return "/cars/jeep.png";
  }
  if (make.includes("tesla") || model.includes("model 3") || model.includes("model y") || model.includes("3") || model.includes("y")) {
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
