"use client";

import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

interface NavBarProps {
  favoritesCount?: number;
  onOpenSellModal?: () => void;
  onOpenFinancingModal?: () => void;
  onOpenAdminDashboard?: () => void;
  onOpenContactModal?: () => void;
  isAdminActive?: boolean;
}

const NavBar = ({
  favoritesCount = 0,
  onOpenSellModal,
  onOpenFinancingModal,
  onOpenAdminDashboard,
  onOpenContactModal,
  isAdminActive = false,
}: NavBarProps) => (
  <header className="w-full sticky top-0 z-30 bg-white border-b border-slate-100 shadow-xs">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-xs">
          D
        </div>
        <span className="text-xl font-extrabold text-slate-900 tracking-tight">
          Drive<span className="text-blue-600">Nest</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
        <a href="#discover" className="hover:text-blue-600 transition-colors">
          Buy Cars
        </a>
        <button
          type="button"
          onClick={onOpenSellModal}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Sell Your Car
        </button>
        <button
          type="button"
          onClick={onOpenFinancingModal}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Financing
        </button>
        <button
          type="button"
          onClick={onOpenContactModal}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Contact Us
        </button>
        <button
          type="button"
          onClick={onOpenAdminDashboard}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            isAdminActive
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Admin Dashboard
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Heart Favorites Badge */}
        <a
          href="#favorites"
          className="relative p-2 rounded-full hover:bg-slate-50 transition-colors"
          title="Saved Vehicles"
        >
          <Image
            src="/heart-filled.svg"
            width={22}
            height={22}
            alt="favorites"
          />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </a>

        <CustomButton
          title="Sign In"
          btnType="button"
          containerStyles="text-slate-700 hover:text-blue-600 font-bold text-sm bg-transparent px-3"
        />

        <button
          type="button"
          onClick={onOpenSellModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
        >
          List Your Car
        </button>
      </div>
    </nav>
  </header>
);

export default NavBar;
