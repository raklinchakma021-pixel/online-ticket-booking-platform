'use server'
import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createTicket = async (newTicketData) => {
    const res = await fetch(`${baseUrl}/api/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicketData),
    });

    return res.json();
}


export const updateAdvertiseStatus = async (ticketId, isAdvertised) => {
  const result = await serverMutation(
    `/api/tickets/${ticketId}/advertise`,
    { isAdvertised },
    "PATCH"
  );

  revalidatePath("/dashboard/admin/advertise-tickets");

  return result;
};