"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CarProps } from "@types";
import {
  LayoutDashboard,
  Car,
  Calendar,
  DollarSign,
  Megaphone,
  Mail,
  CreditCard,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Check,
  X
} from "lucide-react";

interface AdminDashboardProps {
  carsList: CarProps[];
  onAddCar: (car: CarProps) => void;
  onDeleteCar: (id: string) => void;
  onCloseAdmin: () => void;
}

type TabType =
  | "overview"
  | "fleet"
  | "rentals"
  | "sales"
  | "ads"
  | "financing"
  | "inquiries"
  | "hubs";

export default function AdminDashboard({
  carsList,
  onAddCar,
  onDeleteCar,
  onCloseAdmin,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Live state
  const [bookings, setBookings] = useState<any[]>([
    {
      id: "BK-1001",
      customerName: "Michael Chang",
      customerEmail: "michael.c@example.com",
      carName: "2024 BMW M3 (G80)",
      startDate: "2026-10-10",
      days: 4,
      totalAmount: 1180,
      status: "Confirmed",
    },
    {
      id: "BK-1002",
      customerName: "Sarah Jenkins",
      customerEmail: "sarah.j@example.com",
      carName: "2024 Tesla Model 3 (Highland)",
      startDate: "2026-10-12",
      days: 3,
      totalAmount: 435,
      status: "Active",
    },
    {
      id: "BK-1003",
      customerName: "David Ross",
      customerEmail: "david.r@example.com",
      carName: "2023 Mercedes Benz C Class",
      startDate: "2026-10-15",
      days: 5,
      totalAmount: 625,
      status: "Pending",
    },
  ]);

  const [inquiries, setInquiries] = useState<any[]>([
    {
      id: "INQ-501",
      name: "David Ross",
      email: "dross@business.org",
      phone: "(718) 555 0173",
      subject: "Corporate Fleet Lease for 5 Vehicles",
      message: "Looking for long term corporate rate for executive rentals.",
      status: "New",
    },
    {
      id: "INQ-502",
      name: "Elena Rostova",
      email: "elena@example.com",
      phone: "(415) 555 0129",
      subject: "1992 Fox Body Mustang Purchase Consultation",
      message: "Interested in the authentic documentation and inspection records.",
      status: "In Review",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Add Car Modal / Form in Fleet Tab
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newYear, setNewYear] = useState(2024);
  const [newPrice, setNewPrice] = useState(75);
  const [newDrive, setNewDrive] = useState("awd");
  const [newClass, setNewClass] = useState("Sedan");

  // Advertising Campaigns state
  const [ads, setAds] = useState([
    {
      id: "AD-101",
      title: "Weekend Getaway 20% Off Luxury Fleet",
      placement: "Homepage Top Banner",
      status: "Active",
      impressions: 24500,
      clicks: 1420,
      budget: "$500",
    },
    {
      id: "AD-102",
      title: "Zero Down Payment Summer Financing Special",
      placement: "Catalog Header Banner",
      status: "Active",
      impressions: 18900,
      clicks: 980,
      budget: "$350",
    },
    {
      id: "AD-103",
      title: "Electric Vehicle Green Week Test Drives",
      placement: "Detail Page Sidebar",
      status: "Paused",
      impressions: 9400,
      clicks: 310,
      budget: "$200",
    },
  ]);

  // Car Sales & Consignments state
  const [salesListings, setSalesListings] = useState([
    {
      id: "SALE-801",
      vehicle: "2023 BMW M3 Competition",
      owner: "Robert Vance",
      askingPrice: "$78,500",
      status: "Under Review",
      mileage: "12,400 miles",
      submittedDate: "2026-09-28",
    },
    {
      id: "SALE-802",
      vehicle: "2024 Ford Mustang Dark Horse",
      owner: "Marcus Brody",
      askingPrice: "$59,000",
      status: "Verified & Listed",
      mileage: "4,800 miles",
      submittedDate: "2026-09-29",
    },
    {
      id: "SALE-803",
      vehicle: "2022 Porsche 911 Carrera",
      owner: "Claire Bennet",
      askingPrice: "$115,000",
      status: "Offer Accepted",
      mileage: "8,900 miles",
      submittedDate: "2026-09-30",
    },
  ]);

  // Financing Applications state
  const [financingApps, setFinancingApps] = useState([
    {
      id: "FIN-301",
      applicant: "Daniel Morales",
      email: "daniel.m@example.com",
      vehicle: "2024 Tesla Model 3",
      requestedAmount: "$36,000",
      creditScore: "765 (Excellent)",
      term: "48 Months",
      status: "Pre-Approved",
    },
    {
      id: "FIN-302",
      applicant: "Angela Davis",
      email: "angela.d@example.com",
      vehicle: "2023 Audi A4 Quattro",
      requestedAmount: "$28,500",
      creditScore: "710 (Good)",
      term: "60 Months",
      status: "Underwriting Review",
    },
    {
      id: "FIN-303",
      applicant: "Samuel Cooper",
      email: "sam.c@example.com",
      vehicle: "2023 Mercedes Benz C Class",
      requestedAmount: "$42,000",
      creditScore: "680 (Fair)",
      term: "72 Months",
      status: "Pending Docs",
    },
  ]);

  // Showroom Hubs state
  const [hubs, setHubs] = useState([
    {
      id: "HUB-1",
      name: "San Francisco International SFO",
      city: "San Francisco CA",
      address: "800 Airport Blvd Suite 200",
      capacity: "120 Cars",
      activeRentals: 42,
      status: "Open",
    },
    {
      id: "HUB-2",
      name: "Los Angeles International LAX",
      city: "Los Angeles CA",
      address: "9620 Aviation Blvd",
      capacity: "200 Cars",
      activeRentals: 88,
      status: "Open",
    },
    {
      id: "HUB-3",
      name: "New York JFK Terminal 4",
      city: "New York NY",
      address: "JFK Terminal 4 Ground Transportation",
      capacity: "150 Cars",
      activeRentals: 65,
      status: "Open",
    },
    {
      id: "HUB-4",
      name: "Miami International MIA",
      city: "Miami FL",
      address: "3900 NW 25th St Concierge Suite 10",
      capacity: "110 Cars",
      activeRentals: 38,
      status: "Open",
    },
  ]);

  useEffect(() => {
    fetchBookings();
    fetchInquiries();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setBookings(json.data);
      }
    } catch (err) {
      console.error("Failed to load bookings", err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setInquiries(json.data);
      }
    } catch (err) {
      console.error("Failed to load inquiries", err);
    }
  };

  const handleBookingStatus = async (id: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    try {
      await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleAddCarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMake || !newModel) return;

    onAddCar({
      id: `admin_car_${Date.now()}`,
      make: newMake,
      model: newModel,
      year: Number(newYear),
      price: Number(newPrice),
      drive: newDrive,
      class: newClass,
      city_mpg: 28,
      combination_mpg: 32,
      highway_mpg: 36,
      cylinders: 4,
      displacement: 2.0,
      fuel_type: "gas",
      transmission: "a",
      status: "available",
    });

    setNewMake("");
    setNewModel("");
    setShowAddCarModal(false);
  };

  const toggleAdStatus = (id: string) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id
          ? { ...ad, status: ad.status === "Active" ? "Paused" : "Active" }
          : ad
      )
    );
  };

  const handleSaleStatusChange = (id: string, newStatus: string) => {
    setSalesListings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "fleet", label: "Fleet Inventory", count: carsList.length, icon: Car },
    { id: "rentals", label: "Rental Reservations", count: bookings.length, icon: Calendar },
    { id: "sales", label: "Car Sales & Consign", count: salesListings.length, icon: DollarSign },
    { id: "ads", label: "Advertising & Promo", count: ads.length, icon: Megaphone },
    { id: "financing", label: "Financing Requests", count: financingApps.length, icon: CreditCard },
    { id: "inquiries", label: "Customer Inquiries", count: inquiries.length, icon: Mail },
    { id: "hubs", label: "Hub Locations", count: hubs.length, icon: MapPin },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-xs">
              D
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white block">
                Drive<span className="text-blue-500">Nest</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Admin Console
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="p-3 bg-slate-800/60 rounded-xl mb-3">
            <p className="text-[11px] font-bold text-white">Database Connected</p>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">MongoDB Persistent Storage</p>
          </div>
          <button
            type="button"
            onClick={onCloseAdmin}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
          >
            Exit Admin Console
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black text-slate-900 capitalize">
              {activeTab === "overview" && "Executive Operations Dashboard"}
              {activeTab === "fleet" && "Vehicle Fleet Inventory"}
              {activeTab === "rentals" && "Rental Reservations Management"}
              {activeTab === "sales" && "Direct Vehicle Sales & Consignments"}
              {activeTab === "ads" && "Promotions & Advertising Campaigns"}
              {activeTab === "financing" && "Financing Applications & Credit Inquiries"}
              {activeTab === "inquiries" && "Customer Concierge Inquiries"}
              {activeTab === "hubs" && "Airport & Showroom Hub Locations"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search platform..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 w-64"
              />
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>View Live Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Rental Revenue</p>
                  <p className="text-3xl font-black text-slate-900 mt-2">$214,800</p>
                  <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% from last month</span>
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fleet Inventory Count</p>
                  <p className="text-3xl font-black text-slate-900 mt-2">{carsList.length} Vehicles</p>
                  <p className="text-xs font-bold text-blue-600 mt-2">1990 to 2026 Production</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Reservations</p>
                  <p className="text-3xl font-black text-slate-900 mt-2">{bookings.length} Bookings</p>
                  <p className="text-xs font-bold text-emerald-600 mt-2">Saved Permanently</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consignment Sales Value</p>
                  <p className="text-3xl font-black text-slate-900 mt-2">$252,500</p>
                  <p className="text-xs font-bold text-slate-500 mt-2">3 Pending Submissions</p>
                </div>
              </div>

              {/* Quick Actions & Recent Bookings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Bookings (7 cols) */}
                <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-black text-slate-900">Recent Customer Bookings</h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("rentals")}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 text-xs">
                    {bookings.slice(0, 4).map((b) => (
                      <div key={b.id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-900">{b.carName}</p>
                          <p className="text-slate-400 text-[11px]">{b.customerName} ({b.days} days)</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-blue-600">${b.totalAmount}</p>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 uppercase">
                            {b.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System & Marketing Status (5 cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-4">
                  <h2 className="text-base font-black text-slate-900">Active Ad Campaigns</h2>
                  <div className="space-y-3">
                    {ads.map((ad) => (
                      <div key={ad.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-900">{ad.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{ad.placement}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${ad.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-200 text-slate-600"}`}>
                          {ad.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLEET INVENTORY */}
          {activeTab === "fleet" && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Vehicle Inventory ({carsList.length} Total)</h2>
                  <p className="text-xs text-slate-500">Real manufacturer models with backgroundless photos.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddCarModal(!showAddCarModal)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddCarModal ? "Close Form" : "Add Vehicle to Fleet"}</span>
                </button>
              </div>

              {/* Inline Add Car Form */}
              {showAddCarModal && (
                <form onSubmit={handleAddCarSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-6 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Make</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Toyota"
                      value={newMake}
                      onChange={(e) => setNewMake(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Model</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Supra"
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Year</label>
                    <input
                      type="number"
                      value={newYear}
                      onChange={(e) => setNewYear(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Daily Price ($)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Drivetrain</label>
                    <select
                      value={newDrive}
                      onChange={(e) => setNewDrive(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      <option value="fwd">FWD</option>
                      <option value="rwd">RWD</option>
                      <option value="awd">AWD</option>
                      <option value="4wd">4WD</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Save to Database
                  </button>
                </form>
              )}

              {/* Fleet Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                      <th className="py-3 px-4">Vehicle Model</th>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Body Style</th>
                      <th className="py-3 px-4">Drivetrain</th>
                      <th className="py-3 px-4">Daily Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {carsList.map((car, idx) => (
                      <tr key={car.id || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 capitalize">
                          {car.make} {car.model}
                        </td>
                        <td className="py-3.5 px-4">{car.year}</td>
                        <td className="py-3.5 px-4 capitalize">{car.class || "Sedan"}</td>
                        <td className="py-3.5 px-4 uppercase">{car.drive}</td>
                        <td className="py-3.5 px-4 font-bold text-blue-600">${car.price || 65} / day</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 uppercase">
                            Available
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {car.id && (
                            <button
                              type="button"
                              onClick={() => onDeleteCar(car.id!)}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: RENTALS */}
          {activeTab === "rentals" && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
              <h2 className="text-lg font-black text-slate-900">Active Customer Reservations</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Car Model</th>
                      <th className="py-3 px-4">Dates</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {bookings.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{item.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{item.customerName || item.customer}</div>
                          <div className="text-[10px] text-slate-400">{item.customerEmail || ""}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold">{item.carName || item.vehicle}</td>
                        <td className="py-3.5 px-4">{item.startDate ? `${item.startDate} (${item.days} days)` : item.date}</td>
                        <td className="py-3.5 px-4 font-extrabold text-blue-600">${item.totalAmount || item.amount}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                              item.status === "Confirmed" || item.status === "Active"
                                ? "bg-emerald-50 text-emerald-600"
                                : item.status === "Completed"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleBookingStatus(item.id, "Confirmed")}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleBookingStatus(item.id, "Cancelled")}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CAR SALES & CONSIGNMENTS */}
          {activeTab === "sales" && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Direct Vehicle Sales & Consignments</h2>
                  <p className="text-xs text-slate-500">Vehicles submitted by sellers via Sell Your Car.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                      <th className="py-3 px-4">Consignment ID</th>
                      <th className="py-3 px-4">Vehicle Model</th>
                      <th className="py-3 px-4">Owner Name</th>
                      <th className="py-3 px-4">Mileage</th>
                      <th className="py-3 px-4">Asking Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {salesListings.map((sale) => (
                      <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{sale.id}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">{sale.vehicle}</td>
                        <td className="py-3.5 px-4">{sale.owner}</td>
                        <td className="py-3.5 px-4">{sale.mileage}</td>
                        <td className="py-3.5 px-4 font-extrabold text-blue-600">{sale.askingPrice}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            sale.status === "Verified & Listed"
                              ? "bg-emerald-50 text-emerald-600"
                              : sale.status === "Offer Accepted"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-amber-50 text-amber-600"
                          }`}>
                            {sale.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleSaleStatusChange(sale.id, "Verified & Listed")}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg cursor-pointer"
                            >
                              Verify & List
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaleStatusChange(sale.id, "Rejected")}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: ADS & PROMOS */}
          {activeTab === "ads" && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Promotions & Advertising Manager</h2>
                  <p className="text-xs text-slate-500">Manage hero promotional banners, sponsored car cards, and seasonal deals.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ads.map((ad) => (
                  <div key={ad.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{ad.placement}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${ad.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-200 text-slate-600"}`}>
                          {ad.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mt-1">{ad.title}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-semibold text-slate-500">
                        <div>
                          <p className="text-[10px] uppercase text-slate-400">Impressions</p>
                          <p className="text-slate-800 font-bold mt-0.5">{ad.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-slate-400">Clicks</p>
                          <p className="text-slate-800 font-bold mt-0.5">{ad.clicks.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleAdStatus(ad.id)}
                      className={`mt-6 w-full py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        ad.status === "Active"
                          ? "bg-slate-200 hover:bg-slate-300 text-slate-700"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {ad.status === "Active" ? "Pause Campaign" : "Activate Campaign"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FINANCING */}
          {activeTab === "financing" && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
              <h2 className="text-lg font-black text-slate-900">Pre-Approval Financing Applications</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                      <th className="py-3 px-4">App ID</th>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Vehicle</th>
                      <th className="py-3 px-4">Requested Amount</th>
                      <th className="py-3 px-4">Credit Tier</th>
                      <th className="py-3 px-4">Term</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {financingApps.map((fin) => (
                      <tr key={fin.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{fin.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{fin.applicant}</div>
                          <div className="text-[10px] text-slate-400">{fin.email}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold">{fin.vehicle}</td>
                        <td className="py-3.5 px-4 font-extrabold text-blue-600">{fin.requestedAmount}</td>
                        <td className="py-3.5 px-4">{fin.creditScore}</td>
                        <td className="py-3.5 px-4">{fin.term}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            fin.status === "Pre-Approved"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-blue-50 text-blue-600"
                          }`}>
                            {fin.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
              <h2 className="text-lg font-black text-slate-900">Customer Concierge Inquiries</h2>

              <div className="space-y-4">
                {inquiries.map((msg) => (
                  <div key={msg.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-start text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{msg.name}</span>
                        <span className="text-[10px] text-slate-400">({msg.email})</span>
                        <span className="text-[10px] text-slate-400">{msg.phone || ""}</span>
                      </div>
                      <p className="text-xs font-bold text-blue-600 mt-1">{msg.subject}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{msg.message}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-600 uppercase">
                      {msg.status || "New"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: HUBS */}
          {activeTab === "hubs" && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/70 shadow-xs space-y-6">
              <h2 className="text-lg font-black text-slate-900">Airport & Showroom Hub Locations</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hubs.map((hub) => (
                  <div key={hub.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-slate-900 text-sm">{hub.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 uppercase">
                        {hub.status}
                      </span>
                    </div>
                    <p className="text-slate-500 font-semibold">{hub.address}</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200">
                      <div>
                        <p className="text-[10px] uppercase text-slate-400">Fleet Capacity</p>
                        <p className="font-bold text-slate-800 mt-0.5">{hub.capacity}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-400">Active Rentals</p>
                        <p className="font-bold text-blue-600 mt-0.5">{hub.activeRentals} Cars Out</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
