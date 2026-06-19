'use server'

import { serverMutation } from "../core/server";

export const createVendor = async (newVendorData) => {
    return serverMutation('/api/vendors', newVendorData);
}
export const updateVendor = async (
    vendorId,
    updatedVendorData
) => {
    return serverMutation(
        `/api/vendors/${vendorId}`,
        updatedVendorData,
        "PUT"
    );
};