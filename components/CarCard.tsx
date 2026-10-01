"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);
  const carImageUrl = generateCarImageUrl(car);

  return (
    <div className="car-card group flex flex-col p-6 justify-between items-start text-black-100 bg-white hover:shadow-xl rounded-3xl border border-gray-100 transition-all duration-300 relative overflow-hidden">
      {/* Header & Heart Toggle */}
      <div className="w-full flex justify-between items-start gap-2">
        <div>
          <h2 className="text-[20px] leading-[26px] font-bold capitalize text-slate-900 group-hover:text-primary-blue transition-colors">
            {make} {model}
          </h2>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">{year} Model · {car.class || "Sedan"}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className="p-2 rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Favorite car"
        >
          <Image
            src={isLiked ? "/heart-filled.svg" : "/heart-outline.svg"}
            width={22}
            height={22}
            alt="heart"
          />
        </button>
      </div>

      {/* Price tag */}
      <p className="flex mt-4 text-[28px] leading-[32px] font-extrabold text-slate-900">
        <span className="self-start text-[14px] leading-[17px] font-semibold text-primary-blue">$</span>
        {carRent}
        <span className="self-end text-[14px] leading-[17px] font-medium text-slate-500">/day</span>
      </p>

      {/* Car Image (Exact match per make/model) */}
      <div className="relative w-full h-44 my-4 rounded-xl overflow-hidden bg-slate-50 group-hover:bg-blue-50/50 transition-colors">
        <Image
          src={carImageUrl}
          alt={`${make} ${model}`}
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Specs & Hover CTA */}
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-slate-500 pt-2 border-t border-gray-100">
          <div className="flex flex-col justify-center items-center gap-1.5">
            <Image src="/steering-wheel.svg" width={18} height={18} alt="steering wheel" />
            <p className="text-[12px] font-medium">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1.5">
            <Image src="/tire.svg" width={18} height={18} alt="drive" />
            <p className="text-[12px] font-medium uppercase">{drive}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1.5">
            <Image src="/gas.svg" width={18} height={18} alt="mpg" />
            <p className="text-[12px] font-medium">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View Details & Book"
            containerStyles="w-full py-[14px] rounded-full bg-primary-blue hover:bg-blue-700 transition-colors shadow-md"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
