import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { Button } from "@heroui/react";
import { BookingCancelAlert } from "@/app/tickets/[id]/booking/BookingCancelAlert"; 
const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Please Sign In
          </h2>

          <p className="text-zinc-500 mt-2">
            You need to login to view your bookings.
          </p>
        </div>
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/${user.id}`,
    {
      cache: "no-store",
    }
  );

  const bookings = await res.json();

  const unpaidBookings = bookings.filter(
  (booking) => booking.paymentStatus !== "Paid"
);

const totalBookingAmount = unpaidBookings.reduce(
  (sum, booking) =>
    sum + Number(booking.totalPrice || 0),
  0
);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      {bookings?.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
          <h3 className="text-xl font-semibold">
            No Bookings Found
          </h3>

          <p className="text-zinc-500 mt-2">
            You haven't booked any tickets yet.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
             <div>
  <p className="text-zinc-500 text-sm">
    Unpaid Bookings
  </p>

  <h2 className="text-3xl font-bold mt-1">
    {unpaidBookings.length}
  </h2>
</div>

<div>
  <p className="text-zinc-500 text-sm">
    Amount Due
  </p>

  <h2 className="text-4xl font-bold text-yellow-400 mt-1">
    ৳{totalBookingAmount}
  </h2>
</div>

{unpaidBookings.length > 0 && (
  <form
    action="/api/checkout_sessions"
    method="POST"
  >
    <input
      type="hidden"
      name="amount"
      value={totalBookingAmount}
    />

    <input
      type="hidden"
      name="userId"
      value={user.id}
    />

    <button
      type="submit"
      className="min-w-[220px] px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition"
    >
      Pay ৳{totalBookingAmount}
    </button>
  </form>
)}
            
            </div>
          </div>

          {/* Booking List */}
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden md:flex"
              >
                <div className="relative w-full md:w-72 h-56">
                  <Image
                    src={
                      booking.image ||
                      "/placeholder.jpg"
                    }
                    alt={booking.ticketTitle}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 p-6">
                  <h2 className="text-2xl font-bold">
                    {booking.ticketTitle}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {booking.from} → {booking.to}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <p className="text-xs text-zinc-500">
                        Travel Date
                      </p>

                      <p>
                        {booking.departureDate
                          ? new Date(
                              booking.departureDate
                            ).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">
                        Quantity
                      </p>

                      <p>{booking.quantity}</p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">
                        Booking Status
                      </p>

                      <p className="text-yellow-400">
                        {booking.bookingStatus}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">
                        Payment Status
                      </p>

                      <p
                        className={
                          booking.paymentStatus ===
                          "Paid"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {booking.paymentStatus}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="text-xs text-zinc-500">
                        Total Price
                      </p>

                      <p className="text-3xl font-bold text-green-400">
                        ৳{booking.totalPrice}
                      </p>
                    </div>

                    <BookingCancelAlert
                      bookingId={booking._id}
                    />
                  </div>

                  <p className="text-xs text-zinc-600 mt-4">
                    Booking ID: {booking._id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookingPage;