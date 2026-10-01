"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { comprehensiveVehicleCatalog } from "../../../data/vehicleCatalog";
import { generateCarImageUrl } from "@utils";
import { Sparkles, CheckCircle2, ShieldCheck, UserCheck, ArrowLeft, Calendar, Gauge, Fuel, Users } from "lucide-react";

import NavBar from "@components/Navbar";
import Footer from "@components/Footer";

export default function CarDetailPage() {
  const params = useParams();
  const carId = params?.id as string;

  const vehicle = comprehensiveVehicleCatalog.find((v) => v.id === carId) || comprehensiveVehicleCatalog[0];

  const [days, setDays] = useState(3);
  const [pickupDate, setPickupDate] = useState("2026-10-05");
  const [pickupLocation, setPickupLocation] = useState("San Francisco International Airport SFO");
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const dailyPrice = vehicle.rental.daily_price;
  const insurancePrice = includeInsurance ? 15 : 0;
  const totalPrice = dailyPrice * days + insurancePrice * days;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />

      <div className="max-w-[1440px] mx-auto padding-x py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link href="/cars" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Inventory Catalog</span>
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-extrabold">{vehicle.year} {vehicle.make} {vehicle.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image & Specifications (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Main Showcase Hero Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-600 text-white font-extrabold text-xs rounded-lg uppercase tracking-wider">
                    {vehicle.rental_category}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 font-extrabold text-xs rounded-lg">
                    Gen: {vehicle.generation}
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-400">
                  Origin: {vehicle.country_of_origin}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>

              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">
                Trim Variant: {vehicle.trim}
              </p>

              {/* Authentic Transparent Vehicle Cutout */}
              <div className="relative w-full h-72 sm:h-96 my-6 flex items-center justify-center">
                <Image
                  src={vehicle.image.url}
                  alt={`${vehicle.make} ${vehicle.model} Isolated PNG`}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-contain drop-shadow-lg"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <Gauge className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Drivetrain</p>
                  <p className="text-xs font-black text-slate-800">{vehicle.drivetrain}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl">
                  <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Production</p>
                  <p className="text-xs font-black text-slate-800">
                    {vehicle.production_start} to {vehicle.production_end || "Present"}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl">
                  <Fuel className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Fuel Type</p>
                  <p className="text-xs font-black text-slate-800 capitalize">{vehicle.fuel_type}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Capacity</p>
                  <p className="text-xs font-black text-slate-800">{vehicle.seating_capacity} Passengers</p>
                </div>
              </div>
            </div>

            {/* Structured Mechanical Specifications Matrix */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-black text-slate-900 mb-4">
                Structured Technical Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Engine Type</span>
                  <span className="text-slate-900 font-bold">{vehicle.engine.type}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Engine Displacement</span>
                  <span className="text-slate-900 font-bold">{vehicle.engine.displacement}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Cylinders</span>
                  <span className="text-slate-900 font-bold">{vehicle.engine.cylinders || "Electric Rotor"}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Horsepower</span>
                  <span className="text-slate-900 font-bold">
                    {vehicle.engine.horsepower ? `${vehicle.engine.horsepower} HP` : "Factory Standard"}
                  </span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Torque</span>
                  <span className="text-slate-900 font-bold">
                    {vehicle.engine.torque_nm ? `${vehicle.engine.torque_nm} Nm` : "Factory Standard"}
                  </span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Transmission</span>
                  <span className="text-slate-900 font-bold">{vehicle.transmission}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Doors</span>
                  <span className="text-slate-900 font-bold">{vehicle.doors} Doors</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Factory Color</span>
                  <span className="text-slate-900 font-bold">{vehicle.color}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Electric Vehicle (EV)</span>
                  <span className="text-slate-900 font-bold">{vehicle.is_electric ? "Yes" : "No"}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-slate-100">
                  <span className="text-slate-500">Hybrid Powertrain</span>
                  <span className="text-slate-900 font-bold">{vehicle.is_hybrid ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            {/* AI Technical Analysis */}
            <div className="bg-blue-50/70 p-6 rounded-3xl border border-blue-100">
              <div className="flex items-center gap-2 font-bold text-blue-600 mb-2 uppercase text-xs tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Gemini Vehicle Evaluation</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                The {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.generation}) represents a benchmark in the {vehicle.vehicle_class} category. Featuring factory tuned suspension, responsive {vehicle.transmission} shifting, and {vehicle.drivetrain} stability, it delivers composed everyday manners and confident highway touring.
              </p>
            </div>
          </div>

          {/* Right Column: Reservation & Pricing Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daily Rate</p>
                  <p className="text-3xl font-black text-slate-900">
                    ${dailyPrice} <span className="text-xs font-normal text-slate-400">/ day</span>
                  </p>
                </div>

                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-full uppercase">
                  Available Now
                </span>
              </div>

              {/* Rental Policy Badges */}
              <div className="space-y-2 py-4 border-y border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-600 font-semibold">
                  <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Minimum Driver Age: {vehicle.rental.minimum_driver_age} Years</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Security Deposit Required: {vehicle.rental.deposit_required ? "Yes (Refundable)" : "No"}</span>
                </div>
              </div>

              {bookedSuccess ? (
                <div className="mt-6 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-emerald-900 text-lg mt-3">Reservation Confirmed!</h3>
                  <p className="text-emerald-700 text-xs mt-1">
                    Your {vehicle.year} {vehicle.make} {vehicle.model} is reserved for {days} days starting {pickupDate}.
                  </p>
                  <Link
                    href="/cars"
                    className="inline-block mt-4 px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                  >
                    Return to Catalog
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Pickup Date</label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Rental Duration (Days)</label>
                    <select
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value={1}>1 Day</option>
                      <option value={2}>2 Days</option>
                      <option value={3}>3 Days</option>
                      <option value={5}>5 Days</option>
                      <option value={7}>7 Days (1 Week)</option>
                      <option value={14}>14 Days (2 Weeks)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Pickup Location</label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="SFO">San Francisco International Airport SFO</option>
                      <option value="LAX">Los Angeles International Airport LAX</option>
                      <option value="JFK">New York JFK Airport</option>
                      <option value="MIA">Miami International Airport</option>
                      <option value="Downtown">Downtown Concierge Center</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="insurance-box"
                        checked={includeInsurance}
                        onChange={(e) => setIncludeInsurance(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-600 w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="insurance-box" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Full Comprehensive Coverage ($15 / day)
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Estimated Total</p>
                      <p className="text-2xl font-black text-blue-600">
                        ${totalPrice} <span className="text-xs font-normal text-slate-400">({days} days)</span>
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Reserve Now
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
