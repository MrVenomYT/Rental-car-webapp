"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
  onToggleFavorite?: (car: CarProps, isFav: boolean) => void;
}

const CarCard = ({ car, onToggleFavorite }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const carRent = car.daily_rental_price || calculateCarRent(city_mpg, year);
  const carPrice = car.price ? `$${car.price.toLocaleString()}` : `$${(Number(carRent) * 320).toLocaleString()}`;
  const carImageUrl = generateCarImageUrl(car);

  const handleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    onToggleFavorite?.(car, nextState);
  };

  return (
    <div className="car-card group flex flex-col p-6 justify-between items-start text-slate-900 bg-white hover:shadow-xl rounded-3xl border border-slate-100 transition-all duration-300 relative overflow-hidden">
      {/* Header with Title and Favorite Heart */}
      <div className="w-full flex justify-between items-start gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold capitalize text-slate-900 group-hover:text-blue-600 transition-colors">
              {year} {make} {model}
            </h3>
            {car.generation && (
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-extrabold text-[10px] tracking-wide">
                {car.generation}
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            {car.trim ? `${car.trim} · ` : ""}{car.body_type || car.class || "Sedan"} {car.location ? `· ${car.location}` : "· New York NY"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLike}
          className="p-2 rounded-full hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
          title="Favorite vehicle"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-slate-600"
            }`}
          />
        </button>
      </div>

      {/* Asking Price Tag */}
      <div className="mt-3">
        <p className="text-2xl font-black text-blue-600 tracking-tight">
          ${carRent} <span className="text-xs text-slate-400 font-semibold">/ day</span>
          <span className="text-xs text-slate-400 font-semibold ml-2">({carPrice} buy)</span>
        </p>
      </div>

      {/* Authentic Isolated Transparent PNG Car Image */}
      <div className="relative w-full h-44 my-4 flex items-center justify-center">
        <Image
          src={carImageUrl}
          alt={`${make} ${model} Authentic Transparent Vehicle Cutout`}
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Specs Badges */}
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-slate-500 pt-3 border-t border-slate-100 text-xs font-semibold">
          <div className="flex flex-col items-center gap-1">
            <Image src="/steering-wheel.svg" width={18} height={18} alt="transmission" />
            <span>{transmission === "a" ? "Automatic" : "Manual"}</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Image src="/tire.svg" width={18} height={18} alt="drivetrain" />
            <span className="uppercase">{drive}</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Image src="/gas.svg" width={18} height={18} alt="fuel" />
            <span className="capitalize">{car.fuel_type || "Gasoline"}</span>
          </div>
        </div>

        {/* Hover Action Button */}
        <div className="car-card__btn-container">
          <CustomButton
            title="View Details Reserve"
            containerStyles="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
            textStyles="text-white text-xs font-bold"
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
