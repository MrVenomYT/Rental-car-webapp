"use client";

import { useState } from "react";
import { comprehensiveVehicleCatalog, structuredToCarProps } from "../../data/vehicleCatalog";
import { CarProps } from "@types";
import AdminDashboard from "@components/AdminDashboard";

export default function AdminPage() {
  const [carsList, setCarsList] = useState<CarProps[]>(
    comprehensiveVehicleCatalog.map(structuredToCarProps)
  );

  const handleAddCar = async (newCar: CarProps) => {
    setCarsList((prev) => [newCar, ...prev]);
    try {
      await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
    } catch (err) {
      console.error("Failed to persist car", err);
    }
  };

  const handleDeleteCar = async (id: string) => {
    setCarsList((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`/api/cars?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete car", err);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <AdminDashboard
        carsList={carsList}
        onAddCar={handleAddCar}
        onDeleteCar={handleDeleteCar}
        onCloseAdmin={() => {
          window.location.href = "/";
        }}
      />
    </main>
  );
}
