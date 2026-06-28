"use client";

import React, { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
// import { Search } from "@gravity-ui/icons";
import { SearchCheckIcon } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: "Travel Across Bangladesh",
    subtitle:
      "Bus • Train • Flight • Launch tickets in one place",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
    title: "Book Faster, Travel Smarter",
    subtitle:
      "Instant booking with secure payment and verified vendors",
  },
  {
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    title: "Your Journey Starts Here",
    subtitle:
      "Discover thousands of routes across the country",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
<section className="relative min-h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            current === index
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
        >
      <img
  src={slide.image}
  alt={slide.title}
  className="w-full h-full object-cover"
/>

          <div className="absolute inset-0 bg-black/65" />
        </div>
      ))}

      {/* Content */}
     <div className="relative z-10 min-h-screen flex items-center py-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-2 text-xs sm:text-sm rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
              🇧🇩 Bangladesh's Smart Ticket Marketplace
            </span>
<h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {slides[current].title}
            </h1>
<p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl">
              {slides[current].subtitle}
            </p>
          </div>

          {/* Search Card */}
      <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                size="lg"
                placeholder="From"
                variant="bordered"
              />

              <Input
                size="lg"
                placeholder="To"
                variant="bordered"
              />

              <Input
                size="lg"
                type="date"
                variant="bordered"
              />

           <Link
  href="/tickets"
  className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl px-4 py-3 font-medium"
>
  <SearchCheckIcon size={18} />
  Search Tickets
</Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-5 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                10K+
              </h3>
              <p className="text-gray-300">
                Bookings
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                500+
              </h3>
              <p className="text-gray-300">
                Routes
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                100+
              </h3>
              <p className="text-gray-300">
                Vendors
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center">
             <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                24/7
              </h3>
              <p className="text-gray-300">
                Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index
                ? "bg-white w-8"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;