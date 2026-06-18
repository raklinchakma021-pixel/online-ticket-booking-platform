import React from "react";
import VendorProfile from "./VendorProfile";
import { getUserSession } from "@/lib/core/session";
import { getVendorProfile } from "@/lib/api/vendors";

const VendorProfilePage = async () => {
  const user = await getUserSession();

  const vendor = await getVendorProfile(user?.id);

  return (
    <div>
     <VendorProfile
  vendorProfile={vendor}
  user={user}
/>
    </div>
  );
};

export default VendorProfilePage;