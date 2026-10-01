"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Bot, Car, SlidersHorizontal, DollarSign } from "lucide-react";
import { manufacturers } from "@constants";

interface SearchConsoleProps {
  onSearch: (filters: {
    make: string;
    model: string;
    minPrice: string;
    maxPrice: string;
    year: string;
    location: string;
    bodyType: string;
  }) => void;
}

const AdvancedSearchConsole = ({ onSearch }: SearchConsoleProps) => {
  const [activeTab, setActiveTab] = useState<"search" | "body" | "price" | "ai">("search");

  // Search Fields State
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [bodyType, setBodyType] = useState("");

  // AI Concierge Query
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResult] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ make, model, minPrice, maxPrice, year, location, bodyType });
  };

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await fetch("/api/car-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "search_recommendations", query: aiQuery }),
      });
      const data = await res.json();
      if (data.result) {
        setAiResult(data.result);
      }
    } catch {
      setAiResult("Unable to connect to AI Concierge right now. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto padding-x -mt-8 relative z-20">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("search")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "search"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Image src="/magnifying-glass.svg" width={16} height={16} alt="search" className={activeTab === "search" ? "invert brightness-200" : ""} />
            <span>Search Cars</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("body")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "body"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Body Type</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("price")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "price"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Price Range</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "ai"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Gemini AI Assistant</span>
          </button>
        </div>

        {/* Tab 1: Search Form */}
        {activeTab === "search" && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Make</label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="">All Makes</option>
                {manufacturers.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Corolla, M3"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Min Price</label>
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="">No Min</option>
                <option value="10000">$10,000</option>
                <option value="20000">$20,000</option>
                <option value="30000">$30,000</option>
                <option value="50000">$50,000</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Max Price</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="">No Max</option>
                <option value="25000">$25,000</option>
                <option value="40000">$40,000</option>
                <option value="60000">$60,000</option>
                <option value="100000">$100,000</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Year From</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="">Any Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="">All Locations</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="Miami">Miami</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 h-[42px]"
              >
                <span>Search Cars</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Body Type Selector */}
        {activeTab === "body" && (
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {["SUV", "Sedan", "Truck", "Coupe", "Hatchback", "Convertible"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setBodyType(type);
                  onSearch({ make, model, minPrice, maxPrice, year, location, bodyType: type });
                }}
                className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  bodyType === type
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-slate-100 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Car className="w-5 h-5 text-blue-600" />
                <span>{type}</span>
              </button>
            ))}
          </div>
        )}

        {/* Tab 3: Price Ranges */}
        {activeTab === "price" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Under $20,000", min: "0", max: "20000" },
              { label: "$20,000 to $35,000", min: "20000", max: "35000" },
              { label: "$35,000 to $60,000", min: "35000", max: "60000" },
              { label: "Above $60,000", min: "60000", max: "200000" },
            ].map((range) => (
              <button
                key={range.label}
                type="button"
                onClick={() => {
                  setMinPrice(range.min);
                  setMaxPrice(range.max);
                  onSearch({ make, model, minPrice: range.min, maxPrice: range.max, year, location, bodyType });
                }}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-600 text-slate-800 font-bold text-xs text-center transition-all cursor-pointer"
              >
                <span>{range.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Tab 4: AI Concierge Query */}
        {activeTab === "ai" && (
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
            <form onSubmit={handleAiAsk} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask Gemini: Reliable family SUV under $30,000 with low mileage..."
                className="flex-1 px-4 py-3 bg-white border border-blue-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-xs"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aiLoading ? "Searching..." : "Ask Gemini AI"}</span>
              </button>
            </form>

            {aiResponse && (
              <div className="mt-3 p-3 bg-white border border-blue-100 rounded-xl text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-blue-600 flex items-center gap-1 mb-1">
                  <Bot className="w-4 h-4" />
                  <span>Gemini Recommendation:</span>
                </span>
                {aiResponse}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearchConsole;
