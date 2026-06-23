'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const makeAdmin = async (userId) => {
    const result = await serverMutation(
        `/api/users/${userId}`,
        {
            role: "admin"
        },
        "PATCH"
    );

    revalidatePath('/dashboard/admin/users');

    return result;
};

export const makeVendor = async (userId) => {
    const result = await serverMutation(
        `/api/users/${userId}`,
        {
            role: "vendor"
        },
        "PATCH"
    );

    revalidatePath('/dashboard/admin/users');

    return result;
};

export const markVendorAsFraud = async (userId) => {
    const result = await serverMutation(
        `/api/users/${userId}`,
        {
            isFraud: true
        },
        "PATCH"
    );

    revalidatePath('/dashboard/admin/users');

    return result;
};



export const updateFraudStatus = async (userId, isFraud) => {
    const result = await serverMutation(
        `/api/users/${userId}`,
        { isFraud },
        "PATCH"
    );

    revalidatePath("/dashboard/admin/users");

    return result;
};