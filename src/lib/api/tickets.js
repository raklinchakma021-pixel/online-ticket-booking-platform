
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getVendorTickets = async (vendorId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/tickets?vendorId=${vendorId}&status=${status}`);
    return res.json();
}