"use client";

import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { CarProps } from "@types";
import { calculateCarRent, generateCarImageUrl } from "@utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Booking form state
  const [days, setDays] = useState(3);
  const [pickupDate, setPickupDate] = useState("2026-10-05");
  const [pickupLocation, setPickupLocation] = useState("San Francisco International Airport SFO");
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const dailyPrice = Number(calculateCarRent(car.city_mpg, car.year));
  const insurancePrice = includeInsurance ? 15 : 0;
  const totalPrice = dailyPrice * days + insurancePrice * days;
  const carImageUrl = generateCarImageUrl(car);

  useEffect(() => {
    if (isOpen && car) {
      setLoadingAi(true);
      setBookedSuccess(false);
      fetch("/api/car-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "insights", car }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setAiInsights(data.result);
          } else {
            setAiInsights(null);
          }
        })
        .catch(() => setAiInsights(null))
        .finally(() => setLoadingAi(false));
    }
  }, [isOpen, car]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto transform rounded-3xl bg-white p-6 sm:p-8 text-left shadow-2xl transition-all flex flex-col gap-6">
                <button
                  type="button"
                  className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                  onClick={closeModal}
                >
                  <Image src="/close.svg" alt="close" width={18} height={18} />
                </button>

                {/* Authentic Isolated Vehicle Cutout */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="relative w-full h-56 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                    <Image
                      src={carImageUrl}
                      alt={`${car.make} ${car.model} Transparent Vehicle`}
                      fill
                      priority
                      referrerPolicy="no-referrer"
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider">
                      {car.make} Verified Listing
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-1 capitalize">
                      {car.year} {car.make} {car.model}
                    </h2>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-blue-600 mb-1 tracking-wide uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gemini AI Concierge Insights</span>
                  </div>
                  {loadingAi ? (
                    <p className="text-slate-500 text-xs italic animate-pulse">
                      Generating real time vehicle analysis and driving recommendations...
                    </p>
                  ) : aiInsights ? (
                    <p className="text-slate-700 whitespace-pre-line text-xs leading-relaxed font-medium">
                      {aiInsights}
                    </p>
                  ) : (
                    <p className="text-slate-600 text-xs">
                      Excellent option combining reliability, smooth performance, and city fuel efficiency.
                    </p>
                  )}
                </div>

                {/* Technical Specs */}
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Vehicle Specifications</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Transmission</p>
                      <p className="text-slate-900 font-bold text-xs capitalize">
                        {car.transmission === "a" ? "Automatic" : "Manual"}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Drivetrain</p>
                      <p className="text-slate-900 font-bold text-xs uppercase">{car.drive}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">City Mileage</p>
                      <p className="text-slate-900 font-bold text-xs">{car.city_mpg} MPG</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Highway Mileage</p>
                      <p className="text-slate-900 font-bold text-xs">{car.highway_mpg} MPG</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Engine Cylinders</p>
                      <p className="text-slate-900 font-bold text-xs">{car.cylinders || 4} Cylinders</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Fuel Type</p>
                      <p className="text-slate-900 font-bold text-xs capitalize">{car.fuel_type}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="border-t border-slate-100 pt-5">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Reserve This Vehicle</h3>

                  {bookedSuccess ? (
                    <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-emerald-900 text-lg mt-2">Reservation Confirmed!</h4>
                      <p className="text-emerald-700 text-xs mt-1">
                        Your {car.year} {car.make} {car.model} is reserved for {days} days starting {pickupDate}.
                      </p>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleBooking} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Pickup Date</label>
                          <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Duration (Days)</label>
                          <select
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                          >
                            <option value={1}>1 Day</option>
                            <option value={2}>2 Days</option>
                            <option value={3}>3 Days</option>
                            <option value={5}>5 Days</option>
                            <option value={7}>7 Days (1 Week)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Pickup Location</label>
                        <select
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                        >
                          <option value="SFO">San Francisco International Airport SFO</option>
                          <option value="LAX">Los Angeles International Airport LAX</option>
                          <option value="JFK">New York JFK Airport</option>
                          <option value="Downtown">Downtown Concierge Center</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="insurance"
                            checked={includeInsurance}
                            onChange={(e) => setIncludeInsurance(e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-600 w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="insurance" className="text-xs font-bold text-slate-700 cursor-pointer">
                            Full Coverage Protection Insurance ($15 per day)
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Estimated Total</p>
                          <p className="text-2xl font-black text-slate-900">
                            ${totalPrice} <span className="text-xs font-normal text-slate-400">({days} days)</span>
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          Confirm & Book Now
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CarDetails;
