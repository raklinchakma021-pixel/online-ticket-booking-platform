import React from "react";
import { getAdvertisedTickets } from "@/lib/api/tickets";
import { Chip } from "@heroui/react";

const AdvertisementSection = async () => {
  const tickets = await getAdvertisedTickets();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">

      {/* Section Title */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Advertisement Tickets
        </h2>

        <p className="text-sm text-neutral-400">
          Featured tickets selected by admin
        </p>
      </div>

      {/* Empty state */}
      {tickets.length === 0 ? (
        <div className="text-neutral-500">
          No advertised tickets available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-[#121214] border border-neutral-800 rounded-xl p-5 space-y-3 hover:border-neutral-700 transition"
            >

              {/* Title */}
              <h3 className="text-lg font-semibold text-white">
                {ticket.ticketTitle}
              </h3>

              {/* Route */}
              <p className="text-sm text-neutral-400">
                {ticket.from} → {ticket.to}
              </p>

              {/* Info Row */}
              <div className="flex justify-between text-sm text-neutral-300">
                <span>💰 ৳{ticket.price}</span>
                <span>🎟 {ticket.quantity} seats</span>
              </div>

              {/* Transport */}
              <p className="text-xs text-neutral-500 capitalize">
                {ticket.transportType}
              </p>

              {/* Status badge */}
              <Chip size="sm" color="success" variant="flat">
                Featured
              </Chip>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default AdvertisementSection;