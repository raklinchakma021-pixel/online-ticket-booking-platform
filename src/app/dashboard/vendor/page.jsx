'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";
import {
    Ticket,
    Thunderbolt,
    Persons,
    CreditCard
} from '@gravity-ui/icons';

import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { getVendorStats } from '@/lib/api/stats';

const VendorDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    const [stats, setStats] = useState(null);

  useEffect(() => {
    console.log("SESSION USER:", session?.user);

    const fetchStats = async () => {
        if (!session?.user?.id) return;

        const data = await getVendorStats(
  session.user.email
);
        console.log("STATS:", data);

        setStats(data);
    };

    fetchStats();
}, [session]);
    if (isPending || !stats) {
        return (
            <div className="flex items-center justify-center py-20">
                Loading...
            </div>
        );
    }

    const vendorStats = [
        {
            title: "Total Tickets",
            value: stats.totalTickets,
            icon: Ticket,
        },
        {
            title: "Active Tickets",
            value: stats.activeTickets,
            icon: Thunderbolt,
        },
        {
            title: "Total Bookings",
            value: stats.totalBookings,
            icon: Persons,
        },
        {
            title: "Revenue",
            value: `৳${stats.revenue}`,
            icon: CreditCard,
        },
    ];

    const user = session?.user;

    return (
        <div className="space-y-8">

            <div className="p-6">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Welcome back, {user?.name}
                </h1>

                <p className="mt-2 text-default-500">
                    Manage your tickets and revenue.
                </p>
            </div>

            <DashboardStats statsData={vendorStats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Ticket Management
                    </h3>
                    <p className="text-default-500">
                        Add and manage your tickets.
                    </p>
                </div>

                <div className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Booking Analytics
                    </h3>
                    <p className="text-default-500">
                        Track performance and revenue.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default VendorDashboardHomePage;