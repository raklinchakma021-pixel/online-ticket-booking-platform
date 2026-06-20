'use server';

import { serverMutation } from "../core/server";

export const createBooking = async (bookingData) => {
    return serverMutation('/api/bookings', bookingData);
}