"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface FinancingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinancingCalculatorModal = ({ isOpen, onClose }: FinancingModalProps) => {
  const [vehiclePrice, setVehiclePrice] = useState(26900);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [months, setMonths] = useState(48);
  const [isPreApproved, setIsPreApproved] = useState(false);

  // Calculate monthly payment
  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : loanAmount / months;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
        >
          <Image src="/close.svg" alt="close" width={18} height={18} />
        </button>

        {isPreApproved ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 mt-3">Pre Approval Submitted!</h3>
            <p className="text-xs text-slate-500 mt-2">
              Our financial concierges are reviewing your application for a ${vehiclePrice.toLocaleString()} loan at ${Math.round(monthlyPayment)} per month.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsPreApproved(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Close Calculator
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Financing Made Simple</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Car Loan & Payment Calculator</h2>
              <p className="text-xs text-slate-500 mt-1">
                Estimate your monthly payment and pre qualify with zero impact on your credit score.
              </p>
            </div>

            {/* Price Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  Vehicle Price: <span className="text-blue-600 font-extrabold">${vehiclePrice.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  Down Payment: <span className="text-blue-600 font-extrabold">${downPayment.toLocaleString()}</span>
                </label>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-600 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="block text-xs font-bold text-slate-600 mb-2">Loan Term (Months)</label>
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
            </div>

            {/* Estimated Monthly Payment Result */}
            <div className="p-6 bg-blue-600 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div>
                <p className="text-xs text-blue-100 font-bold uppercase tracking-wider">Estimated Monthly Payment</p>
                <p className="text-3xl font-black mt-1">
                  ${Math.round(monthlyPayment)}{" "}
                  <span className="text-xs font-normal text-blue-200">/ month</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPreApproved(true)}
                className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
              >
                Get Pre Approved
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancingCalculatorModal;
