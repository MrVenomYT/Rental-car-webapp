"use client";

import Image from "next/image";
import { CustomButton } from "@components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero max-width relative pt-28 lg:pt-36 min-h-[85vh] flex flex-col lg:flex-row justify-between items-center overflow-hidden">
      <div className="flex-1 pt-8 lg:pt-12 padding-x z-10 max-w-2xl">
        {/* Announcement Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-primary-blue mb-6 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-primary-blue animate-ping" />
          <span>Next-Gen Smart Rental Experience</span>
        </div>

        <h1 className="hero__title leading-tight text-slate-900 font-black tracking-tight text-4xl sm:text-6xl xl:text-[64px]">
          Find, book, rent a car—quick and super easy!
        </h1>

        <p className="hero__subtitle text-slate-600 text-lg sm:text-xl font-normal mt-6 leading-relaxed">
          Streamline your car rental experience with our effortless booking process and AI recommendations.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <CustomButton
            title="Explore Cars"
            containerStyles="bg-primary-blue text-white rounded-full py-3.5 px-8 font-semibold shadow-lg hover:bg-blue-700 transition-all"
            handleClick={handleScroll}
          />
          <a
            href="#ai-assistant"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-gray-200 text-slate-700 font-semibold text-sm hover:border-primary-blue hover:text-primary-blue transition-all shadow-xs"
          >
            <span>✨ Ask AI Concierge</span>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-100">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">2,500+</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Verified Fleet Cars</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">99.4%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Customer Satisfaction</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">24/7</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Instant Concierge</p>
          </div>
        </div>
      </div>

      {/* Hero Image Container with Reverted /hero.png image */}
      <div className="hero__image-container flex-1 relative w-full lg:w-[60%] h-[450px] sm:h-[550px] lg:h-[650px] flex items-center justify-center">
        <div className="hero__image relative w-full h-full flex items-center justify-center z-10">
          <Image
            src="/hero.png"
            alt="Hero BMW M3"
            fill
            priority
            className="object-contain drop-shadow-xl z-10"
          />
        </div>

        {/* Floating Badge Matching Uploaded Image Design */}
        <div className="hidden sm:flex absolute bottom-8 left-6 z-20 bg-white/95 backdrop-blur-md p-3.5 px-4 rounded-2xl border border-white/60 shadow-xl items-center gap-3.5 max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary-blue flex items-center justify-center font-bold text-lg shrink-0">
            🏎️
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 leading-tight">Featured Today</p>
            <p className="text-sm font-bold text-slate-900 leading-tight">BMW M3 Competition</p>
            <p className="text-xs font-black text-primary-blue mt-0.5">$98 / day</p>
          </div>
        </div>

        <div className="hero__image-overlay bg-hero-bg bg-repeat-round bg-center" />
      </div>
    </div>
  );
};

export default Hero;
