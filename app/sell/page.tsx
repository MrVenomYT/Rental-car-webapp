"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, DollarSign, Clock, ArrowRight } from "lucide-react";
import NavBar from "@components/Navbar";
import Footer from "@components/Footer";

export default function SellCarPage() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2023);
  const [generation, setGeneration] = useState("");
  const [price, setPrice] = useState(28000);
  const [mileage, setMileage] = useState(15000);
  const [bodyType, setBodyType] = useState("Sedan");
  const [fuelType, setFuelType] = useState("gas");
  const [transmission, setTransmission] = useState("a");
  const [drivetrain, setDrivetrain] = useState("fwd");
  const [location, setLocation] = useState("San Francisco CA");
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />

      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto padding-x">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs uppercase tracking-wider border border-blue-100">
            Direct Vehicle Consignment & Sales
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            Sell or Consign Your Vehicle
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal">
            Reach thousands of pre-qualified buyers and renters. Verified listings, zero listing fees, and guaranteed safe escrow transactions.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto padding-x py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (8 Cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
            {isSuccess ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h2 className="text-2xl font-black text-slate-900 mt-4">Vehicle Listing Submitted!</h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you {sellerName || "Partner"}. Your {year} {make} {model} has been queued for concierge verification. You will receive an onboarding confirmation email at {sellerEmail || "your email"} within 2 business hours.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
                  >
                    List Another Vehicle
                  </button>
                  <Link
                    href="/cars"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
                  >
                    Browse Live Inventory
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Vehicle Details</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Please provide accurate factory specifications.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Make</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Toyota, BMW, Ford"
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
                      placeholder="e.g. Corolla, M3, Mustang"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Model Year</label>
                    <input
                      type="number"
                      required
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Generation / Platform Code</label>
                    <input
                      type="text"
                      placeholder="e.g. E210, G80, B9"
                      value={generation}
                      onChange={(e) => setGeneration(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Body Style</label>
                    <select
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Truck">Truck</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Odometer Mileage</label>
                    <input
                      type="number"
                      required
                      value={mileage}
                      onChange={(e) => setMileage(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Fuel Type</label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
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
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="a">Automatic</option>
                      <option value="m">Manual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Drivetrain</label>
                    <select
                      value={drivetrain}
                      onChange={(e) => setDrivetrain(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="fwd">FWD</option>
                      <option value="rwd">RWD</option>
                      <option value="awd">AWD</option>
                      <option value="4wd">4WD</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-xl font-black text-slate-900 mb-1">Owner Contact Information</h2>
                  <p className="text-xs text-slate-500 mb-4">Our concierge team will verify ownership before publishing.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={sellerEmail}
                        onChange={(e) => setSellerEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="(888) 123 4567"
                        value={sellerPhone}
                        onChange={(e) => setSellerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer mt-2"
                >
                  Submit Vehicle for Concierge Review
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Why Sell With DriveNest (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-black text-slate-900 text-base mb-4">Why Sell on DriveNest?</h3>
              <div className="space-y-4 text-xs">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Zero Listing Fees</h4>
                    <p className="text-slate-500 mt-0.5">List your car for sale or rental without any upfront charges.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Verified Buyers Only</h4>
                    <p className="text-slate-500 mt-0.5">Every potential buyer passes identity and driving record checks.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Quick Turnaround</h4>
                    <p className="text-slate-500 mt-0.5">Over 70% of listed cars receive verified offers within 5 days.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-sm">
              <h3 className="font-black text-white text-base mb-2">Need a Fleet Valuation?</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                If you manage multiple vehicles or an independent rental fleet, our commercial advisors can assist with bulk onboarding.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                <span>Contact Commercial Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
