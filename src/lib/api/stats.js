// import { serverFetch } from "../core/server";

// export const getAdminStats = async () => {
//   return serverFetch("/api/admin/stats");
// };
// export const getVendorStats = async (
//   email
// ) => {
//   return serverFetch(
//     `/api/vendor/stats/${email}`
//   );
// };
// export const getUserStats = async (userId) => {
//   return serverFetch(`/api/user/stats/${userId}`);
// };
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminStats = async () => {
  const res = await fetch(`${baseUrl}/api/admin/stats`, {
    cache: "no-store",
  });
  return res.json();
};

export const getVendorStats = async (email) => {
  const res = await fetch(`${baseUrl}/api/vendor/stats/${email}`, {
    cache: "no-store",
  });
  return res.json();
};

export const getUserStats = async (userId) => {
  const res = await fetch(`${baseUrl}/api/user/stats/${userId}`, {
    cache: "no-store",
  });
  return res.json();
};