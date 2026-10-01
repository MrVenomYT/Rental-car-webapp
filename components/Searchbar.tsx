"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchManufacturer from "./SearchManufacturer";

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // AI Concierge Search state
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAi, setShowAi] = useState(false);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (modelParam: string, manufacturerParam: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (modelParam) {
      searchParams.set("model", modelParam);
    } else {
      searchParams.delete("model");
    }

    if (manufacturerParam) {
      searchParams.set("manufacturer", manufacturerParam);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname);
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
    } catch (err) {
      setAiResult("Unable to query AI Concierge right now. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Filter</p>
        <button
          type="button"
          onClick={() => setShowAi(!showAi)}
          className="text-xs font-bold text-primary-blue hover:underline flex items-center gap-1.5"
        >
          <span>✨ {showAi ? "Hide AI Concierge" : "Ask AI Assistant"}</span>
        </button>
      </div>

      {/* AI Search Assistant Drawer */}
      {showAi && (
        <div id="ai-assistant" className="p-4 bg-blue-50/90 border border-blue-200 rounded-2xl shadow-xs transition-all">
          <form onSubmit={handleAiAsk} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="e.g. Reliable fuel-efficient sedan for a weekend getaway under $60/day..."
              className="flex-1 px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary-blue shadow-xs"
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs shrink-0 flex items-center justify-center gap-2"
            >
              {aiLoading ? (
                <span className="animate-spin text-sm">⌛</span>
              ) : (
                <span>Ask Gemini</span>
              )}
            </button>
          </form>

          {aiResult && (
            <div className="mt-3 p-3 bg-white border border-blue-100 rounded-xl text-xs text-slate-700 leading-relaxed font-normal">
              <span className="font-bold text-primary-blue block mb-1">🤖 AI Concierge Recommendation:</span>
              {aiResult}
            </div>
          )}
        </div>
      )}

      {/* Standard Search Bar */}
      <form className="searchbar flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-3 max-w-3xl bg-white p-2 rounded-2xl sm:rounded-full border border-gray-200 shadow-md" onSubmit={handleSearch}>
        <div className="searchbar__item flex-1 max-sm:w-full flex justify-start items-center relative">
          <SearchManufacturer
            manufacturer={manufacturer}
            setManuFacturer={setManufacturer}
          />
        </div>

        <div className="searchbar__item flex-1 max-sm:w-full flex justify-start items-center relative">
          <Image
            src="/model-icon.png"
            width={20}
            height={20}
            className="absolute w-[20px] h-[20px] ml-4 pointer-events-none"
            alt="car model"
          />
          <input
            type="text"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model (e.g. Corolla, Accord, M3)..."
            className="w-full h-[48px] pl-12 pr-4 bg-slate-50 hover:bg-white focus:bg-white rounded-full outline-none text-xs font-semibold text-slate-800 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="bg-primary-blue hover:bg-blue-700 text-white p-3 sm:px-6 rounded-full font-bold text-xs transition-colors shrink-0 flex items-center gap-2 max-sm:w-full justify-center shadow-sm"
        >
          <Image src="/magnifying-glass.svg" width={18} height={18} alt="search" className="invert brightness-200" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
