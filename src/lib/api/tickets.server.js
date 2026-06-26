// export const getTickets = async () => {
//   try {
//     const res = await fetch(
//       `${baseUrl}/api/tickets?status=approved`,
//       {
//         cache: "no-store",
//       }
//     );

import { protectedFetch, serverFetch } from "../core/server";

//     console.log("status:", res.status);
//     console.log("url:", `${baseUrl}/api/tickets?status=approved`);

//     const data = await res.json();

//     console.log("data:", data);

//     return data;
//   } catch (err) {
//     console.error("getTickets error:", err);
//     return [];
//   }
// };
export const getTicketById = async (ticketId) => {
    return protectedFetch(`/api/tickets/${ticketId}`);
}
export const getAllTickets = async () =>{
    return serverFetch('/api/tickets');
}