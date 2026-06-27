import React from "react";
import { Card, Button } from "@heroui/react";
import {
  ArrowRight,
  Calendar,
  MapPin,
} from "@gravity-ui/icons";
import Link from "next/link";

export default function TicketCard({ ticket }) {
  if (!ticket) return null;

  const ticketId = ticket._id?.$oid || ticket._id;

  return (
    <Card className="overflow-hidden bg-zinc-900 border border-zinc-800 text-white rounded-3xl">

      {/* Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.ticketTitle}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">

        <div>
          <h2 className="text-xl font-bold">
            {ticket.ticketTitle}
          </h2>

          <p className="text-zinc-400 text-sm">
            by {ticket.vendorName}
          </p>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 text-zinc-300">
          <MapPin size={16} />
          <span>
            {ticket.from} → {ticket.to}
          </span>
        </div>

        {/* Departure */}
        <div className="flex items-center gap-2 text-zinc-300">
          <Calendar size={16} />
          <span>
            {ticket.departureDate}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">

          <span className="px-3 py-1 rounded-full bg-zinc-800 text-sm">
            {ticket.transportType}
          </span>

          <span className="px-3 py-1 rounded-full bg-zinc-800 text-sm">
            {ticket.quantity} Seats
          </span>

          {ticket.perks?.map((perk) => (
            <span
              key={perk}
              className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs"
            >
              {perk}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-zinc-800">

          <div>
            <p className="text-zinc-500 text-xs">
              Price
            </p>

            <h3 className="text-2xl font-bold">
              ৳{ticket.price}
            </h3>
          </div>

          <Link
            
            href={`/tickets/${ticketId}`}
            className="bg-white text-black px-3 items-center justify-center py-2 rounded-sm flex "
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}