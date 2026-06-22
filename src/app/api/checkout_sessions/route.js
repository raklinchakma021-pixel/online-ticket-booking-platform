import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const amount = Number(
      formData.get("amount")
    );

    const user = await getUserSession();

    const headersList = await headers();
    const origin =
      headersList.get("origin");

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        customer_email: user?.email,

        metadata: {
          userId: user?.id,
        },

        line_items: [
          {
            price_data: {
              currency: "bdt",

              product_data: {
                name:
                  "TicketBari Booking Payment",
              },

              unit_amount:
                amount * 100,
            },

            quantity: 1,
          },
        ],

        success_url: `${origin}/dashboard/user/my-bookings/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${origin}/dashboard/user/my-bookings`,
      });

    return NextResponse.redirect(
      session.url,
      303
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      {
        status:
          err.statusCode || 500,
      }
    );
  }
}