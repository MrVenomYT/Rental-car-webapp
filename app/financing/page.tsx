"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, DollarSign, Calculator, HelpCircle } from "lucide-react";
import NavBar from "@components/Navbar";
import Footer from "@components/Footer";

export default function FinancingPage() {
  const [vehiclePrice, setVehiclePrice] = useState(32000);
  const [downPayment, setDownPayment] = useState(6000);
  const [interestRate, setInterestRate] = useState(5.4);
  const [months, setMonths] = useState(48);
  const [creditScore, setCreditScore] = useState("excellent");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [isPreApproved, setIsPreApproved] = useState(false);

  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : loanAmount / months;

  const totalInterest = monthlyPayment * months - loanAmount;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreApproved(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />

      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto padding-x">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs uppercase tracking-wider border border-blue-100">
            Flexible Auto Financing & Pre Approval
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            Vehicle Loan & Financing Calculator
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal">
            Customize your monthly payments, compare terms, and get pre approved in minutes with zero impact on your credit score.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto padding-x py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Calculator (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span>Payment Estimator</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Adjust the sliders below to calculate your estimated payment.</p>
            </div>

            {/* Slider 1: Vehicle Price */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-600">Vehicle Purchase Price</label>
                <span className="text-sm font-black text-blue-600">${vehiclePrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="120000"
                step="1000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Slider 2: Down Payment */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-600">Down Payment Amount</label>
                <span className="text-sm font-black text-blue-600">${downPayment.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max={vehiclePrice}
                step="500"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Loan Term & APR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-600 mb-2">Loan Duration</label>
                <select
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value={24}>24 Months (2 Years)</option>
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={48}>48 Months (4 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                  <option value={72}>72 Months (6 Years)</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-600 mb-2">Estimated Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-6 bg-blue-600 text-white rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-blue-100">Estimated Monthly Payment</p>
                <p className="text-4xl font-black mt-1">
                  ${Math.round(monthlyPayment)}{" "}
                  <span className="text-xs font-normal text-blue-200">/ month</span>
                </p>
              </div>

              <div className="text-left sm:text-right text-xs">
                <p className="text-blue-100 font-semibold">Total Financed: ${loanAmount.toLocaleString()}</p>
                <p className="text-blue-100 font-semibold mt-0.5">Est. Total Interest: ${Math.round(totalInterest).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-Approval Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
            {isPreApproved ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 mt-3">Pre Approval Submitted!</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Thank you {applicantName || "Customer"}. Our banking partners have logged your soft inquiry for ${vehiclePrice.toLocaleString()} at ${Math.round(monthlyPayment)}/month. Your dedicated financing advisor will contact you within 1 hour.
                </p>
                <button
                  type="button"
                  onClick={() => setIsPreApproved(false)}
                  className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Calculate Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Get Pre Approved Online</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Quick soft check with zero impact on credit score.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Credit Score Range</label>
                  <select
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="excellent">Excellent (750+)</option>
                    <option value="good">Good (700 to 749)</option>
                    <option value="fair">Fair (640 to 699)</option>
                    <option value="building">Rebuilding (Under 640)</option>
                  </select>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-500 leading-tight">
                    By submitting, you agree to our 256 bit encrypted soft credit evaluation with our certified financial partners.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Submit Pre Approval Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
