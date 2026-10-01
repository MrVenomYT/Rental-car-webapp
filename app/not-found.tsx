"use client";

import Link from "next/link";
import { ArrowLeft, Car } from "lucide-react";
import NavBar from "@components/Navbar";
import Footer from "@components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <NavBar />

      <div className="max-w-[1440px] mx-auto padding-x py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 h-8" />
        </div>
        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">404 Error</span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mt-2">Vehicle Route Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
          The page or vehicle specification you are looking for may have moved or is no longer listed in our active inventory.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-slate-800 transition-colors"
          >
            Return to Home
          </Link>
          <Link
            href="/cars"
            className="px-6 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition-colors"
          >
            Browse Full Catalog
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
