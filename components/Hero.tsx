"use client";

import Image from "next/image";
import { Car, ShieldCheck, Tag } from "lucide-react";

interface HeroProps {
  onBrowseCars?: () => void;
  onSellCar?: () => void;
}

const Hero = ({ onBrowseCars, onSellCar }: HeroProps) => {
  return (
    <section className="relative w-full bg-slate-50 pt-8 pb-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto padding-x">
        {/* Main Hero Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-6">
          {/* Left Text Content */}
          <div className="flex-1 max-w-2xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-4 border border-blue-100">
              VERIFIED RENTAL & SALES PLATFORM
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              Find Your Perfect Car Drive Your Dreams
            </h1>

            <p className="text-slate-600 text-base sm:text-lg mt-5 leading-relaxed font-normal">
              Explore thousands of verified cars from trusted sellers. Best prices, easy financing, drive with confidence.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                type="button"
                onClick={onBrowseCars}
                className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-colors cursor-pointer"
              >
                Browse Cars
              </button>
              <button
                type="button"
                onClick={onSellCar}
                className="px-8 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 font-bold text-sm transition-colors cursor-pointer"
              >
                Sell Your Car
              </button>
            </div>

            {/* Stat Pill Badges with Lucide Icons (Zero Emojis) */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">10,000+</p>
                  <p className="text-xs text-slate-500 font-medium">Cars Listed</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Trusted Sellers</p>
                  <p className="text-xs text-slate-500 font-medium">Verified & Reviewed</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Best Prices</p>
                  <p className="text-xs text-slate-500 font-medium">Market Competitive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Authentic Transparent Vehicle Showcase */}
          <div className="flex-1 relative w-full h-[320px] sm:h-[450px] flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/hero.png"
                alt="Isolated Transparent Vehicle Cutout"
                fill
                priority
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
