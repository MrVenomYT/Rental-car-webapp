import { CarProps, FilterProps } from "@types";

export const sampleCars: CarProps[] = [
  { city_mpg: 23, class: "compact car", combination_mpg: 26, cylinders: 4, displacement: 1.6, drive: "fwd", fuel_type: "gas", highway_mpg: 31, make: "Toyota", model: "Corolla", transmission: "a", year: 2022 },
  { city_mpg: 28, class: "midsize car", combination_mpg: 32, cylinders: 4, displacement: 2.5, drive: "fwd", fuel_type: "gas", highway_mpg: 39, make: "Honda", model: "Accord", transmission: "a", year: 2022 },
  { city_mpg: 19, class: "fullsize car", combination_mpg: 22, cylinders: 6, displacement: 3.0, drive: "rwd", fuel_type: "gas", highway_mpg: 27, make: "BMW", model: "M3", transmission: "m", year: 2023 },
  { city_mpg: 25, class: "compact car", combination_mpg: 29, cylinders: 4, displacement: 2.0, drive: "awd", fuel_type: "gas", highway_mpg: 34, make: "Audi", model: "A4", transmission: "a", year: 2021 },
  { city_mpg: 21, class: "suv", combination_mpg: 24, cylinders: 6, displacement: 3.5, drive: "awd", fuel_type: "gas", highway_mpg: 28, make: "Ford", model: "Explorer", transmission: "a", year: 2022 },
  { city_mpg: 20, class: "sports car", combination_mpg: 23, cylinders: 8, displacement: 5.0, drive: "rwd", fuel_type: "gas", highway_mpg: 26, make: "Ford", model: "Mustang", transmission: "m", year: 2023 },
  { city_mpg: 24, class: "sedan", combination_mpg: 28, cylinders: 4, displacement: 2.0, drive: "fwd", fuel_type: "gas", highway_mpg: 32, make: "Volkswagen", model: "Jetta", transmission: "a", year: 2022 },
  { city_mpg: 18, class: "suv", combination_mpg: 21, cylinders: 6, displacement: 3.6, drive: "awd", fuel_type: "gas", highway_mpg: 25, make: "Jeep", model: "Grand Cherokee", transmission: "a", year: 2023 },
  { city_mpg: 22, class: "compact car", combination_mpg: 25, cylinders: 4, displacement: 2.0, drive: "awd", fuel_type: "gas", highway_mpg: 30, make: "Subaru", model: "Impreza", transmission: "a", year: 2022 },
  { city_mpg: 27, class: "hybrid", combination_mpg: 30, cylinders: 4, displacement: 1.8, drive: "fwd", fuel_type: "gas", highway_mpg: 35, make: "Hyundai", model: "Elantra", transmission: "a", year: 2023 },
  { city_mpg: 110, class: "electric car", combination_mpg: 112, cylinders: 0, displacement: 0.0, drive: "rwd", fuel_type: "electricity", highway_mpg: 114, make: "Tesla", model: "Model 3", transmission: "a", year: 2022 },
  { city_mpg: 102, class: "electric suv", combination_mpg: 105, cylinders: 0, displacement: 0.0, drive: "awd", fuel_type: "electricity", highway_mpg: 108, make: "Tesla", model: "Model Y", transmission: "a", year: 2023 }
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

  // Exact car models mapped to high quality unique automotive photography
  if (make === "toyota" && model.includes("corolla")) {
    return "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "honda" && model.includes("accord")) {
    return "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "bmw" && (model.includes("m3") || model.includes("m5"))) {
    return "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "audi" && model.includes("a4")) {
    return "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "ford" && model.includes("explorer")) {
    return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "ford" && model.includes("mustang")) {
    return "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "volkswagen" && model.includes("jetta")) {
    return "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "jeep" && (model.includes("cherokee") || model.includes("wrangler"))) {
    return "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "subaru" && model.includes("impreza")) {
    return "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "hyundai" && model.includes("elantra")) {
    return "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "tesla" && model.includes("3")) {
    return "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80";
  }
  if (make === "tesla" && model.includes("y")) {
    return "https://images.unsplash.com/photo-1570356528233-b44267e224e7?auto=format&fit=crop&w=1200&q=80";
  }

  // Make-based distinct images
  const makeImages: Record<string, string> = {
    toyota: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1200&q=80",
    honda: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
    bmw: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    audi: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    ford: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80",
    volkswagen: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    jeep: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=1200&q=80",
    subaru: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    hyundai: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
    tesla: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    mercedes: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    porsche: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    nissan: "https://images.unsplash.com/photo-1609521263047-f8d205293f24?auto=format&fit=crop&w=1200&q=80",
    chevrolet: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  };

  if (makeImages[make]) {
    return makeImages[make];
  }

  // Fallback to hero asset
  return "/hero.png";
};
