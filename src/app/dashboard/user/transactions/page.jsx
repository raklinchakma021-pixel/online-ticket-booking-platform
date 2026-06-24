import React from "react";
import TransactionTable from "@/components/dashboard/TransactionTable";
import { getUserSession } from "@/lib/core/session";
import { getTransactions } from "@/lib/api/transactions";

const TransactionHistoryPage =
  async () => {
    const user =
      await getUserSession();

    const transactions =
      await getTransactions(
        user.id
      );

    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">
            Transaction History
          </h2>

          <p className="text-default-500">
            View all completed Stripe
            payments.
          </p>
        </div>

        <TransactionTable
          transactions={
            transactions || []
          }
        />
      </div>
    );
  };

export default TransactionHistoryPage;