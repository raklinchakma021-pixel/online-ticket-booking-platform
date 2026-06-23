import React from "react";
import AdvertiseTicketsTable from "@/components/dashboard/AdvertiseTicketsTable";
import { getTickets } from "@/lib/api/tickets";

const AdminAdvertisePage = async () => {
  const tickets = await getTickets({
    status: "approved",
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold">
          Advertise Tickets
        </h2>

        <p className="text-sm text-default-500">
          Manage homepage advertisement tickets (max 6 active)
        </p>
      </div>

      <AdvertiseTicketsTable tickets={tickets} />
    </div>
  );
};

export default AdminAdvertisePage;