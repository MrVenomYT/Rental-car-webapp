"use client";

import Link from "next/link";
import { ShieldCheck, Award, Users, CheckCircle, Car, ArrowRight } from "lucide-react";
import NavBar from "@components/Navbar";
import Footer from "@components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />

      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto padding-x">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs uppercase tracking-wider border border-blue-100">
            About DriveNest
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 tracking-tight">
            Redefining Verified Vehicle Rentals & Sales
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl font-normal leading-relaxed">
            Founded with a commitment to integrity, DriveNest connects car enthusiasts, travelers, and buyers with authentic, verified vehicles spanning generations from 1990 through 2026.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-[1440px] mx-auto padding-x py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-black text-blue-600">10,000+</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-1">Verified Vehicles</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-black text-blue-600">1990 to 2026</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-1">Production Years</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-black text-blue-600">99.4%</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-1">Customer Satisfaction</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-black text-blue-600">50+ Cities</p>
            <p className="text-xs font-bold text-slate-500 uppercase mt-1">Nationwide Hubs</p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-[1440px] mx-auto padding-x py-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900">Our Pillars of Excellence</h2>
          <p className="text-xs text-slate-500 mt-2 font-medium">Built from the ground up for vehicle authenticity and customer trust.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">150 Point Physical Inspection</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Every vehicle on our platform undergoes mechanical, cosmetic, and diagnostic checks by certified automotive technicians before being certified for rental or sale.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Historical Generation Accuracy</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              We never fabricate vehicles or substitute generations. Every record reflects authentic manufacturer platform codes, engine trims, and real photography.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Guaranteed Transparent Pricing</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Zero hidden counter fees, zero surprise deposit deductions, and complete upfront rental clarity on all terms and conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto padding-x py-12">
        <div className="p-10 sm:p-14 bg-blue-600 text-white rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">Experience the DriveNest Difference</h2>
            <p className="text-xs text-blue-100 mt-2 max-w-xl font-normal">
              Explore our catalog of verified real world cars from modern electric flagships to classic sports icons.
            </p>
          </div>
          <Link
            href="/cars"
            className="px-8 py-3.5 bg-white text-blue-600 font-extrabold text-xs rounded-xl shadow-sm hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Explore Catalog Now
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
