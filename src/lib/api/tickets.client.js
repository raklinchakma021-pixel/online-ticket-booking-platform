const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);
export const approveTicket = async (id) => {
  const res = await fetch(`${baseUrl}/tickets/${id}/approve`, {
    method: "PATCH",
  });
  return res.json();
};

export const rejectTicket = async (id) => {
  const res = await fetch(`${baseUrl}/tickets/${id}/reject`, {
    method: "PATCH",
  });
  return res.json();
};