const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const approveTicket = async (id) => {
  const res = await fetch(`${baseUrl}/api/tickets/${id}/approve`, {
    method: "PATCH",
  });
  return res.json();
};

export const rejectTicket = async (id) => {
  const res = await fetch(`${baseUrl}/api/tickets/${id}/reject`, {
    method: "PATCH",
  });
  return res.json();
};