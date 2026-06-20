"use client";

import React from "react";
import { Magnifier } from "@gravity-ui/icons";

export default function TicketFilters({
  searchQuery,
  setSearchQuery,
  transportType,
  setTransportType,
  priceFilter,
  setPriceFilter,
  selectedLocation,
setSelectedLocation,
availableOnly,
setAvailableOnly
}) {
  return (
    <div className="max-w-7xl mx-auto mb-10 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Search Tickets
          </label>

          <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-xl px-3">
            <Magnifier className="w-4 h-4 text-zinc-500" />

            <input
              type="text"
              placeholder="Ticket, From, To..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full bg-transparent py-3 outline-none text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Transport Type */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Transport Type
          </label>

          <select
            value={transportType}
            onChange={(e) =>
              setTransportType(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
          >
            <option value="all">
              All Transport
            </option>

            <option value="bus">
              Bus
            </option>

            <option value="train">
              Train
            </option>

            <option value="flight">
              Flight
            </option>

            <option value="launch">
              Launch
            </option>
          </select>
        </div>

        {/* From Location */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Departure Location
          </label>

          <input
            type="text"
            placeholder="Ex: Chattogram"
            value={selectedLocation}
            onChange={(e) =>
              setSelectedLocation(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none placeholder:text-zinc-500"
          />
        </div>

        {/* Available Only */}
        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) =>
                setAvailableOnly(e.target.checked)
              }
              className="w-4 h-4"
            />

            <span className="text-zinc-300">
              Available Tickets Only
            </span>
          </label>
        </div>

      </div>
    </div>
  );
}