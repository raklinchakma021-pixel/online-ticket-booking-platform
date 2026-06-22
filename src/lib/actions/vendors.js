'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createVendor = async (newVendorData) => {
    return serverMutation('/api/vendors', newVendorData);
}
export const updateVendor = async (
    vendorId,
    updatedVendorData
) => {
    const result = serverMutation(
        `/api/vendors/${vendorId}`,
        updatedVendorData,
        "PATCH"
    );
    revalidatePath('/dashboard/admin/vendors')

    return result
};