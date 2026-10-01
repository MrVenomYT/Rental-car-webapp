"use client";

import { useState } from "react";
import Link from "next/link";
import { comprehensiveVehicleCatalog, structuredToCarProps } from "../../data/vehicleCatalog";
import { CarProps } from "@types";
import AdminDashboard from "@components/AdminDashboard";
import NavBar from "@components/Navbar";
import Footer from "@components/Footer";

export default function AdminPage() {
  const [carsList, setCarsList] = useState<CarProps[]>(
    comprehensiveVehicleCatalog.map(structuredToCarProps)
  );

  const handleAddCar = (newCar: CarProps) => {
    setCarsList((prev) => [newCar, ...prev]);
  };

  const handleDeleteCar = (id: string) => {
    setCarsList((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar isAdminActive={true} />

      <AdminDashboard
        carsList={carsList}
        onAddCar={handleAddCar}
        onDeleteCar={handleDeleteCar}
        onCloseAdmin={() => {
          window.location.href = "/";
        }}
      />

      <Footer />
    </main>
  );
}
