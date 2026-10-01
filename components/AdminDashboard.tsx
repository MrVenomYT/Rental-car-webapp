"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CarProps } from "@types";

interface AdminDashboardProps {
  carsList: CarProps[];
  onAddCar: (car: CarProps) => void;
  onDeleteCar: (id: string) => void;
  onCloseAdmin: () => void;
}

const initialBookings = [
  { id: "RES_101", customer: "Sarah L.", vehicle: "2023 BMW M3", date: "Oct 5 to Oct 8", amount: "$294", status: "Active" },
  { id: "RES_102", customer: "Michael T.", vehicle: "2022 Toyota Corolla", date: "Oct 6 to Oct 9", amount: "$150", status: "Pending" },
  { id: "RES_103", customer: "David K.", vehicle: "2023 Tesla Model Y", date: "Oct 2 to Oct 4", amount: "$260", status: "Completed" },
  { id: "RES_104", customer: "Elena R.", vehicle: "2022 Honda Accord", date: "Oct 10 to Oct 15", amount: "$350", status: "Pending" },
];

const AdminDashboard = ({ carsList, onAddCar, onDeleteCar, onCloseAdmin }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"fleet" | "bookings" | "inquiries">("fleet");
  const [bookings, setBookings] = useState(initialBookings);

  // New Car form inline
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newYear, setNewYear] = useState(2024);
  const [newPrice, setNewPrice] = useState(65);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMake || !newModel) return;

    onAddCar({
      make: newMake,
      model: newModel,
      year: Number(newYear),
      price: Number(newPrice),
      city_mpg: 28,
      combination_mpg: 32,
      highway_mpg: 36,
      cylinders: 4,
      displacement: 2.0,
      drive: "awd",
      fuel_type: "gas",
      transmission: "a",
      class: "sedan",
      id: `admin_car_${Date.now()}`,
      status: "available",
    });

    setNewMake("");
    setNewModel("");
    setShowAddForm(false);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto padding-x py-10 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs mb-8">
        <div>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-lg uppercase tracking-wider">
            Admin Management Console
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">DriveNest Operations Portal</h1>
        </div>

        <button
          type="button"
          onClick={onCloseAdmin}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Exit Admin Mode
        </button>
      </div>

      {/* High-Level Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Rental Revenue</p>
          <p className="text-3xl font-black text-slate-900 mt-2">$148,500</p>
          <span className="text-xs font-bold text-emerald-600 inline-block mt-2">+12.4% this month</span>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Rentals</p>
          <p className="text-3xl font-black text-slate-900 mt-2">42 Vehicles</p>
          <span className="text-xs font-bold text-blue-600 inline-block mt-2">85% Fleet Utilization</span>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Fleet Inventory</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{carsList.length} Cars</p>
          <span className="text-xs font-bold text-slate-500 inline-block mt-2">Verified Vehicles</span>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Inquiries</p>
          <p className="text-3xl font-black text-slate-900 mt-2">8 Requests</p>
          <span className="text-xs font-bold text-amber-600 inline-block mt-2">Requires Review</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("fleet")}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
            activeTab === "fleet"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Fleet Inventory Management
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
            activeTab === "bookings"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Customer Bookings
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("inquiries")}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
            activeTab === "inquiries"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Customer Inquiries
        </button>
      </div>

      {/* Tab 1: Fleet Management Table */}
      {activeTab === "fleet" && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg font-black text-slate-900">Vehicle Inventory Overview</h2>

            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {showAddForm ? "Close Form" : "+ Add New Vehicle"}
            </button>
          </div>

          {/* Add Car Form */}
          {showAddForm && (
            <form onSubmit={handleAddSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Make</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BMW"
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
                  placeholder="e.g. M3"
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
                <label className="block text-xs font-bold text-slate-600 mb-1">Price per day ($)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Save Vehicle
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Drivetrain</th>
                  <th className="py-3 px-4">Daily Rate</th>
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
                    <td className="py-3.5 px-4 uppercase">{car.drive}</td>
                    <td className="py-3.5 px-4 font-bold text-blue-600">
                      ${car.price || 65} / day
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 uppercase">
                        Available
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {car.id && (
                        <button
                          type="button"
                          onClick={() => onDeleteCar(car.id!)}
                          className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg transition-colors cursor-pointer"
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

      {/* Tab 2: Bookings Management */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6">
          <h2 className="text-lg font-black text-slate-900 mb-6">Customer Reservations</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Reserved Car</th>
                  <th className="py-3 px-4">Rental Window</th>
                  <th className="py-3 px-4">Total Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Approve Reject</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {bookings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{item.id}</td>
                    <td className="py-3.5 px-4">{item.customer}</td>
                    <td className="py-3.5 px-4 font-bold">{item.vehicle}</td>
                    <td className="py-3.5 px-4">{item.date}</td>
                    <td className="py-3.5 px-4 font-extrabold text-blue-600">{item.amount}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          item.status === "Active"
                            ? "bg-blue-50 text-blue-600"
                            : item.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600"
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
                          onClick={() => handleStatusChange(item.id, "Active")}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(item.id, "Rejected")}
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

      {/* Tab 3: Inquiries */}
      {activeTab === "inquiries" && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6">
          <h2 className="text-lg font-black text-slate-900 mb-4">Inquiries and Messages</h2>
          <div className="space-y-3">
            {[
              { name: "John Miller", email: "john@example.com", text: "Inquiring about weekly rates for BMW M3." },
              { name: "Jessica Alba", email: "jessica@example.com", text: "Is Tesla Model Y available for long road trips?" },
            ].map((msg, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900 text-xs">{msg.name} ({msg.email})</p>
                  <p className="text-xs text-slate-600 mt-1">{msg.text}</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Reply
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
