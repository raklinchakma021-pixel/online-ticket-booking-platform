"use client";

import React, {
  useState,
  useMemo,
  useEffect,
} from "react";
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
  const [sortByPrice, setSortByPrice] =
  useState("default");
const [currentPage, setCurrentPage] =
  useState(1);

const ticketsPerPage = 6;
useEffect(() => {
  setCurrentPage(1);
}, [
  searchQuery,
  transportType,
  priceFilter,
  selectedLocation,
  availableOnly,
  sortByPrice
]);
const filteredTickets = useMemo(() => {
  
  const filtered = initialTickets.filter((ticket) => {
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

  if (sortByPrice === "low-high") {
    filtered.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }
   if (sortByPrice === "high-low") {
    filtered.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  return filtered;
}, [
  initialTickets,
  searchQuery,
  transportType,
  priceFilter,
  selectedLocation,
  availableOnly,
  sortByPrice,
]);
const totalPages = Math.ceil(
  filteredTickets.length / ticketsPerPage
);

const startIndex =
  (currentPage - 1) * ticketsPerPage;

const paginatedTickets =
  filteredTickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  );

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
   sortByPrice={sortByPrice}
  setSortByPrice={setSortByPrice}
/>

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
     Showing{" "}
{startIndex + 1}
-
{Math.min(
  startIndex + ticketsPerPage,
  filteredTickets.length
)}
 of {filteredTickets.length} tickets
        
        {filteredTickets.length !== 1 &&
          "s"}
      </div>

      {filteredTickets.length > 0 ? (
       <>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTickets.map((ticket) => (
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

        {totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.max(prev - 1, 1)
        )
      }
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-xl bg-zinc-800 disabled:opacity-40"
    >
      Previous
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() =>
          setCurrentPage(index + 1)
        }
        className={`px-4 py-2 rounded-xl ${
          currentPage === index + 1
            ? "bg-white text-black"
            : "bg-zinc-800 text-white"
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-xl bg-zinc-800 disabled:opacity-40"
    >
      Next
    </button>

  </div>
)}
       </>
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