"use client";

import { ShieldCheck, Tag, Lock, CreditCard, Headphones } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Verified Listings",
      desc: "All cars are inspected and verified for your peace of mind.",
      icon: ShieldCheck,
    },
    {
      title: "Best Price Guarantee",
      desc: "Get the best value with our market price promise.",
      icon: Tag,
    },
    {
      title: "Secure Transactions",
      desc: "Safe, transparent, and hassle free buying experience.",
      icon: Lock,
    },
    {
      title: "Easy Financing",
      desc: "Flexible financing options tailored to your needs.",
      icon: CreditCard,
    },
    {
      title: "24/7 Support",
      desc: "Our support team is here to help you anytime.",
      icon: Headphones,
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-[1440px] mx-auto padding-x">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Why Buy With DriveNest?</h2>
          <p className="text-xs text-slate-500 font-medium mt-2">
            The premier trusted platform for vehicle purchase, sales, and rentals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col items-start gap-3 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
