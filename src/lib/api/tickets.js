import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getAllTickets = async () =>{
    return serverFetch('/api/tickets');
}
export const getTickets = async () => {
    const res = await fetch(
        `${baseUrl}/api/tickets?status=approved`,
        { cache: "no-store" }
    );

    return res.json();
};

export const getTicketById = async (ticketId) => {
    return serverFetch(`/api/tickets/${ticketId}`);
}
export const getVendorTickets = async (vendorId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/tickets?vendorId=${vendorId}&status=${status}`);
    return res.json();
}

export const approveTicket = async (id) => {
  const res = await fetch(
    `${baseUrl}/tickets/${id}/approve`,
    {
      method: "PATCH",
    }
  );

  return res.json();
};

export const rejectTicket = async (id) => {
  const res = await fetch(
    `${baseUrl}/tickets/${id}/reject`,
    {
      method: "PATCH",
    }
  );

  return res.json();
};
export const getAdvertisedTickets = async () => {
  return serverFetch("/api/tickets/advertised");
};