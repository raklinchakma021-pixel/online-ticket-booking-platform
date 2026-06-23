'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";
import {
    Persons,
    Briefcase,
    Ticket,
    Megaphone
} from '@gravity-ui/icons';

import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { getAdminStats } from '@/lib/api/stats'; 

const AdminDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getAdminStats();
            setStats(data);
        };

        fetchStats();
    }, []);

    if (isPending || !stats) {
        return (
            <div className="flex items-center justify-center py-20">
                Loading...
            </div>
        );
    }

    const adminStats = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: Persons,
        },
        {
            title: "Total Vendors",
            value: stats.totalVendors,
            icon: Briefcase,
        },
        {
            title: "Total Tickets",
            value: stats.totalTickets,
            icon: Ticket,
        },
        {
            title: "Advertised Tickets",
            value: stats.advertisedTickets,
            icon: Megaphone,
        },
    ];

    const user = session?.user;

    return (
        <div className="space-y-8">
            <div className='p-6'>
                <h1 className="text-3xl md:text-4xl font-bold">
                    Welcome back, {user?.name}
                </h1>

                <p className="mt-2 text-default-500">
                    Manage users, vendors, tickets, and platform activities.
                </p>
            </div>

            <DashboardStats statsData={adminStats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Ticket Approval Queue
                    </h3>
                    <p className="text-default-500">
                        Review pending tickets from vendors.
                    </p>
                </div>

                <div className="rounded-2xl border p-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Platform Overview
                    </h3>
                    <p className="text-default-500">
                        Monitor activity across platform.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHomePage;