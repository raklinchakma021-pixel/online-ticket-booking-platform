import { getTicketById } from "@/lib/api/tickets";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import {

  CircleInfo,
  ShieldExclamation,
} from "@gravity-ui/icons";
import TicketBookingForm from "./TicketBookingForm ";

const BookingPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/tickets/${id}/booking`);
  }

     // Auth Role Guard Screen
    if (user.role !== 'user') {
        return (
            <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
                <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldExclamation className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Only user can book for tickets. Please sign in with a user account to proceed.
                    </p>
                    <Link 
                        href="/auth/signin" 
                        className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition"
                    >
                        Switch Account
                    </Link>
                </div>
            </div>
        );
    }

  const ticket = await getTicketById(id);

  if (!ticket) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Ticket Not Found
          </h2>
          <p className="text-zinc-400 mt-2">
            This ticket may have been removed.
          </p>
        </div>
      </div>
    );
  }

  const isAvailable = ticket.quantity > 0;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Ticket Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold">
            {ticket.ticketTitle}
          </h2>

          <p className="text-zinc-400 mt-2">
            {ticket.from} → {ticket.to}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <div>
              <p className="text-xs text-zinc-500">
                Transport
              </p>
              <p className="capitalize">
                {ticket.transportType}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Price
              </p>
              <p>৳{ticket.price}</p>
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
        </div>

        {/* Out Of Stock */}
        {!isAvailable ? (
          <div className="bg-zinc-900 border border-dashed border-zinc-800 rounded-2xl p-8 text-center">

            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CircleInfo className="w-5 h-5 text-zinc-400" />
            </div>

            <h3 className="text-lg font-semibold">
              Tickets Sold Out
            </h3>

            <p className="text-zinc-500 mt-2">
              No seats are currently available for this trip.
            </p>

          </div>
        ) : (
          <TicketBookingForm
            ticket={ticket}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default BookingPage;