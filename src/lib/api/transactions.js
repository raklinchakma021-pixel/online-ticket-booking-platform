import { serverFetch } from "../core/server";

export const getTransactions = async (
  userId
) => {
  return serverFetch(
    `/api/transactions/${userId}`
  );
};