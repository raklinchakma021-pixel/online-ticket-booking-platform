"use client";

import React, { useState, useMemo } from "react";
import TicketCard from "@/components/tickets/TicketCard";
import TicketFilters from "@/components/tickets/TicketFilters";

export default function TicketListingContainer({
  initialTickets,
}) {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [transportType, setTransportType] =
    useState("all");

  const [priceFilter, setPriceFilter] =
    useState("all");
    const [selectedLocation, setSelectedLocation] =
  useState("");

const [availableOnly, setAvailableOnly] =
  useState(false);

 const filteredTickets = useMemo(() => {
  return initialTickets.filter((ticket) => {
    const matchesSearch =
      ticket.ticketTitle
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      ticket.from
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      ticket.to
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesTransport =
      transportType === "all" ||
      ticket.transportType === transportType;

    const matchesPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "under500"
        ? ticket.price < 500
        : priceFilter === "500to1000"
        ? ticket.price >= 500 &&
          ticket.price <= 1000
        : ticket.price > 1000;

    const matchesLocation =
      !selectedLocation ||
      ticket.from
        ?.toLowerCase()
        .includes(
          selectedLocation.toLowerCase()
        );

    const matchesAvailability =
      !availableOnly ||
      ticket.quantity > 0;

    return (
      matchesSearch &&
      matchesTransport &&
      matchesPrice &&
      matchesLocation &&
      matchesAvailability
    );
  });
}, [
  initialTickets,
  searchQuery,
  transportType,
  priceFilter,
  selectedLocation,
  availableOnly,
]);

  return (
    <>
      <TicketFilters
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  transportType={transportType}
  setTransportType={setTransportType}
  priceFilter={priceFilter}
  setPriceFilter={setPriceFilter}
  selectedLocation={selectedLocation}
  setSelectedLocation={setSelectedLocation}
  availableOnly={availableOnly}
  setAvailableOnly={setAvailableOnly}
/>

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
        Showing {filteredTickets.length}
        {" "}
        ticket
        {filteredTickets.length !== 1 &&
          "s"}
      </div>

      {filteredTickets.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map(
            (ticket) => (
              <TicketCard
                key={
                  ticket._id?.$oid ||
                  ticket._id
                }
                ticket={ticket}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">
            No tickets match your
            search criteria.
          </p>
        </div>
      )}
    </>
  );
}