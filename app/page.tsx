"use client";

import { useState } from "react";
import { sampleCars } from "@utils";
import { CarProps } from "@types";
import { fuels, yearsOfProduction } from "@constants";

import NavBar from "@components/Navbar";
import Hero from "@components/Hero";
import AdvancedSearchConsole from "@components/AdvancedSearchConsole";
import BrandCategoryFilter from "@components/BrandCategoryFilter";
import WhyChooseUs from "@components/WhyChooseUs";
import Testimonials from "@components/Testimonials";
import FinancingPromoBanner from "@components/FinancingPromoBanner";
import Footer from "@components/Footer";
import CarCard from "@components/CarCard";
import CustomFilter from "@components/CustomFilter";
import ShowMore from "@components/ShowMore";

// Modals
import SellCarModal from "@components/SellCarModal";
import FinancingCalculatorModal from "@components/FinancingCalculatorModal";
import ContactModal from "@components/ContactModal";
import AdminDashboard from "@components/AdminDashboard";

export default function Home() {
  const [carsList, setCarsList] = useState<CarProps[]>(sampleCars);
  const [favorites, setFavorites] = useState<CarProps[]>([]);

  // Modals state
  const [isSellOpen, setIsSellModalOpen] = useState(false);
  const [isFinancingOpen, setIsFinancingModalOpen] = useState(false);
  const [isContactOpen, setIsContactModalOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // Search Filter State
  const [activeBrand, setActiveBrand] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQueryMake, setSearchQueryMake] = useState("");
  const [searchQueryModel, setSearchQueryModel] = useState("");

  const handleToggleFavorite = (car: CarProps, isFav: boolean) => {
    if (isFav) {
      setFavorites((prev) => [...prev, car]);
    } else {
      setFavorites((prev) => prev.filter((c) => c.model !== car.model || c.make !== car.make));
    }
  };

  const handleAddCar = (newCar: CarProps) => {
    setCarsList((prev) => [newCar, ...prev]);
  };

  const handleDeleteCar = (id: string) => {
    setCarsList((prev) => prev.filter((c) => c.id !== id));
  };

  const handleConsoleSearch = (filters: {
    make: string;
    model: string;
    minPrice: string;
    maxPrice: string;
    year: string;
    location: string;
    bodyType: string;
  }) => {
    setSearchQueryMake(filters.make);
    setSearchQueryModel(filters.model);
    if (filters.bodyType) setActiveCategory(filters.bodyType);

    const filtered = sampleCars.filter((car) => {
      if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) return false;
      if (filters.model && !car.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
      if (filters.year && car.year !== Number(filters.year)) return false;
      return true;
    });

    setCarsList(filtered.length > 0 ? filtered : sampleCars);
  };

  const handleBrandSelect = (brandName: string) => {
    setActiveBrand(brandName);
    const filtered = sampleCars.filter(
      (car) => car.make.toLowerCase() === brandName.toLowerCase()
    );
    setCarsList(filtered.length > 0 ? filtered : sampleCars);
  };

  const handleCategorySelect = (catName: string) => {
    setActiveCategory(catName);
    if (!catName) {
      setCarsList(sampleCars);
      return;
    }
    const filtered = sampleCars.filter((car) =>
      car.class.toLowerCase().includes(catName.toLowerCase())
    );
    setCarsList(filtered.length > 0 ? filtered : sampleCars);
  };

  if (isAdminView) {
    return (
      <main className="min-h-screen bg-slate-50">
        <NavBar
          favoritesCount={favorites.length}
          onOpenSellModal={() => setIsSellModalOpen(true)}
          onOpenFinancingModal={() => setIsFinancingModalOpen(true)}
          onOpenAdminDashboard={() => setIsAdminView(true)}
          onOpenContactModal={() => setIsContactModalOpen(true)}
          isAdminActive={true}
        />
        <AdminDashboard
          carsList={carsList}
          onAddCar={handleAddCar}
          onDeleteCar={handleDeleteCar}
          onCloseAdmin={() => setIsAdminView(false)}
        />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header Navigation */}
      <NavBar
        favoritesCount={favorites.length}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenFinancingModal={() => setIsFinancingModalOpen(true)}
        onOpenAdminDashboard={() => setIsAdminView(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        isAdminActive={false}
      />

      {/* Hero Section */}
      <Hero
        onBrowseCars={() => {
          const section = document.getElementById("discover");
          section?.scrollIntoView({ behavior: "smooth" });
        }}
        onSellCar={() => setIsSellModalOpen(true)}
      />

      {/* Multi-Tab Advanced Search Console */}
      <AdvancedSearchConsole onSearch={handleConsoleSearch} />

      {/* Featured Vehicle Listings Section */}
      <section className="mt-16 padding-x padding-y max-width" id="discover">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block mb-1">
              Curated Inventory
            </span>
            <h2 className="text-3xl font-black text-slate-900">Featured Listings</h2>
          </div>

          <a
            href="#discover"
            onClick={() => setCarsList(sampleCars)}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            View All Vehicles ({carsList.length})
          </a>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Filter By Spec:</span>
            {(activeBrand || activeCategory || searchQueryMake || searchQueryModel) && (
              <button
                type="button"
                onClick={() => {
                  setActiveBrand("");
                  setActiveCategory("");
                  setSearchQueryMake("");
                  setSearchQueryModel("");
                  setCarsList(sampleCars);
                }}
                className="px-2.5 py-1 bg-blue-100 text-blue-600 rounded-lg text-[10px] font-extrabold cursor-pointer"
              >
                Clear Filters ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8">
          {carsList.map((car, index) => (
            <CarCard
              key={`${car.make}-${car.model}-${car.year}-${index}`}
              car={car}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>

        <ShowMore pageNumber={1} isNext={carsList.length > 8} />
      </section>

      {/* Browse by Brand and Category */}
      <BrandCategoryFilter
        onSelectBrand={handleBrandSelect}
        onSelectCategory={handleCategorySelect}
      />

      {/* Why Choose DriveNest */}
      <WhyChooseUs />

      {/* Customer Reviews */}
      <Testimonials />

      {/* Financing Promotion Banner */}
      <FinancingPromoBanner onOpenFinancing={() => setIsFinancingModalOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <SellCarModal
        isOpen={isSellOpen}
        onClose={() => setIsSellModalOpen(false)}
        onAddCar={handleAddCar}
      />

      <FinancingCalculatorModal
        isOpen={isFinancingOpen}
        onClose={() => setIsFinancingModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}
