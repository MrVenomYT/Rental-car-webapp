"use client";

import Image from "next/image";

interface FinancingPromoProps {
  onOpenFinancing?: () => void;
}

const FinancingPromoBanner = ({ onOpenFinancing }: FinancingPromoProps) => {
  return (
    <section className="max-w-[1440px] mx-auto padding-x py-12">
      <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
        <div className="max-w-xl z-10">
          <span className="text-xs font-extrabold text-blue-200 uppercase tracking-widest block mb-2">
            Financing Made Simple
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Get Behind the Wheel Today
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-3 font-normal leading-relaxed">
            Choose from flexible financing options with competitive rates. Pre qualify in minutes and drive home your perfect car.
          </p>

          <button
            type="button"
            onClick={onOpenFinancing}
            className="mt-6 px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Get Pre Approved
          </button>
        </div>

        <div className="relative w-full md:w-1/2 h-56 sm:h-64 rounded-2xl overflow-hidden z-10">
          <Image
            src="/hero.png"
            alt="Financing Vehicle"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FinancingPromoBanner;
