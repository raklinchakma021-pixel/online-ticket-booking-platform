import VendorTable from "@/components/dashboard/VendorTable";
import { getVendors } from "@/lib/api/vendors";
import React from "react";

const AdminVendorsPage = async () => {
  const vendors = await getVendors();

  return (
    <div className="min-h-screen bg-[#0d0d0f] p-8 text-neutral-100">
      <div className="max-w-7xl mx-auto space-y-6">

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-neutral-200">
            Vendors Management
          </h2>

          <p className="text-sm text-neutral-500 mt-1">
            Total Vendors: {vendors.length}
          </p>
        </div>

        <VendorTable vendors={vendors} />
      </div>
    </div>
  );
};

export default AdminVendorsPage;