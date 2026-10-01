"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

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
}: NavBarProps) => {
  const pathname = usePathname();

  return (
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

        {/* Navigation Route Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <Link
            href="/"
            className={`transition-colors hover:text-blue-600 ${
              pathname === "/" ? "text-blue-600 font-extrabold" : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/cars"
            className={`transition-colors hover:text-blue-600 ${
              pathname === "/cars" ? "text-blue-600 font-extrabold" : ""
            }`}
          >
            Vehicle Catalog
          </Link>

          <Link
            href="/sell"
            className={`transition-colors hover:text-blue-600 ${
              pathname === "/sell" ? "text-blue-600 font-extrabold" : ""
            }`}
          >
            Sell Your Car
          </Link>

          <Link
            href="/financing"
            className={`transition-colors hover:text-blue-600 ${
              pathname === "/financing" ? "text-blue-600 font-extrabold" : ""
            }`}
          >
            Financing
          </Link>

          <Link
            href="/about"
            className={`transition-colors hover:text-blue-600 ${
              pathname === "/about" ? "text-blue-600 font-extrabold" : ""
            }`}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className={`transition-colors hover:text-blue-600 ${
              pathname === "/contact" ? "text-blue-600 font-extrabold" : ""
            }`}
          >
            Contact
          </Link>

          <Link
            href="/admin"
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${
              pathname === "/admin" || isAdminActive
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Admin Portal
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/cars"
            className="relative p-2 rounded-full hover:bg-slate-50 transition-colors"
            title="Saved Vehicles"
          >
            <Heart className="w-5 h-5 text-slate-400 hover:text-red-500 transition-colors" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            href="/sell"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            List Your Car
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
