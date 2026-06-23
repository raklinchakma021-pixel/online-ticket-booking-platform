import { serverFetch } from "../core/server";

export const getAdminStats = async () => {
  return serverFetch("/api/admin/stats");
};
export const getVendorStats = async (
  email
) => {
  return serverFetch(
    `/api/vendor/stats/${email}`
  );
};