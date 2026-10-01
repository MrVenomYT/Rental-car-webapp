"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, CheckCircle2, Clock, Headphones } from "lucide-react";
import NavBar from "@components/Navbar";
import Footer from "@components/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Vehicle Rental Reservation");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const locations = [
    {
      city: "San Francisco CA",
      address: "800 Airport Blvd Suite 200",
      phone: "(415) 555 0192",
      hours: "7:00 AM to 11:00 PM Daily",
    },
    {
      city: "Los Angeles CA",
      address: "9620 Aviation Blvd",
      phone: "(310) 555 0148",
      hours: "24 Hours Daily",
    },
    {
      city: "New York NY",
      address: "JFK Terminal 4 Ground Transportation",
      phone: "(718) 555 0173",
      hours: "24 Hours Daily",
    },
    {
      city: "Miami FL",
      address: "3900 NW 25th St Concierge Suite 10",
      phone: "(305) 555 0134",
      hours: "6:00 AM to Midnight Daily",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />

      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto padding-x">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs uppercase tracking-wider border border-blue-100">
            Customer Support & Showroom Hubs
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight">
            Contact DriveNest Concierge
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal">
            Have questions about a specific vehicle generation, long-term booking, or consignment? Our automotive concierge team is available 24/7.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto padding-x py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h2 className="text-2xl font-black text-slate-900 mt-4">Inquiry Received!</h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you {name}. A dedicated automotive advisor will review your message and respond within 30 minutes at {email}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Send an Inquiry</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Direct message our concierge headquarters.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(888) 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    >
                      <option value="Vehicle Rental Reservation">Vehicle Rental Reservation</option>
                      <option value="Vehicle Purchase or Consignment">Vehicle Purchase or Consignment</option>
                      <option value="Fleet or Corporate Inquiry">Fleet or Corporate Inquiry</option>
                      <option value="Financing Consultation">Financing Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the vehicle model, dates, or specifications you are interested in..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Nationwide Hubs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4">Direct Contact</h3>

              <div className="space-y-4 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Toll Free Support</p>
                    <p className="text-sm font-black text-slate-900">(888) 123 4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Concierge Inbox</p>
                    <p className="text-sm font-black text-slate-900">concierge@drivenest.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Live Support Hours</p>
                    <p className="text-sm font-black text-slate-900">24/7/365 Dedicated Coverage</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4">Airport & City Hubs</h3>

              <div className="space-y-4 text-xs">
                {locations.map((loc) => (
                  <div key={loc.city} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{loc.city}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{loc.address}</p>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400">
                      <span>{loc.phone}</span>
                      <span className="font-semibold text-slate-600">{loc.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
