"use client";

import { Car, Truck, Gauge, Zap } from "lucide-react";

interface BrandCategoryFilterProps {
  onSelectBrand?: (brand: string) => void;
  onSelectCategory?: (category: string) => void;
}

const brands = [
  "Toyota",
  "Honda",
  "Ford",
  "BMW",
  "Mercedes Benz",
  "Audi",
  "Chevrolet",
  "Nissan",
  "Volkswagen",
];

const categories = [
  { name: "SUV", count: "320 Vehicles", icon: Car },
  { name: "Sedan", count: "480 Vehicles", icon: Car },
  { name: "Truck", count: "140 Vehicles", icon: Truck },
  { name: "Coupe", count: "95 Vehicles", icon: Gauge },
  { name: "Hatchback", count: "210 Vehicles", icon: Car },
  { name: "Convertible", count: "60 Vehicles", icon: Zap },
];

const BrandCategoryFilter = ({ onSelectBrand, onSelectCategory }: BrandCategoryFilterProps) => {
  return (
    <section className="max-w-[1440px] mx-auto padding-x py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Browse by Brand (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-slate-900">Browse by Brand</h3>
            <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">View All Brands</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {brands.map((brandName) => (
              <button
                key={brandName}
                type="button"
                onClick={() => onSelectBrand?.(brandName)}
                className="p-3.5 bg-slate-50 hover:bg-blue-50 hover:border-blue-600 border border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100/60 text-blue-600 flex items-center justify-center font-black text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {brandName.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-800 text-center">{brandName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Browse by Category (5 Cols) */}
        <div className="lg:col-span-5 bg-blue-600 p-6 rounded-3xl text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white">Browse by Category</h3>
              <span className="text-xs font-bold text-blue-100 hover:underline cursor-pointer">All Categories</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => onSelectCategory?.(cat.name)}
                    className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer gap-1.5"
                  >
                    <IconComponent className="w-5 h-5 text-blue-100" />
                    <span className="text-xs font-bold text-white block">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory?.("")}
            className="w-full mt-6 py-2.5 rounded-xl bg-white text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors cursor-pointer text-center"
          >
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandCategoryFilter;
