'use client';

import React from 'react';
import { useSession } from "@/lib/auth-client";
import {
    Ticket,
    Thunderbolt,
    Persons,
    CreditCard
} from '@gravity-ui/icons';

import { DashboardStats } from '@/components/dashboard/DashboardStats';

const VendorDashboardHomePage = () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex items-center justify-center py-20">
                Loading...
            </div>
        );
    }

    const vendorStats = [
        {
            title: "Total Tickets",
            value: "120",
            icon: Ticket,
        },
        {
            title: "Active Tickets",
            value: "42",
            icon: Thunderbolt,
        },
        {
            title: "Total Bookings",
            value: "1,875",
            icon: Persons,
        },
        {
            title: "Revenue",
            value: "৳85,000",
            icon: CreditCard,
        },
    ];

    const user = session?.user;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="p-6">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Welcome back, {user?.name}
                </h1>

                <p className="mt-2 text-default-500">
                    Manage your tickets, track bookings, and monitor revenue from your TicketBari vendor dashboard.
                </p>
            </div>

            {/* Stats */}
            <DashboardStats statsData={vendorStats} />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Ticket Management
                    </h3>

                    <p className="text-default-500">
                        Add new tickets, update schedules, manage routes, and keep your listings up to date.
                    </p>
                </div>

                <div className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Booking Analytics
                    </h3>

                    <p className="text-default-500">
                        View booking trends, monitor sales performance, and track your revenue growth.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboardHomePage;