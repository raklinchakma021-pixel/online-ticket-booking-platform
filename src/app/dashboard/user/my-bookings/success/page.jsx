import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import {
  CircleCheck,
  ArrowRight,
  Envelope,
} from "@gravity-ui/icons";

export default async function Success({
  searchParams,
}) {
  const { session_id } =
    await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id"
    );
  }

const stripeSession =
  await stripe.checkout.sessions.retrieve(
    session_id
  );

const {
  status,
  amount_total,
  customer_details,
} = stripeSession;

if (status === "complete") {
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/payment-success`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:
          customer_details?.email,
      }),
      cache: "no-store",
    }
  );
}

  if (status === "complete") {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl">

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-10 text-center shadow-2xl">

            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-6">
              <CircleCheck className="w-14 h-14 text-green-400" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-white">
              Payment Successful 🎉
            </h1>

            <p className="text-zinc-400 mt-4 text-lg">
              Your TicketBari booking payment
              has been completed successfully.
            </p>

            {/* Amount */}
            <div className="mt-8 bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
              <p className="text-zinc-500 text-sm">
                Amount Paid
              </p>

              <h2 className="text-5xl font-bold text-green-400 mt-2">
                ৳
                {(
                  amount_total / 100
                ).toLocaleString()}
              </h2>
            </div>

            {/* Email */}
            <div className="mt-6 flex items-center justify-center gap-2 text-zinc-300">
              <Envelope className="w-4 h-4" />

              <span>
                Confirmation sent to{" "}
                <span className="font-semibold text-white">
                  {
                    customer_details?.email
                  }
                </span>
              </span>
            </div>

            {/* Session Info */}
            <div className="mt-8 text-sm text-zinc-500 break-all">
              Session ID: {session_id}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                href="/my-bookings"
                className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
              >
                View My Bookings
              </Link>

              <Link
                href="/tickets"
                className="px-6 py-3 rounded-xl border border-zinc-700 text-white hover:bg-zinc-800 transition flex items-center justify-center gap-2"
              >
                Book More Tickets
                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
}