import React from "react";
import { getTicketById } from "@/lib/api/tickets";
import { Button, Link } from "@heroui/react";
import {
  MapPin,
  Calendar,
  CircleDollar,
  ArrowRight,
} from "@gravity-ui/icons";

const Page = async ({ params }) => {
  const { id } = await params;

  const ticket = await getTicketById(id);

  if (!ticket) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        Ticket not found.
      </div>
    );
  }

  const departureDate = new Date(
    ticket.departureDate
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {ticket.image && (
            <img
              src={ticket.image}
              alt={ticket.ticketTitle}
              className="w-full h-[400px] object-cover rounded-3xl"
            />
          )}

          <div>
            <h1 className="text-4xl font-bold">
              {ticket.ticketTitle}
            </h1>

            <p className="text-zinc-400 mt-3">
              {ticket.from} → {ticket.to}
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Route Information
            </h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <p>
                Departure from{" "}
                <span className="font-semibold">
                  {ticket.from}
                </span>{" "}
                and arrival at{" "}
                <span className="font-semibold">
                  {ticket.to}
                </span>
              </p>
            </div>
          </section>

          {ticket.perks?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">
                Perks Included
              </h2>

              <div className="flex flex-wrap gap-3">
                {ticket.perks.map((perk) => (
                  <span
                    key={perk}
                    className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </section>
          )}

          {ticket.description && (
            <section>
              <h2 className="text-xl font-semibold mb-3">
                Description
              </h2>

              <p className="text-zinc-300 leading-relaxed">
                {ticket.description}
              </p>
            </section>
          )}
        </div>

        {/* RIGHT SIDE */}
        <aside className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 h-fit lg:sticky lg:top-8">

          <h3 className="text-xl font-semibold mb-6">
            Ticket Information
          </h3>

          <div className="space-y-5">

            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-purple-400" />

              <div>
                <p className="text-xs text-zinc-500">
                  Route
                </p>

                <p>
                  {ticket.from} → {ticket.to}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-purple-400" />

              <div>
                <p className="text-xs text-zinc-500">
                  Departure Date
                </p>

                <p>{departureDate}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CircleDollar className="w-5 h-5 text-purple-400" />

              <div>
                <p className="text-xs text-zinc-500">
                  Ticket Price
                </p>

                <p>৳{ticket.price}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Transport Type
              </p>

              <p className="capitalize">
                {ticket.transportType}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Available Seats
              </p>

              <p>{ticket.quantity}</p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Vendor
              </p>

              <p>{ticket.vendorName}</p>
            </div>
          </div>

          <Link
          
            href={`/tickets/${id}/booking`}
            className="w-full mt-8 bg-white text-black"
            endContent={<ArrowRight />}
          >
            Book Now
          </Link>
        </aside>

      </div>
    </main>
  );
};

export default Page;