"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { comprehensiveVehicleCatalog, structuredToCarProps } from "../../data/vehicleCatalog";
import { CarProps } from "@types";
import { fuels, yearsOfProduction, manufacturers } from "@constants";

import NavBar from "@components/Navbar";
import Footer from "@components/Footer";
import CarCard from "@components/CarCard";
import CustomFilter from "@components/CustomFilter";

export default function CarsCatalogPage() {
  const [carsList, setCarsList] = useState<CarProps[]>(
    comprehensiveVehicleCatalog.map(structuredToCarProps)
  );

  const [activeEra, setActiveEra] = useState<string>("all");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedBody, setSelectedBody] = useState<string>("");
  const [searchModel, setSearchModel] = useState<string>("");

  const handleEraFilter = (era: string) => {
    setActiveEra(era);
    filterCatalog(era, selectedMake, selectedBody, searchModel);
  };

  const handleMakeFilter = (make: string) => {
    setSelectedMake(make);
    filterCatalog(activeEra, make, selectedBody, searchModel);
  };

  const handleBodyFilter = (body: string) => {
    setSelectedBody(body);
    filterCatalog(activeEra, selectedMake, body, searchModel);
  };

  const handleModelSearch = (query: string) => {
    setSearchModel(query);
    filterCatalog(activeEra, selectedMake, selectedBody, query);
  };

  const filterCatalog = (era: string, make: string, body: string, query: string) => {
    const all = comprehensiveVehicleCatalog.map(structuredToCarProps);

    const filtered = all.filter((car) => {
      if (era === "modern" && !(car.year >= 2020 && car.year <= 2026)) return false;
      if (era === "contemporary" && !(car.year >= 2010 && car.year < 2020)) return false;
      if (era === "classic" && !(car.year >= 1990 && car.year < 2010)) return false;

      if (make && car.make.toLowerCase() !== make.toLowerCase()) return false;
      if (body && !car.class.toLowerCase().includes(body.toLowerCase()) && !(car.body_type && car.body_type.toLowerCase().includes(body.toLowerCase()))) return false;
      if (query && !car.model.toLowerCase().includes(query.toLowerCase())) return false;

      return true;
    });

    setCarsList(filtered);
  };

  const handleReset = () => {
    setActiveEra("all");
    setSelectedMake("");
    setSelectedBody("");
    setSearchModel("");
    setCarsList(comprehensiveVehicleCatalog.map(structuredToCarProps));
  };

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto padding-x">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs uppercase tracking-wider border border-blue-100">
            Real World Production Catalog (1990 to 2026)
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            Complete Vehicle Inventory
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal">
            Browse authentic manufacturer vehicles with verified generations, genuine specifications, and high quality backgroundless photography.
          </p>

          {/* Quick Search & Filters Bar */}
          <div className="mt-8 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Manufacturer</label>
              <select
                value={selectedMake}
                onChange={(e) => handleMakeFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="">All Manufacturers</option>
                {manufacturers.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Body Style</label>
              <select
                value={selectedBody}
                onChange={(e) => handleBodyFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="">All Body Styles</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Search Model</label>
              <input
                type="text"
                placeholder="e.g. Corolla, M3, Mustang"
                value={searchModel}
                onChange={(e) => handleModelSearch(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <section className="max-w-[1440px] mx-auto padding-x py-12">
        {/* Era selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleEraFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeEra === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Model Years (1990 to 2026)
            </button>

            <button
              type="button"
              onClick={() => handleEraFilter("modern")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeEra === "modern" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              2020 to 2026 Modern Fleet
            </button>

            <button
              type="button"
              onClick={() => handleEraFilter("contemporary")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeEra === "contemporary" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              2010 to 2019 Contemporary
            </button>

            <button
              type="button"
              onClick={() => handleEraFilter("classic")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeEra === "classic" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              1990 to 2009 Heritage Classics
            </button>
          </div>

          <p className="text-xs font-bold text-slate-400">
            Showing {carsList.length} Vehicles
          </p>
        </div>

        {/* Catalog Grid */}
        {carsList.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">No vehicles match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting filters to explore our full inventory.</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl"
            >
              View Full Catalog
            </button>
          </div>
        ) : (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8">
            {carsList.map((car, index) => (
              <div key={`${car.make}-${car.model}-${car.year}-${index}`} className="flex flex-col">
                <CarCard car={car} />
                {car.id && (
                  <Link
                    href={`/cars/${car.id}`}
                    className="mt-2 text-center text-xs font-extrabold text-blue-600 hover:underline py-1.5"
                  >
                    Open Full Specification Page →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
