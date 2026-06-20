import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getTickets = async () =>{
    return serverFetch('/api/tickets');
}

export const getTicketById = async (ticketId) => {
    return serverFetch(`/api/tickets/${ticketId}`);
}
export const getVendorTickets = async (vendorId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/tickets?vendorId=${vendorId}&status=${status}`);
    return res.json();
}