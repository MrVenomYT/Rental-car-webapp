"use client";

import { Star, User } from "lucide-react";

const reviews = [
  {
    name: "Michael T.",
    location: "New York NY",
    rating: 5,
    text: "Found my dream car with DriveNest! The process was smooth, transparent, and the car quality is excellent. Highly recommended!",
  },
  {
    name: "Sarah L.",
    location: "Los Angeles CA",
    rating: 5,
    text: "Great selection of cars and amazing customer service. They helped me get financing quickly and made the whole experience easy.",
  },
  {
    name: "David K.",
    location: "Chicago IL",
    rating: 5,
    text: "Sold my car in just 2 days through DriveNest. Got a great price and did not have to deal with any hassle. Fantastic platform!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto padding-x">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">What Our Customers Say</h2>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Real feedback from verified vehicle buyers and renters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{rev.name}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
