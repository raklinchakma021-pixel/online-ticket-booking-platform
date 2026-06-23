import { serverFetch } from "../core/server";

export const getAdminStats = async () => {
  return serverFetch("/api/admin/stats");
};