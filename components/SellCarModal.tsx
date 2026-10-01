"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CarProps } from "@types";

interface SellCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCar: (newCar: CarProps) => void;
}

const SellCarModal = ({ isOpen, onClose, onAddCar }: SellCarModalProps) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2023);
  const [price, setPrice] = useState(28000);
  const [mileage, setMileage] = useState(15000);
  const [fuelType, setFuelType] = useState("gas");
  const [transmission, setTransmission] = useState("a");
  const [drive, setDrive] = useState("fwd");
  const [location, setLocation] = useState("San Francisco CA");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCar: CarProps = {
      make,
      model,
      year: Number(year),
      city_mpg: 26,
      combination_mpg: 30,
      highway_mpg: 34,
      cylinders: 4,
      displacement: 2.0,
      drive,
      fuel_type: fuelType,
      transmission,
      class: "sedan",
      price: Number(price),
      mileage: Number(mileage),
      location,
      status: "available",
      id: `car_${Date.now()}`,
    };

    onAddCar(newCar);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
        >
          <Image src="/close.svg" alt="close" width={18} height={18} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 mt-3">Vehicle Listed Successfully!</h3>
            <p className="text-xs text-slate-500 mt-2">
              Your {year} {make} {model} has been added to our live inventory.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Back to Catalogue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Sell Your Car</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">List Vehicle For Sale or Rent</h2>
              <p className="text-xs text-slate-500 mt-1">
                Reach thousands of verified buyers with zero listing fees.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Make</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Toyota"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Camry"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Year</label>
                <input
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Asking Price ($)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Mileage (Miles)</label>
                <input
                  type="number"
                  value={mileage}
                  onChange={(e) => setMileage(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Fuel Type</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="gas">Gasoline</option>
                  <option value="electricity">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Transmission</label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="a">Automatic</option>
                  <option value="m">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Drivetrain</label>
                <select
                  value={drive}
                  onChange={(e) => setDrive(e.target.value)}
                  className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="fwd">FWD</option>
                  <option value="rwd">RWD</option>
                  <option value="awd">AWD</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors mt-2 cursor-pointer"
            >
              Submit Car Listing
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellCarModal;
