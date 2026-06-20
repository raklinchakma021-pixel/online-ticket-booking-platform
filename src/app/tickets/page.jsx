import TicketListingContainer from "@/components/tickets/TicketListingContainer";
import { getTickets } from "@/lib/api/tickets";

export default async function Page() {
  const tickets = await getTickets();

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Available Tickets
        </h1>

        <p className="text-zinc-400 mt-2">
          Find and book your next journey.
        </p>
      </div>

      <TicketListingContainer
        initialTickets={tickets || []}
      />
    </div>
  );
}