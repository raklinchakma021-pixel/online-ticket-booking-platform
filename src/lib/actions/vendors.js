'use server'

import { serverMutation } from "../core/server";

export const createVendor = async (newVendorData) => {
    return serverMutation('/api/vendors', newVendorData);
}
